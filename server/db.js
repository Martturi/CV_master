const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const insert = (input, uid) => {
  const query = 'INSERT INTO cvs VALUES ($2, $1) ON CONFLICT DO NOTHING;'
  return new Promise((resolve, reject) => {
    client.query(query, [input, uid], (err, result) => {
      if (err) reject(err)
      else if (result) resolve('Created new CV')
    })
  })
}

const load = (username, cvName) => {
  const query = 'SELECT text FROM cvs WHERE username = $1 AND cv_name = $2;'
  return new Promise((resolve, reject) => {
    client.query(query, [username, cvName])
      .then((result) => {
        if (result.rowCount > 0) resolve(result.rows[0].text)
        else { resolve('New CV') }
      }).catch((err) => { reject(err) })
  })
}

const loadUserList = () => {
  const query = 'SELECT DISTINCT username FROM cvs ORDER BY username;'
  return new Promise((resolve, reject) => {
    client.query(query)
      .then((result) => {
        resolve(result.rows)
      }).catch((err) => { reject(err) })
  })
}

const loadCVList = (username) => {
  const query = 'SELECT cv_name FROM cvs WHERE username = $1 ORDER BY cv_name;'
  return new Promise((resolve, reject) => {
    client.query(query, [username])
      .then((result) => {
        resolve(result.rows)
      }).catch((err) => { reject(err) })
  })
}

const save = (username, cvName, input) => {
  const query = 'INSERT INTO cvs VALUES ($1, $2, $3) ON CONFLICT (username, cv_name) DO UPDATE SET text=$3;'
  return new Promise((resolve, reject) => {
    client.query(query, [username, cvName, input])
      .then(() => { resolve('Save succeeded.') })
      .catch((err) => { reject(err) })
  })
}

const rename = (username, oldCVName, newCVName) => {
  const query = 'UPDATE cvs SET cv_name = $3 WHERE username = $1 AND cv_name = $2;'
  return new Promise((resolve, reject) => {
    client.query(query, [username, oldCVName, newCVName])
      .then(() => { resolve('Rename succeeded.') })
      .catch((err) => { reject(err) })
  })
}

const deleteCV = (username, cvName) => {
  const query = 'DELETE FROM cvs WHERE username = $1 AND cv_name = $2;'
  return new Promise((resolve, reject) => {
    client.query(query, [username, cvName])
      .then(() => { resolve('Delete succeeded.') })
      .catch((err) => { reject(err) })
  })
}

const clear = () => {
  if (config.env !== 'production') {
    const query = 'TRUNCATE TABLE cvs;'
    return new Promise((resolve, reject) => {
      client.query(query)
        .then(() => { resolve('Clear succeeded.') })
        .catch((err) => { reject(err) })
    })
  }
  return 'Not allowed!'
}

module.exports = {
  load, loadUserList, loadCVList, save, rename, deleteCV, insert, clear,
}
