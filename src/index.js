var express = require('express');
var dotenv = require('dotenv').config();
var route = require('./routes');
var app = express.Router();

var db = require('./db');

app.use('/', route);
