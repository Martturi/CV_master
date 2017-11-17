var express = require('express');
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
});

client.connect();

text = client.query('SELECT text FROM CVs WHERE id = 0;', (err, res) => {
  if (err) throw err;
    JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
      if (key == "text") {
      text = value;
    }
    });
  client.end();
});

//Main request for index site
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/CV.html'));
});

//Post request, saves text
app.post('/api/post', function(request, response) {
  text = request.body.textfield || null
  response.send("Save succeeded")
});

//Get request
app.get('/api/get', function(request, response) {
  response.send(text)
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
