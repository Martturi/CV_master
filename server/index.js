const express = require('express')
const route = require('./routes')

const app = express.Router()

app.use('/', route)

module.exports = app
