var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//postgres://vsbtapwxyfpzpx:FSzuFTh9XLXseX3uDpxFy4tI2M@ec2-54-197-238-239.compute-1.amazonaws.com:5432/dc62v0r8j3kh0b

var Okapi = require('okapi');

var dialect = new Okapi.PGSQLDialect({  port: '5432', host:"ec2-54-197-238-239.compute-1.amazonaws.com", user:"vsbtapwxyfpzpx", database:"dc62v0r8j3kh0b", password:"FSzuFTh9XLXseX3uDpxFy4tI2M" });

Person = new Okapi.Object(dialect,"person");

  //Now let's add some columns
Person.column("id",{type: Okapi.ID });
Person.column("name",{type: Okapi.String, unique: true});
Person.column("email",{type: Okapi.String });

Person.createTable().done(function(err,res){
  console.log("Person created",err,res);
});




app.get("/atg",function(req,res){
  res.send({ msg: "ATG is back" });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
