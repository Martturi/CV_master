const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const route = express();

route.set('port', (process.env.PORT || 5000));
route.set('views', path.join(__dirname, '/views'));
route.set('view engine', 'ejs');

route.use(bodyParser.urlencoded({ extended: true }));

// Main request for index site
route.get('/', (request, response) => {
  const output = db.load();
  response.render('CV.ejs', { text: output, saveResponse: 'Hi' });
});

// Post request, saves text
route.post('/api', (request, response) => {
  const input = request.body.textfield || null;
  const promise = db.save(input);
  promise.then((val) => {
    response.send(val);
  });
});

// Get request
route.get('/api', (request, response) => {
  response.send(db.load());
});

route.listen(route.get('port'), () => {
  // console.log('Node app is running on port', route.get('port'));
});

module.exports = route;
