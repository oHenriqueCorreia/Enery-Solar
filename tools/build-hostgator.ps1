[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$projectRoot = [System.IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$releaseRoot = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'release'))
$stageRoot = [System.IO.Path]::GetFullPath((Join-Path $releaseRoot 'hostgator-public_html'))
$zipPath = [System.IO.Path]::GetFullPath((Join-Path $releaseRoot 'solarenergy-hostgator.zip'))

$expectedPrefix = $projectRoot.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
foreach ($target in @($releaseRoot, $stageRoot, $zipPath)) {
  if (-not $target.StartsWith($expectedPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Destino de release fora do projeto: $target"
  }
}

$siteFiles = @(
  '.htaccess'
  'index.html'
  'sobre.html'
  'solucoes.html'
  'contato.html'
  '404.html'
  'styles.css'
  'scripts.js'
  'favicon.svg'
  'assets/logo-branca.webp'
  'assets/hero-poster.webp'
  'assets/nossa-trajetoria.webp'
  'assets/nossa-trajetoria-640.webp'
  'assets/sobre.webp'
  'assets/sobre-640.webp'
)

$missingSourceFiles = @(
  foreach ($relativePath in $siteFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Leaf)) {
      $relativePath
    }
  }
)

if ($missingSourceFiles.Count -gt 0) {
  throw "Arquivos de origem ausentes:`n$($missingSourceFiles -join "`n")"
}

if (Test-Path -LiteralPath $stageRoot) {
  Remove-Item -LiteralPath $stageRoot -Recurse -Force
}
if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

New-Item -ItemType Directory -Path $stageRoot -Force | Out-Null

foreach ($relativePath in $siteFiles) {
  $sourcePath = Join-Path $projectRoot $relativePath
  $destinationPath = Join-Path $stageRoot $relativePath
  $destinationDirectory = Split-Path -Parent $destinationPath
  New-Item -ItemType Directory -Path $destinationDirectory -Force | Out-Null
  Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Force
}

# Carimba ?v=<hash> em styles.css/scripts.js para invalidar o cache dos visitantes
# sempre que esses arquivos mudarem (o .htaccess guarda CSS/JS por 1 ano).
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$assetVersions = @{}
foreach ($asset in @('styles.css', 'scripts.js')) {
  $hash = (Get-FileHash -LiteralPath (Join-Path $stageRoot $asset) -Algorithm SHA256).Hash
  $assetVersions[$asset] = $hash.Substring(0, 10).ToLowerInvariant()
}
Get-ChildItem -LiteralPath $stageRoot -Filter '*.html' -File | ForEach-Object {
  $html = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom)
  foreach ($asset in $assetVersions.Keys) {
    $html = [System.Text.RegularExpressions.Regex]::Replace($html, [regex]::Escape($asset) + '(\?v=[^"'']*)?', "$($asset)?v=$($assetVersions[$asset])")
  }
  [System.IO.File]::WriteAllText($_.FullName, $html, $utf8NoBom)
}

# Confere referencias locais de href/src antes de criar o ZIP.
$brokenReferences = [System.Collections.Generic.List[string]]::new()
$referencePattern = '(?i)(?:href|src)\s*=\s*["'']([^"'']+)["'']'

Get-ChildItem -LiteralPath $stageRoot -Filter '*.html' -File | ForEach-Object {
  $htmlFile = $_
  $html = Get-Content -LiteralPath $htmlFile.FullName -Raw -Encoding UTF8

  foreach ($match in [System.Text.RegularExpressions.Regex]::Matches($html, $referencePattern)) {
    $reference = $match.Groups[1].Value
    if ($reference -match '^(?:[a-z][a-z0-9+.-]*:|//|#)') {
      continue
    }

    $cleanReference = ($reference -split '[?#]', 2)[0]
    if ([string]::IsNullOrWhiteSpace($cleanReference)) {
      continue
    }

    $decodedReference = [System.Uri]::UnescapeDataString($cleanReference)
    if ($decodedReference.StartsWith('/')) {
      $referencedPath = Join-Path $stageRoot $decodedReference.TrimStart('/')
    } else {
      $referencedPath = Join-Path $htmlFile.DirectoryName $decodedReference
    }

    if (-not (Test-Path -LiteralPath $referencedPath)) {
      $brokenReferences.Add("$($htmlFile.Name) -> $reference")
    }
  }
}

if ($brokenReferences.Count -gt 0) {
  throw "Referencias locais ausentes:`n$($brokenReferences -join "`n")"
}

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($null -ne $nodeCommand) {
  & $nodeCommand.Source --check (Join-Path $stageRoot 'scripts.js')
  if ($LASTEXITCODE -ne 0) {
    throw 'Falha na validacao de sintaxe de scripts.js.'
  }
}

# Cria o ZIP manualmente: Compress-Archive (PowerShell 5.1) grava "\" nos caminhos,
# o que o servidor Linux da HostGator pode extrair como nomes de arquivo literais.
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  Get-ChildItem -LiteralPath $stageRoot -File -Recurse -Force | ForEach-Object {
    $entryName = $_.FullName.Substring($stageRoot.Length).TrimStart('\', '/').Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally {
  $zip.Dispose()
}

$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  $zipEntries = @($zip.Entries | ForEach-Object { $_.FullName })
  $backslashEntries = @($zipEntries | Where-Object { $_.Contains('\') })
  if ($backslashEntries.Count -gt 0) {
    throw "O ZIP contem caminhos com barra invertida:`n$($backslashEntries -join "`n")"
  }
  foreach ($requiredEntry in @('.htaccess', 'index.html', '404.html', 'styles.css', 'scripts.js')) {
    if ($zipEntries -notcontains $requiredEntry) {
      throw "O ZIP nao contem o arquivo obrigatorio: $requiredEntry"
    }
  }
} finally {
  $zip.Dispose()
}

$fileCount = (Get-ChildItem -LiteralPath $stageRoot -File -Recurse).Count
$packageSizeMb = [math]::Round((Get-Item -LiteralPath $zipPath).Length / 1MB, 2)

Write-Host "Pacote HostGator criado e validado."
Write-Host "Arquivos: $fileCount"
Write-Host "Tamanho: $packageSizeMb MB"
Write-Host "ZIP: $zipPath"
