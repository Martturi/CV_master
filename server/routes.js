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

const handleDBRequest = (dbFunction, request, response) => {
  const params = Object.values(request.params || { })
  const body = Object.values(request.body || { })
  body.forEach(param => params.push(param))
  console.log(`Performing db operation "${dbFunction.name}" with params ` +
              `${params.toString() || 'null'}`)
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
  const params = Object.values(request.params)
  console.log(`Loading pdf for cv ${params[0]} with username ${params[1]}`)
  db.load(params)
    .then((res) => {
      servePDF(res, response)
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

route.listen(route.get('port'), () => {
  console.log('Node app is running on port', route.get('port'))
})

module.exports = route
