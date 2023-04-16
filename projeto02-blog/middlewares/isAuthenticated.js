exports.isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/admin/login');
  }

  next();
};
