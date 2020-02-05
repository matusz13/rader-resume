var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
require('dotenv').config({ path: path.resolve(__dirname, './config/keys.env') });
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

var connectDB = require('./db/db');
var mongoose = require('mongoose');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//mongodb setup
connectDB();
//api setup
const routes = require('./api/routes');
app.use('/api', routes); 


// Enable CORS - only probably needed for dev environment purposes 
app.use(function( req, res, next ) {
res.header("Access-Control-Allow-Origin", '*');
res.header("Access-Control-Allow-Headers", " content-type");
res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

res.header("Access-Control-Max-Age", "1000");
 if ('OPTIONS' == req.method) {  res.sendStatus(200); } else { next(); } 
});

//point to react client

//var client_path = __dirname.replace('server', 'client');
var client_path = __dirname;

app.use('/',   express.static(path.join(client_path, './build')));
app.use('/shortener',   express.static(path.join(client_path, './build')));
app.use('/tweets',   express.static(path.join(client_path, './build')));
app.use('/:short_id',   express.static(path.join(client_path, './build')));
app.use('/geotweet',   express.static(path.join(client_path, './build')));



//todo move to routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
