const { Article } = require('../models/Article');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { category, title, content } = req.body;

    const article = await Article.create({
      title: title,
      slug: slugify(title, {
        remove: /[*+~.()'"!:@]/g,
        lower: true
      }),
      content: content,
      categoryId: category
    });

    if (article) {
      res.redirect('/admin/articles');
    } else {
      res.redirect('/admin/articles/new');
    }
  } catch (error) {
    console.error('Erro ao criar novo artigo', error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id, category, title, content } = req.body;

    if (!category || !title) {
      res.redirect('/admin/articles');
    } else {
      const article = await Article.update(
        {
          title: title,
          slug: slugify(title, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
          }),
          content: content,
          categoryId: category
        },
        {
          where: {
            id: id
          }
        }
      );

      if (article) {
        res.redirect('/admin/articles');
      } else {
        res.redirect(`/admin/articles/edit/${id}`);
      }
    }
  } catch (error) {
    console.error('Erro ao editar o artigo', error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      res.redirect('/admin/articles');
    } else {
      if (isNaN(id)) {
        res.redirect('/admin/articles');
      } else {
        await Article.destroy({
          where: {
            id: id
          }
        });

        res.redirect('/admin/articles');
      }
    }
  } catch (error) {
    console.error('Erro ao excluir o artigo', error);
  }
};
