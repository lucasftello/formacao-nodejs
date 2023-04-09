const Sequelize = require('sequelize');
const db = require('./connection');

const Resposta = db.define('respostas', {
  conteudo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({ force: false });

module.exports = Resposta;
