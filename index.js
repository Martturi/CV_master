var express = require('express');
var dotenv = require('dotenv').config();
var fs = require('fs');
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
const { Client } = require('pg');

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var text = ''


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

client.connect();

client.query('SELECT text FROM cv_table WHERE id = 0;', (err, res) => {
  if (err) throw err;
    JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
      if (key == "text") {
      text = value;
    }
    });
});

function saveCV(text) {
  var q = "UPDATE cv_table SET text=\'"+text+"\' WHERE id = 0;"
  client.query(q, (err, res) => {
    if (err) throw err;
  });
};


//Main request for index site
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/CV.html'));
});

//Post request, saves text
app.post('/api/post', function(request, response) {
  text = request.body.textfield || null
  saveCV(text)
  response.send("Save succeeded")
});

//Get request
app.get('/api/get', function(request, response) {
  response.send(text)
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
