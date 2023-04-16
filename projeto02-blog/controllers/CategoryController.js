const { Category } = require('../models/Category');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.redirect('/admin/categories/new');
    } else {
      const category = await Category.create({
        name: name,
        slug: slugify(name, {
          remove: /[*+~.()'"!:@]/g,
          lower: true
        })
      });

      if (category) {
        res.redirect('/admin/categories');
      } else {
        res.redirect('/admin/categories/new');
      }
    }
  } catch (error) {
    console.error('Erro ao cadastrar nova categoria', error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (!name) {
      res.redirect('/admin/categories');
    } else {
      const category = await Category.update(
        {
          name: name,
          slug: slugify(name, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
          })
        },
        {
          where: {
            id: id
          }
        }
      );

      if (category) {
        res.redirect('/admin/categories');
      } else {
        res.redirect(`/admin/categories/edit/${id}`);
      }
    }
  } catch (error) {
    console.error('Erro ao editar a categoria', error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.redirect('/admin/categories');
    } else {
      if (isNaN(id)) {
        res.redirect('/admin/categories');
      } else {
        await Category.destroy({
          where: {
            id: id
          }
        });

        res.redirect('/admin/categories');
      }
    }
  } catch (error) {
    console.error('Erro ao excluir a categoria', error);
  }
};
