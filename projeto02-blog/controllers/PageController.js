const { Category } = require('../models/Category');
const { Article } = require('../models/Article');
const { User } = require('../models/User');

exports.home = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: Category
        }
      ],
      limit: 6,
      order: [['id', 'DESC']]
    });

    res.render('index', { articles });
  } catch (error) {
    console.error('Erro ao buscar os artigos', error);
  }
};

exports.article = async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await Article.findOne({
      where: {
        slug: slug
      }
    });

    if (article) {
      res.render('article', { article });
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Erro ao buscar o artigo solicitado', error);
  }
};

exports.articles = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 6;
    let offset = 0;
    let numPage = 1;
    if (page) {
      numPage = page;
    }

    if (isNaN(numPage) || numPage == 0 || numPage == 1) {
      offset = 0;
    } else {
      offset = (parseInt(numPage) - 1) * limit;
    }

    const articles = await Article.findAndCountAll({
      include: {
        model: Category
      },
      limit: limit,
      offset: offset,
      order: [['id', 'DESC']]
    });

    if (articles) {
      let nextPage;
      if (offset + limit >= articles.count) {
        nextPage = false;
      } else {
        nextPage = true;
      }

      const result = {
        articles,
        page: parseInt(numPage),
        nextPage
      };

      res.render('articles', { result });
    }
  } catch (error) {
    console.error('Erro ao buscar os artigos', error);
  }
};

exports.articlesByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { page } = req.query;
    const limit = 6;
    let offset = 0;
    let numPage = 1;
    if (page) {
      numPage = page;
    }

    const category = await Category.findOne({
      where: {
        slug: slug
      }
    });

    if (category) {
      if (isNaN(numPage) || numPage == 0 || numPage == 1) {
        offset = 0;
      } else {
        offset = (parseInt(numPage) - 1) * limit;
      }

      const articles = await Article.findAndCountAll({
        where: {
          categoryId: category.id
        },
        include: {
          model: Category
        },
        limit: limit,
        offset: offset,
        order: [['id', 'DESC']]
      });

      if (articles) {
        let nextPage;
        if (offset + limit >= articles.count) {
          nextPage = false;
        } else {
          nextPage = true;
        }

        const result = {
          category,
          articles,
          page: parseInt(numPage),
          nextPage
        };

        res.render('category', { result });
      }
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Erro ao buscar os artigos da categoria solicitada', error);
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.render('admin/users/index', { users });
  } catch (error) {
    console.error('Erro ao buscar os usuários', error);
  }
};

exports.newUser = (req, res) => {
  res.render('admin/users/new');
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.render('admin/categories/index', { categories });
  } catch (error) {
    console.error('Erro ao buscar as categorias', error);
  }
};

exports.newCategory = (req, res) => {
  res.render('admin/categories/new');
};

exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      res.redirect('/admin/categories');
    } else {
      const category = await Category.findByPk(id);

      if (category) {
        res.render('admin/categories/edit', { category });
      } else {
        res.redirect('/admin/categories');
      }
    }
  } catch (error) {
    console.error('Erro ao exibir página de edição de categoria', error);
  }
};

exports.listArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        {
          model: Category
        }
      ]
    });

    res.render('admin/articles/index', { articles });
  } catch (error) {
    console.error('Erro ao buscar os artigos', error);
  }
};

exports.newArticle = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.render('admin/articles/new', { categories });
  } catch (error) {
    console.error('Erro ao exibir página de cadastro de artigos', error);
  }
};

exports.editArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      res.redirect('/admin/articles');
    } else {
      const article = await Article.findByPk(id);

      if (article) {
        const categories = await Category.findAll();

        res.render('admin/articles/edit', { article, categories });
      } else {
        res.redirect('/admin/articles');
      }
    }
  } catch (error) {
    console.error('Erro ao exibir página de edição de artigo', error);
  }
};

exports.login = (req, res) => {
  if (req.session.user) {
    res.redirect('/admin/articles');
  } else {
    res.render('admin/login');
  }
};
