# SolarEnergy

Site institucional estático da SolarEnergy, preparado para Apache/cPanel no plano P da HostGator.

O conteúdo, o layout e o comportamento visual continuam nos arquivos HTML, CSS e JavaScript da raiz. Não existe etapa de compilação nem dependência de Node.js no servidor.

## Publicação na HostGator

Use o arquivo `release/solarenergy-hostgator.zip`, gerado pelo comando:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\build-hostgator.ps1
```

No cPanel, abra **Gerenciador de Arquivos > public_html**, envie o ZIP e extraia-o ali. Depois confirme que `index.html` e `.htaccess` estão diretamente dentro de `public_html`, e não dentro de outra pasta.

As instruções completas e a verificação pós-publicação estão em [HOSTGATOR.md](HOSTGATOR.md).

## Arquivos publicados

- `index.html`, `sobre.html`, `solucoes.html`, `contato.html` e `404.html`
- `styles.css`, `scripts.js` e `favicon.svg`
- `.htaccess` para Apache/cPanel
- somente as imagens efetivamente usadas, em WebP otimizado, dentro de `assets/`

O build também carimba `?v=<hash>` em `styles.css` e `scripts.js` nos HTMLs, para que os visitantes recebam a versão nova logo após cada publicação.

Imagens e bundles antigos que não eram usados por nenhuma página foram removidos (continuam disponíveis no histórico do git).
