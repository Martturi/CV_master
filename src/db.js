const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect()

const load = (uid) => {
  const query = 'SELECT text FROM cv_table WHERE id = $1;'
  return new Promise((resolve, reject) => {
    client.query(query, [uid], (err, result) => {
      if (err) reject(err)
      try {
        JSON.parse(JSON.stringify(result.rows[0]), (key, value) => {
          if (key === 'text') {
            resolve(value)
          }
        })
      } catch (exeption) {
        reject(exeption)
      }
    })
  })
}

const save = (input, uid) => {
  const query = 'UPDATE cv_table SET text = $1 WHERE id = $2;'
  return new Promise((resolve, reject) => {
    client.query(query, [input, uid], (err, result) => {
      if (err) reject(err)
      else if (result) resolve('Save succeeded.')
    })
  })
}

module.exports = { load, save }
