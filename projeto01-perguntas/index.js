const express = require('express');
const app = express();
const db = require('./database/connection');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

// Conexão com o banco de dados
db.authenticate()
  .then(() => {
    console.log('Banco de dados conectado!');
  })
  .catch(error => {
    console.error('Erro ao connectar com o banco de dados!', error);
  });

// Configurações do projeto
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [['id', 'DESC']]
  }).then(perguntas => {
    res.render('index', {
      perguntas: perguntas
    });
  });
});

app.get('/perguntar', (req, res) => {
  res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
  const { titulo, descricao } = req.body;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect('/');
  });
});

app.get('/pergunta/:id', (req, res) => {
  const { id } = req.params;

  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta === null) {
      res.redirect('/');
    } else {
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [['createdAt', 'DESC']]
      }).then(respostas => {
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    }
  });
});

app.post('/responder', (req, res) => {
  const { conteudo, perguntaId } = req.body;

  Resposta.create({
    conteudo: conteudo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect(`/pergunta/${perguntaId}`);
  });
});

// Configuração do servidor
app.listen(8080, error => {
  if (error) {
    console.error('Erro ao iniciar o app!');
  } else {
    console.log('App rodando na porta 8080!');
  }
});
