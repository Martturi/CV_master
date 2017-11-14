var express = require('express');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');

//Main request for index site
app.get('/', function(request, response) {
  response.render('pages/index');
});

//Post request
app.get('/api/post', function(request, response) {
  var text = "HELLO"
  fs.writeFile("cv.txt", text, function(err) {
    if (err) {
      return console.log(err);
    }
    response.send('Save succeeded.');
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
