const jwt = require('jsonwebtoken');
const config = require('../config/config');

function isAuthenticated(req, res, next) {
  const authToken = req.headers['authorization'];

  if (!authToken) {
    res.status(401).json({ message: 'Token inválido' });
  }

  const token = authToken.split(' ')[1];

  jwt.verify(token, config.jwtSecret, (error, payload) => {
    if (error) {
      res.status(401).json({ message: 'Token inválido' });
      return;
    }

    req.token = token;
    req.authenticatedUser = {
      id: payload.id,
      email: payload.email
    };

    next();
  });
}

module.exports = isAuthenticated;
