const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const insert = (input, uid) => {
  const query = 'INSERT INTO cv_table VALUES ($2, $1) ON CONFLICT DO NOTHING;'
  return new Promise((resolve, reject) => {
    client.query(query, [input, uid], (err, result) => {
      if (err) reject(err)
      else if (result) resolve('Created new CV')
    })
  })
}

const load = (uid) => {
  const query = 'SELECT text FROM cv_table WHERE id = $1;'
  return new Promise((resolve, reject) => {
    client.query(query, [uid])
      .then((result) => {
        if (result.rowCount > 0) resolve(result.rows[0].text)
        else { resolve('New CV') }
      }).catch((err) => { reject(err) })
  })
}

const loadAll = () => {
  const query = 'SELECT id FROM cv_table;'
  return new Promise((resolve, reject) => {
    client.query(query, (err, result) => {
      if (err) reject(err)
      try {
        resolve(result.rows)
      } catch (exeption) {
        reject(exeption)
      }
    })
  })
}

const save = (input, uid) => {
  const query = 'INSERT INTO cv_table VALUES ($2, $1) ON CONFLICT (id) DO UPDATE SET text = $1 WHERE cv_table.id = $2;'
  return new Promise((resolve, reject) => {
    client.query(query, [input, uid])
      .then(() => { resolve('Save succeeded.') })
      .catch((err) => { reject(err) })
  })
}

module.exports = {
  load, loadAll, save, insert,
}