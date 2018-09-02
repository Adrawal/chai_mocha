var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var winston = require('./config/winston');
var config = require('config');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookModel = require('./model/books')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(morgan('combined',{ stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//db options
const options = {
  keepAlive: 1, 
  connectTimeoutMS: 30000,
};


//db connection      
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if(config.util.getEnv('NODE_DEV')!='test'){

  app.use(morgan('combined',{ stream: winston.stream }));
}

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //  this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen('3000','127.0.0.1');

module.exports = app;
