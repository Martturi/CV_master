const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

let text = ''
const id = 0

client.connect()

client.query('SELECT text FROM cv_table WHERE id = $1;', [id], (err, result) => {
  if (err) throw err
  JSON.parse(JSON.stringify(result.rows[0]), (key, value) => {
    if (key === 'text') {
      text = value
    }
  })
})

const load = () => text

const save = (input) => {
  text = input
  const query = 'UPDATE cv_table SET text = $1 WHERE id = $2;'
  return new Promise((resolve, reject) => {
    client.query(query, [text, id], (err, result) => {
      if (err) reject(err)
      else if (result) resolve('Save succeeded.')
    })
  })
}

module.exports = { load, save }
