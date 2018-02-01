const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const load = (params) => {
  const query = 'SELECT text FROM cvs WHERE username = $1 AND cv_name = $2;'
  return client.query(query, params)
    .then(result => (result.rows[0] ? result.rows[0].text : 'New CV'))
}

const save = (params) => {
  const query = 'INSERT INTO cvs VALUES ($1, $2, $3) ON CONFLICT (username, ' +
                'cv_name) DO UPDATE SET text = $3;'
  return client.query(query, params)
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
    .then(result => result.rows.map(row => row.username))
}

const loadCVList = (params) => {
  const query = 'SELECT cv_name FROM cvs WHERE username = $1 ORDER BY cv_name;'
  return client.query(query, params)
    .then(result => result.rows.map(row => row.cv_name))
}

const rename = (params) => {
  const query = 'UPDATE cvs SET cv_name = $3 WHERE username = $1 AND ' +
                'cv_name = $2;'
  return client.query(query, params)
    .then(result => result.rowCount.toString())
}

const copy = (params) => {
  const query = 'SELECT copy_cv($1, $2);'
  return client.query(query, params)
    .then(result => result.rows[0].copy_cv)
}

const deleteCV = (params) => {
  const query = 'SELECT delete_cv($1, $2);'
  return client.query(query, params)
    .then(result => result.rows[0].delete_cv)
}

module.exports = {
  load, save, clear, loadUserList, loadCVList, copy, deleteCV, rename,
}
