require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

//Router for the API
var indexRouter = require('./routes/index_route');
var usersRouter = require('./routes/users_route');
var mediaRouter = require('./routes/medias_route');
var commentRouter = require('./routes/comments_route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes pour l'API
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/medias', mediaRouter);
app.use('/comments', commentRouter);

// catch 404 et evoyer à la page d'erreur
app.use(function(req, res, next) {
  next(createError(404));
});

// gestion des erreurs
app.use(function(err, req, res, next) {
  // définir les variables locales, fournissant des erreurs uniquement en développement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // afficher la page d'erreur
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;