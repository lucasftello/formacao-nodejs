const { DataTypes } = require('sequelize');
const { db } = require('../config/database');
const { Category } = require('./Category');

const Article = db.define('articles', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Category.hasMany(Article);
Article.belongsTo(Category);

module.exports = { Article };
