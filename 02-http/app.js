const http = require('node:http');

http
  .createServer(function (req, res) {
    res.end('Bem vindo ao meu site!');
  })
  .listen(8080);
console.log('Servidor rodando na porta 8080...');
