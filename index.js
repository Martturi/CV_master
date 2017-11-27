var express = require('express');
var env = require('dotenv').config();
var fs = require('fs');
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
const { Client } = require('pg');

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var text = '';
var id = 0;


const client = new Client({
  connectionString: process.env.DATABASE_URL

});

client.connect();

client.query('SELECT text FROM cv_table WHERE id = $1;', [id], (err, res) => {
  if (err) throw err;
    JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
      if (key == "text") {
      text = value;
    }
    });
});


//Main request for index site
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname+'/CV.html'));
});

//Post request, saves text
app.post('/api/post', (request, response) => {
  text = request.body.textfield || null
  var q = "UPDATE cv_table SET text=\'"+text+"\' WHERE id = $1;"
  client.query(q, [id], (err, res) => {
    if (err) response.send(err);
    else response.send("Save succeeded")
  });

});

//Get request
app.get('/api/get', (request, response) => {
  response.send(text)
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
