const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')
const servePDF = require('./pdf')

const route = express()

route.set('port', (process.env.PORT || 5000))
route.set('view engine', 'ejs')

route.use(bodyParser.urlencoded({ extended: true }))
route.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
  route.use(express.static(path.resolve(__dirname, '../react/build')))
}

// Post request for saving CV with username and CV name
route.post('/api/users/:username/cvs/:cvName', (request, response) => {
  const { username } = request.params || 'username'
  const { cvName } = request.params || 'cvName'
  const text = request.body.text || null
  console.log(`Saving cv: (username, cv_name) = ("${username}", "${cvName}")`)
  db.save(username, cvName, text)
    .then((val) => { response.send(val) })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

// Get request for loading CV with username and CV name
route.get('/api/users/:username/cvs/:cvName', (request, response) => {
  const { username } = request.params || 0
  const { cvName } = request.params || 0
  console.log(`Loading cv: (username, cv_name) = ("${username}", "${cvName}")`)
  db.load(username, cvName)
    .then((res) => { console.log(`result: ${res}`); response.send(res) })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

// Get request for loading pdf with username and CV name
route.get('/api/users/:username/cvs/:cvName/pdf', (request, response) => {
  const { username } = request.params || 0
  const { cvName } = request.params || 0
  console.log(`Loading pdf for cv ${cvName} with username ${username}`)
  db.load(username, cvName)
    .then((res) => {
      servePDF(res, response)
    })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

route.put('/api/users/:username/cvs/:cvName', (request, response) => {
  const { username } = request.params || 'username'
  const { cvName } = request.params || 'cvName'
  const newCVName = request.body.newCVName || 'newCVName'
  console.log(`Renaming cv: (username, cv_name) = ("${username}", "${cvName}") to cv_name = "${newCVName}"`)
  db.rename(username, cvName, newCVName)
    .then((res) => { response.send(res) })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

route.get('/api/users', (request, response) => {
  console.log('Loading a list of all users')
  db.loadUserList()
    .then((usernames) => {
      const usernameArray = usernames.map(row => row.username)
      response.send(usernameArray)
    })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

route.get('/api/users/:username/cvs', (request, response) => {
  const { username } = request.params || 'user'
  console.log(`Loading CV names of user "${username}"`)
  db.loadCVList(username)
    .then((res) => {
      const cvs = res.map(row => row.cv_name)
      response.send(cvs)
    })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

route.post('/api/users/:username/cvs/:cvName/copy', (request, response) => {
  const { username } = request.params || 'username'
  const { cvName } = request.params || 'cvName'
  console.log(`Copying CV: (username, cvName) = ("${username}", "${cvName}")`)
  db.copy(username, cvName)
    .then((val) => { response.send(val) })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

route.delete('/api/users/:username/cvs/:cvName', (request, response) => {
  const { username } = request.params || 'user'
  const { cvName } = request.params || '0'
  console.log(`Deleting CV: (username, cv_name) = ("${username}", "${cvName}")`)
  db.deleteCV(username, cvName)
    .then((val) => { response.send(val) })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

route.listen(route.get('port'), () => {
  console.log('Node app is running on port', route.get('port'))
})

module.exports = route
