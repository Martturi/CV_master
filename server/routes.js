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
//
// route.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../react/build', 'index.html'))
// })

route.post('/api/:uid', (request, response) => {
  const { uid } = request.params || '0'
  const input = request.body.text || null
  console.log(input, uid)
  db.save(input, uid)
    .then((val) => { response.send(val) })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})

// Get request
route.get('/api/:uid', (request, response) => {
  const { uid } = request.params || 0
  console.log(uid)
  db.load(uid)
    .then((res) => { response.send(res) })
    .catch((err) => { response.send(`Database error: \n ${err}`) })
})

// Main request for index site
// route.get('/', (request, response) => {
//   ReactDOM.render(<'./components/App' />, document.getElementById('root'));
// })
//
// // Get individual CV. Creates a new CV if used UID doesn't already have one
// route.get('/:uid', (request, response) => {
//   const { uid } = request.params || 0
//   db.load(uid)
//     .then((res) => { response.render('CV.ejs', { text: res }) })
//     .catch((err) => { response.send(`Database error: \n ${err}`) })
// })
//
// Post request, saves text

route.listen(route.get('port'), () => {
  // console.log('Node app is running on port', route.get('port'))
})

module.exports = route
