const bcrypt = require('bcryptjs');
const { User } = require('../models/User');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.redirect('/admin/users/new');
    } else {
      const userExists = await User.findOne({
        where: {
          email: email
        }
      });

      if (userExists) {
        res.redirect('/admin/users/new');
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await User.create({
          name: name,
          email: email,
          password: hash
        });

        if (user) {
          res.redirect('/admin/users');
        } else {
          res.redirect('/admin/users/new');
        }
      }
    }
  } catch (error) {
    console.error('Erro ao cadastrar novo usuário', error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.redirect('/admin/login');
    } else {
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (user) {
        const validatePassword = bcrypt.compareSync(password, user.password);

        if (validatePassword) {
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
          };

          res.redirect('/admin/articles');
        } else {
          res.redirect('/admin/login');
        }
      } else {
        res.redirect('/admin/login');
      }
    }
  } catch (error) {
    console.error('Erro ao fazer login do usuário0', error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();

  res.redirect('/admin/login');
};
