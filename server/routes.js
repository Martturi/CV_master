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

route.post('/api/cv/:username/:cvName', (request, response) => {
  const { username } = request.params || 'user'
  const { cvName } = request.params || '0'
  const input = request.body.text || null
  console.log(`Saving ${input} as ${username} to cv ${cvName}`)
  db.save(username, cvName, input)
    .then((val) => { response.send(val) })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})

// Get request
route.get('/api/cv/:username/:cvName', (request, response) => {
  const { username } = request.params || 'user'
  const { cvName } = request.params || '0'
  console.log(`Loaded cv: username ${username} cv name ${cvName}`)
  db.load(username, cvName)
    .then((res) => { response.send(res) })
    .catch((err) => { console.log(err); response.send(`Database error: \n ${err}`) })
})

route.get('/api/pdf/:username/:cvName', (request, response) => {
  const { username } = request.params || 0
  const { cvName } = request.params || 0
  console.log(`Loading pdf: username ${username}, cv name ${cvName}`)
  db.load(username, cvName)
    .then((res) => {
      servePDF(res, response)
    })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})

route.get('/api/userlist', (request, response) => {
  console.log('Loading a list of all users')
  db.loadUserList()
    .then((res) => {
      const usernames = res.map(row => row.username).join(';')
      console.log(usernames)
      response.send(usernames)
    })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})

route.get('/api/cvlist/:username', (request, response) => {
  const { username } = request.params || 'user'
  console.log(`Loading ${username}'s CVs`)
  db.loadCVList(username)
    .then((res) => {
      const cvs = res.map(row => row.cv_name).join(';')
      console.log(cvs)
      response.send(cvs)
    })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})


route.listen(route.get('port'), () => {
  console.log('Node app is running on port', route.get('port'))
})

module.exports = route
