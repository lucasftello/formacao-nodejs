const Sequelize = require('sequelize');
const db = require('./connection');

const Pergunta = db.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({ force: false });

module.exports = Pergunta;
