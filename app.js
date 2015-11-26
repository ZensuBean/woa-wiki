var express = require('express'),
    path = require('path'),
    config = require('./config'),
    mongoose = require('mongoose');

var favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

// Declare models
var User,
    Article,
    Category;

// Route files
var general = require('./controller/general'),
    users = require('./controller/users'),
    articles = require('./controller/articles'),
    categories = require('./controller/categories'),
    auth = require('./controller/authentication');

var app = express();
mongoose.connect(config.db.adapter + '://' + config.db.host + (config.db.port ? ':' + config.db.port : '') + '/' + config.db.name);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, 'views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Set up routing namespaces
app.use('/', general);
app.use('/users', users);
app.use('/categories', categories);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/auth', auth);

// Loading models
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    User = require('./models/users');
    Article = require('./models/articles');
    Category = require('./models/categories');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
