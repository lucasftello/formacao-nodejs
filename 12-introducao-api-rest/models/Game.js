const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Game = db.define('games', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0.0
  }
});

Game.sync();

module.exports = Game;
