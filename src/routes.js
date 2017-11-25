var express = require('express');
var route = express();
var path = require("path");
var bodyParser = require("body-parser");

var db = require('./db');

route.set('port', (process.env.PORT || 5000));
//route.set('views', __dirname + '/views');
route.set('view engine', 'ejs');

route.use(bodyParser.urlencoded({ extended: true }));

//Main request for index site
route.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/views/CV.html'));
});

//Post request, saves text
route.post('/api/post', (request, response) => {
  var input = request.body.textfield || null
  db.save(input, (res, err) => {
    if (err) response.send(err)
    else response.send(res)
  })
});

//Get request
route.get('/api/get', (request, response) => {
  response.send(db.load())
});

route.listen(route.get('port'), () => {
  console.log('Node app is running on port', route.get('port'));
});

module.exports = route;
