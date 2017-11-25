var express = require('express');
var dotenv = require('dotenv').config();
var fs = require('fs');
var path = require("path");
var bodyParser = require("body-parser");
var app = express();


app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var text = ''

var db = require('./db');
var routes = require('./routes.js');

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
