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
  'assets/logo-branca.png'
  'assets/0202.png'
  'assets/nossa-trajetoria.png'
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

Compress-Archive -Path (Join-Path $stageRoot '*') -DestinationPath $zipPath -CompressionLevel Optimal

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  $zipEntries = @($zip.Entries | ForEach-Object { $_.FullName.Replace('\', '/') })
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
