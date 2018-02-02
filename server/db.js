const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const load = (username, cvName) => {
  const query = 'SELECT text FROM cvs WHERE username = $1 AND cv_name = $2;'
  return client.query(query, [username, cvName])
    .then(result => (result.rows[0] ? result.rows[0].text : 'New CV'))
}

const save = (username, cvName, text) => {
  const query = 'INSERT INTO cvs VALUES ($1, $2, $3) ON CONFLICT (username, ' +
                'cv_name) DO UPDATE SET text = $3;'
  return client.query(query, [username, cvName, text])
    .then(() => 'Save succeeded.')
}

const clear = () => {
  if (config.env !== 'production') {
    const query = 'TRUNCATE TABLE cv_table; TRUNCATE TABLE cvs;'
    return client.query(query)
      .then(() => 'Clear succeeded.')
  }
  return 'Not allowed!'
}

const loadUserList = () => {
  const query = 'SELECT DISTINCT username FROM cvs ORDER BY username;'
  return client.query(query)
    .then(result => result.rows)
}

const loadCVList = (username) => {
  const query = 'SELECT cv_name FROM cvs WHERE username = $1 ORDER BY cv_name;'
  return client.query(query, [username])
    .then(result => result.rows)
}

const rename = (username, oldCVName, newCVName) => {
  const query = 'SELECT rename_cv($1, $2, $3);'
  return client.query(query, [username, oldCVName, newCVName])
    .then(result => result.rows[0].rename_cv)
}

const copy = (username, cvName) => {
  const query = 'SELECT copy_cv($1, $2);'
  return client.query(query, [username, cvName])
    .then(result => result.rows[0].copy_cv)
}

const deleteCV = (username, cvName) => {
  const query = 'SELECT delete_cv($1, $2);'
  return client.query(query, [username, cvName])
    .then(result => result.rows[0].delete_cv)
}

module.exports = {
  load, save, clear, loadUserList, loadCVList, copy, deleteCV, rename,
}
