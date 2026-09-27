# Publicação no plano P da HostGator

Este projeto é um site estático e não exige banco de dados, WordPress, Node.js ou processo em segundo plano. Ele usa apenas HTML, CSS, JavaScript, imagens e vídeos incorporados do YouTube.

## Passo a passo

1. No Portal do Cliente da HostGator, confirme que o domínio está apontado para a hospedagem e que o SSL gratuito está ativo.
2. No cPanel, abra **Gerenciador de Arquivos** e entre em `public_html`.
3. Faça uma cópia de segurança do conteúdo atual de `public_html`, caso já exista um site publicado.
4. Envie `release/solarenergy-hostgator.zip` e use **Extrair**.
5. Confira se `public_html/index.html` e `public_html/.htaccess` existem diretamente nessa pasta. Ative a exibição de arquivos ocultos no Gerenciador para enxergar `.htaccess`.
6. Remova apenas o arquivo ZIP do servidor depois de confirmar a extração.
7. Se o cPanel oferecer a opção **Forçar HTTPS**, ative-a somente depois que o certificado SSL constar como válido.

## Verificação pós-publicação

Abra em janela anônima:

- `/` — página inicial, vídeo e calculadora;
- `/sobre.html` — imagem da seção Sobre;
- `/solucoes.html`;
- `/contato.html` — botão do WhatsApp e formulário;
- `/uma-pagina-que-nao-existe` — deve mostrar a página 404 personalizada.

O formulário foi mantido como já estava configurado: ele usa `mailto:contato@solarenergy.com.br` e, portanto, abre o aplicativo de e-mail do visitante. Nenhuma rotina PHP ou banco de dados foi adicionada.

## Observações

- Não envie a pasta `release/hostgator-public_html` como uma subpasta. Envie o conteúdo dela, ou extraia o ZIP diretamente em `public_html`.
- Os vídeos dependem do YouTube e precisam de acesso externo no navegador do visitante.
- O `.htaccess` configura UTF-8, 404 real, compressão, cache e cabeçalhos básicos sem alterar a aparência do site.
