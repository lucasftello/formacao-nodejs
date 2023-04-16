const { Category } = require('../models/Category');

exports.loadAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    if (categories) {
      res.locals.categories = categories;
    }
  } catch (error) {
    console.error('Erro ao obter as categorias', error);
  }

  next();
};
