const { Sequelize } = require('sequelize');

const db = new Sequelize('guiagames', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true
  },
  timezone: '-03:00',
  logging: false
});

module.exports = db;
