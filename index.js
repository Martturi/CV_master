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

//Post request
app.post('/api/post', function(request, response) {
  var text = request.body.textfield || null
  fs.writeFile("cv.txt", text, function(err) {
    if (err) {
      return console.log(err);
    }
    response.setHeader("200")
    response.send('Save succeeded.');
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
