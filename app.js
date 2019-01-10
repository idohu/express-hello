var express = require('express');
var morgan = require('morgan');
var format = require('util').format;
var path = require('path');

var app = module.exports = express();
app.use(morgan('combined'));

app.get('/json', function(req, res) {
  res.status(200).json({
    msg: format('Hello from %s!', req.hostname)
  });
});

app.get('/headers', function(req, res) {
  res.status(200).json(req.headers);
});

app.get('/fail', function(req, res, next) {
  res.status(401).json({msg: "Not Authorized"});
});

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(function(err, req, res, next) {
  if (!err.status) {
    console.error(err.stack);
    process.exit(1);
  } else {
    res.status(err.status).json({msg: err.message});
  }
});
