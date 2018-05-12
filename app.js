var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");


var index = require('./routes/index');
var config = require("./meta/config/common");
var sequelize = require("./config/sequelize");
var models = require("./config/model");
var middles = require("./middles/index");
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/thumbnails', express.static(__dirname+'/thumbnails'));
app.use(middles.connect());


app.use(function (req, res, next) {
  req.config = config;
  req.sequelize = sequelize;
  req.models = models;
  // req.utils = require('../utils');
  next();
});

index(app);

app.get('/', function(req, res) {
  console.log(req.session.username);
  res.render('index');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.setHeader('Content-Type', 'application/json');
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(require('./utils/response-header').apiConnect());

module.exports = app;

app.listen(config.app.port, () => {
  console.log('profile app listening on port '+config.app.port+'!!!!');
});