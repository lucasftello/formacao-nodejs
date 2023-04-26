const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser('mysupercookiesecret'));
app.use(
  session({
    secret: 'mysupersessionsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
  })
);
app.use(flash());

app.get('/', (req, res) => {
  let nameError = req.flash('nameError');
  let emailError = req.flash('emailError');
  let pointsError = req.flash('pointsError');

  nameError = !nameError || nameError.length === 0 ? undefined : nameError;
  emailError = !emailError || emailError.length === 0 ? undefined : emailError;
  pointsError =
    !pointsError || pointsError.length === 0 ? undefined : pointsError;

  res.render('index', {
    nameError,
    emailError,
    pointsError,
    name: req.flash('name'),
    email: req.flash('email'),
    points: req.flash('points')
  });
});

app.post('/form', (req, res) => {
  const { email, name, points } = req.body;

  let nameError;
  let emailError;
  let pointsError;

  if (!name) {
    nameError = 'O nome não pode ser vazio.';
  }

  if (name && name.length < 4) {
    nameError = 'O nome é muito pequeno.';
  }

  if (!email) {
    emailError = 'O e-mail não pode ser vazio.';
  }

  if (!points || points < 20) {
    pointsError = 'Você não pode ter menos que 20 pontos.';
  }

  if (nameError || emailError || pointsError) {
    req.flash('nameError', nameError);
    req.flash('emailError', emailError);
    req.flash('pointsError', pointsError);

    req.flash('name', name);
    req.flash('email', email);
    req.flash('points', points);

    res.redirect('/');
  } else {
    res.send('Show de bola esse form');
  }
});

app.listen(8080, error => {
  if (error) {
    console.error('Erro ao iniciar o servidor...', error);
  }

  console.log('Servidor rodando na porta 8080...');
});
