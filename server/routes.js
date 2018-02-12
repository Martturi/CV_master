const express = require('express')
const session = require('express-session')
const gauth = require('@reaktor/express-gauth')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')
const pdf = require('./pdf')
const config = require('./config')

const route = express()

console.log('starting server')

const allowedLoginFromDomains = ['reaktor.com', 'reaktor.fi', 'gmail.com']
const myGauth = gauth({
  clientID: '233998639985-i5o8sbo7p1a2qtr9eu6cis37atvv9l28.apps.googleusercontent.com',
  clientSecret: 'JzR9SQGzPk1jGKvJiVGH17HV',
  clientDomain: config.clientURL,
  allowedDomains: allowedLoginFromDomains,
})

route.use(session({
  secret: 'lol',
  resave: false,
  saveUninitialized: true,
}))

route.use(myGauth)

route.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  console.log('user id', req.user && req.user.emails && req.user.emails[0])
  next()
})

route.set('port', (process.env.PORT || 5000))
route.set('view engine', 'ejs')

route.use(bodyParser.urlencoded({ extended: true }))
route.use(bodyParser.json())

// if (process.env.NODE_ENV === 'production') {
route.use(express.static(path.resolve(__dirname, '../react/build')))
// }

const handleDBRequest = (dbFunction, request, response) => {
  // make a new, empty object and fill it with the contents of request.params and request.body:
  const params = Object.assign({}, request.params, request.body)
  console.log(`Performing db operation "${dbFunction.name}" with params (next line):`)
  console.log(params)
  dbFunction(params)
    .then((res) => { response.send(res) })
    .catch((err) => {
      console.log(err)
      response.status(500).send('Database error')
    })
}

// Post request for saving CV with username and CV name
route.post('/api/users/:username/cvs/:cvName', (request, response) => {
  handleDBRequest(db.save, request, response)
})

// Get request for loading CV with username and CV name
route.get('/api/users/:username/cvs/:cvName', (request, response) => {
  handleDBRequest(db.load, request, response)
})

// Get request for loading pdf with username and CV name
route.get('/api/users/:username/cvs/:cvName/pdf', (request, response) => {
  const params = Object.assign({}, request.params)
  const f = db.load
  console.log(`Performing db operation "${f.name}" with params (next line):`)
  console.log(params)
  f(params)
    .then((res) => {
      pdf.servePDF(res, response, params.username)
    })
    .catch((err) => {
      console.error(err)
      response.status(500).send('Database error')
    })
})

route.put('/api/users/:username/cvs/:cvName', (request, response) => {
  handleDBRequest(db.rename, request, response)
})

route.get('/api/users', (request, response) => {
  handleDBRequest(db.loadUserList, request, response)
})

route.get('/api/users/:username/cvs', (request, response) => {
  handleDBRequest(db.loadCVList, request, response)
})

route.post('/api/users/:username/cvs/:cvName/copy', (request, response) => {
  handleDBRequest(db.copy, request, response)
})

route.delete('/api/users/:username/cvs/:cvName', (request, response) => {
  handleDBRequest(db.deleteCV, request, response)
})

// Sends a preview based on the text from the request.
route.post('/actions/preview', (request, response) => {
  const text = request.body.text || ''
  const username = request.body.username || ''
  console.log('Loading preview for cv')
  const preview = pdf.getHTML(text, username)
  response.send(preview)
})

route.listen(route.get('port'), () => {
  console.log('Node app is running on port', route.get('port'))
})

module.exports = route
