const express = require('express');
const { loadAllCategories } = require('./middlewares/loadAllCategories');
const { isAuthenticated } = require('./middlewares/isAuthenticated');
const PageController = require('./controllers/PageController');
const CategoryController = require('./controllers/CategoryController');
const ArticleController = require('./controllers/ArticleController');
const UserController = require('./controllers/UserController');

const router = express.Router();

// Site pages routes 
router.get('/', loadAllCategories, PageController.home);
router.get('/article/:slug', loadAllCategories, PageController.article);
router.get(
  '/category/:slug',
  loadAllCategories,
  PageController.articlesByCategory
);
router.get('/articles', loadAllCategories, PageController.articles);

// Admin pages routes
router.get('/admin/login', PageController.login);
router.get('/admin/users', isAuthenticated, PageController.listUsers);
router.get('/admin/users/new', isAuthenticated, PageController.newUser);
router.get('/admin/categories', isAuthenticated, PageController.listCategories);
router.get(
  '/admin/categories/new',
  isAuthenticated,
  PageController.newCategory
);
router.get(
  '/admin/categories/edit/:id',
  isAuthenticated,
  PageController.editCategory
);
router.get('/admin/articles', isAuthenticated, PageController.listArticles);
router.get('/admin/articles/new', isAuthenticated, PageController.newArticle);
router.get(
  '/admin/articles/edit/:id',
  isAuthenticated,
  PageController.editArticle
);

// Users routes
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.post('/users/create', isAuthenticated, UserController.create);

// Categories routes
router.post('/categories/create', isAuthenticated, CategoryController.create);
router.post('/categories/update', isAuthenticated, CategoryController.update);
router.post('/categories/delete', isAuthenticated, CategoryController.delete);

// Articles routes
router.post('/articles/create', isAuthenticated, ArticleController.create);
router.post('/articles/update', isAuthenticated, ArticleController.update);
router.post('/articles/delete', isAuthenticated, ArticleController.delete);

module.exports = router;
