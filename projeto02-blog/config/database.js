const { Sequelize } = require('sequelize');

const db = new Sequelize('guiapress', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  timezone: '-03:00'
});

module.exports = { db };
