const express = require('express');
const path = require('path');
const { db } = require('./config/database');
const router = require('./routes');
const session = require('express-session');
const { Category } = require('./models/Category');
const { Article } = require('./models/Article');
const { User } = require('./models/User');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: 'secretsupersecreta',
    cookie: {
      maxAge: 10800000
    }
  })
);
app.use('/', router);

// Iniciar servidor e conexão com banco de dados
app.listen(8080, async error => {
  if (error) {
    console.error('Erro ao iniciar o servidor: ', error);
  } else {
    console.log('Servidor rodando na porta 8080...');

    try {
      await db.authenticate();
      console.log('Banco de dados conectado...');
    } catch (error) {
      console.error('Erro ao conectar com o banco de dados', error);
    }
  }
});
