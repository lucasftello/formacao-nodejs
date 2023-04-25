const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const config = require('./config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('./middlewares/isAuthenticated');
const Game = require('./models/Game');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/games', isAuthenticated, async (req, res) => {
  try {
    const games = await Game.findAll();

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/games/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const game = await Game.findByPk(id);

    if (game) {
      res.status(200).json(game);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/games', isAuthenticated, async (req, res) => {
  const { name, year, price } = req.body;

  if (!name || !year) {
    res.sendStatus(400);
    return;
  }

  const game = {
    name,
    year
  };

  if (price) {
    if (isNaN(price)) {
      res.sendStatus(400);
      return;
    }
    game.price = price;
  }

  try {
    await Game.create(game);

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.put('/games/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const game = await Game.findByPk(id);

    if (game) {
      const { name, year, price } = req.body;

      if (name) {
        game.dataValues.name = name;
      }
      if (year) {
        game.dataValues.year = year;
      }
      if (price) {
        if (isNaN(price)) {
          res.sendStatus(400);
          return;
        }
        game.dataValues.price = price;
      }

      await Game.update(game.dataValues, {
        where: {
          id: id
        }
      });

      res.status(200).json(game);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete('/games/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  try {
    const game = await Game.findByPk(id);

    if (game) {
      await Game.destroy({
        where: {
          id: id
        }
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.sendStatus(400);
    return;
  }

  try {
    const userExists = await User.findOne({
      where: {
        email: email
      }
    });

    if (userExists) {
      res.status(400).json({ message: 'E-mail já cadastrado' });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = {
        name,
        email,
        password: hash
      };

      await User.create(user);

      res.status(201).json(user);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.sendStatus(400);
    return;
  }

  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      jwt.sign(
        { id: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: '48h' },
        (error, token) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
          } else {
            res.status(200).json({
              token
            });
          }
        }
      );
    } else {
      res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(8080, async error => {
  if (error) {
    console.error(error);
  } else {
    console.log('API rodando na porta 8080!');

    try {
      await db.authenticate();

      console.log('Banco de dados conectado!');
    } catch (error) {
      console.error('Erro ao se conectar com o banco de dados:', error);
    }
  }
});
