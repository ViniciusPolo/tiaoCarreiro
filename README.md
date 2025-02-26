# Top Musicas Tião Carreiro

* Aplicação simples de demonstração de Laravel 11 e React.js

## Executar via docker

Para iniciar o projeto basta executar o comando abaixo:
```
sudo docker compose up --build
```
* Acredito que se está aqui, já tenha o docker e o docker-compose na sua máquina

Ou se preferir pode entrar nos diretórios e executar diretamente

## Executar o backend
```
composer install
```
* Roda esse commando se tiver algum problema com o de cima
```
composer update --ignore-platform-req=ext-xml
```
```
php artisan serve
```

# Executar o frontend
```
npm install
```
* pode ser usado o yarn
```
npm start
```

# Ao Executar o frontend
```
localhost:3000/login
```
Na primeira vez vai ter que criar um usúario
```
localhost:3000/register
```
* Essa será a single page
```
localhost:3000/musicas
```
* Aqui vocÊ coloca um link (preferencialmente do Tião), o nome da musica e onumero de visualizações, pronto vai aparecer na single page

Se quiser testar a API  
* POST - Login
```
0.0.0.0:8000/api/login
```
```
{
  nome,
  email,
  password
}
```
* Na primeira vez vai ter que criar um usúario 
* POST
```
0.0.0.0:8000/api/register
```
```
{
  nome,
  eamil,
  password, 
  confirm_password, 
}
```
CRUD completo
```
0.0.0.0:8000/api/musicas
```
* para deletar, editar ou filtrar é só colocar, o id na frentes de musicas "musicas/2", usando o GET, PUT, DELETE
com o body 
```
{ 
  nome,
  visualizacoes,
  youtube_id, (codigo da musica no youtube)
  thumb, (link da imagem do youtube)
}
```

* Caso tenha algum problema em executar via docker ou mesmo local ou qualquer dúvida, me chama nos contatos abaixo, vamos conversar sobre esse projeto. sobre outros assuntos ou projetos também.

  <a href = "mailto:admviniciuspolo@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/vinicius-polo-9138912a/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a target="_blank" href="https://wa.me/5516988197277">
	<img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" title="Whatsapp Alexandre" width="130">
  </a>


