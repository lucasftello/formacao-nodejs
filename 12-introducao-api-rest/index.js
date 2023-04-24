const express = require('express');
const db = require('./config/database');
const Game = require('./models/Game');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/games', async (req, res) => {
  try {
    const games = await Game.findAll();

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/games/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);
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

app.post('/games', async (req, res) => {
  const { name, year, price } = req.body;

  if (!name || !year) {
    res.sendStatus(400);
  }

  const game = {
    name,
    year
  };

  if (price) {
    if (isNaN(price)) {
      res.sendStatus(400);
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

app.put('/games/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);
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

app.delete('/games/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.sendStatus(400);
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
