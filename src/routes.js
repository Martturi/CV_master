//Main request for index site
app.get('/', (request, response) => {
  response.sendFile(path.join(views+'/CV.html'));
});

//Post request, saves text
app.post('/api/post', (request, response) => {
  text = request.body.textfield || null
  var q = "UPDATE cv_table SET text=\'"+text+"\' WHERE id = 0;"
  client.query(q, (err, res) => {
    if (err) response.send(err);
    else response.send("Save succeeded")
  });

});

//Get request
app.get('/api/get', (request, response) => {
  response.send(text)
});
