var express = require('express');
var fs = require('fs');
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//Main request for index site
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/CV.html'));
});

var text = ''

//Post request, saves text
app.post('/api/post', function(request, response) {
  text = request.body.textfield || null
  fs.writeFile("cv.txt", text, function(err) {
    if (err) {
      return console.log(err);
    }
    response.send('Save succeeded.');
  });
});

//Get request
app.get('/api/get', function(request, response) {
  response.send(text)
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
