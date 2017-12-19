const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db')

const route = express()

route.set('port', (process.env.PORT || 5000))
route.set('view engine', 'ejs')

route.use(bodyParser.urlencoded({ extended: true }))
route.use(bodyParser.json())

if (process.env.NODE_ENV === "production") {
  route.use(express.static(path.resolve(__dirname, '../react/build')))
}

route.post('/api/:uid', (request, response) => {
  const { uid } = request.params || '0'
  const input = request.body.text || null
  console.log(`Saving ${input} as ${uid}`)
  db.save(input, uid)
    .then((val) => { response.send(val) })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})

// Get request
route.get('/api/:uid', (request, response) => {
  const { uid } = request.params || 0
  console.log(`Loaded cv with uid ${uid}`)
  db.load(uid)
    .then((res) => { response.send(res) })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})

route.listen(route.get('port'), () => {
  console.log('Node app is running on port', route.get('port'))
})

module.exports = route
