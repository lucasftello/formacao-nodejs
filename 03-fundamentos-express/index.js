const express = require('express');

const app = express();

app.get('/', function (req, res) {
  res.send('Introdução ao Express');
});

app.get('/blog/:article?', function (req, res) {
  const { article } = req.params;

  if (article) {
    res.send(`Artigo: ${article}`);
  } else {
    res.send('Bem vindo ao meu blog com Express');
  }
});

app.get('/youtube', function (req, res) {
  const channel = req.query['channel'];

  if (channel) {
    res.send(channel);
  } else {
    res.send('Nenhum canal fornecido');
  }
});

app.get('/hello/:name/:company', function (req, res) {
  const { name, company } = req.params;
  res.send(`Olá ${name} da empresa ${company}`);
});

app.listen(8080, function (error) {
  if (error) {
    console.error('Erro ao iniciar o servidor');
  } else {
    console.log('Servidor rodando na porta 8080...');
  }
});
