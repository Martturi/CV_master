const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

// Old methods for cv_table
/* const insert = (input, uid) => {
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
} */

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

const save = (input, username, cvName) => {
  const query = 'INSERT INTO cvs VALUES ($2, $3, $1) ON CONFLICT (username, cv_name) DO UPDATE SET text = $1'
  return new Promise((resolve, reject) => {
    client.query(query, [input, username, cvName])
      .then(() => { resolve('Save succeeded.') })
      .catch((err) => { reject(err) })
  })
}

const clear = () => {
  if (config.env !== 'production') {
    const query = 'TRUNCATE TABLE cv_table; TRUNCATE TABLE cvs;'
    return new Promise((resolve, reject) => {
      client.query(query)
        .then(() => { resolve('Clear succeeded.') })
        .catch((err) => { reject(err) })
    })
  }
  return 'Not allowed!'
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

const copy = (username, cvName) => {
  const query = 'SELECT copy_cv($1, $2);'
  return new Promise((resolve, reject) => {
    client.query(query, [username, cvName])
      .then((result) => {
        resolve(result.rows[0].copy_cv)
      }).catch((err) => { reject(err) })
  })
}

const deleteCV = (username, cvName) => {
  const query = 'SELECT delete_cv($1, $2);'
  return new Promise((resolve, reject) => {
    client.query(query, [username, cvName])
      .then((result) => { resolve(result.rows[0].delete_cv) })
      .catch((err) => { reject(err) })
  })
}

module.exports = {
  load, save, clear, loadUserList, loadCVList, copy, deleteCV,
}
