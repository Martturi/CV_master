const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const load = ({ username, cvName }) => {
  const query = 'SELECT text FROM cvs WHERE username = $1 AND cv_name = $2;'
  return client.query(query, [username, cvName])
    .then(result => (result.rows[0] ? result.rows[0].text : 'New CV'))
}

const save = ({ username, cvName, text }) => {
  const query = 'INSERT INTO cvs VALUES ($1, $2, $3) ON CONFLICT (username, ' +
                'cv_name) DO UPDATE SET text = $3;'
  return client.query(query, [username, cvName, text])
    .then(() => 'Save succeeded.')
}

const clear = () => {
  if (config.env !== 'production') {
    const query = 'TRUNCATE TABLE cvs; TRUNCATE TABLE users;'
    return client.query(query)
      .then(() => 'Clear succeeded.')
  }
  return 'Not allowed!'
}

const loadUserList = () => {
  const query = 'SELECT username, full_name FROM users ORDER BY full_name;'
  return client.query(query)
    .then(result => result.rows)
}

const loadCVList = ({ username }) => {
  const query = 'SELECT cv_name FROM cvs WHERE username = $1 ORDER BY cv_name;'
  return client.query(query, [username])
    .then(result => result.rows.map(row => row.cv_name))
}

const rename = ({ username, cvName, newCVName }) => {
  const query = 'UPDATE cvs SET cv_name = $3 WHERE username = $1 AND ' +
                'cv_name = $2;'
  return client.query(query, [username, cvName, newCVName])
    .then(result => result.rowCount.toString())
}

const loadFullName = (uid) => {
  const query = `
    SELECT full_name
    FROM users
    WHERE username = $1;
  `
  return client.query(query, [uid])
    .then(result => result.rows[0].full_name)
}

const copy = ({ username, cvName }) => {
  return load({ username, cvName })
    .then((text) => {
      return loadCVList({ username })
        .then((cvs) => {
          let n = 1
          let newCVName
          do {
            newCVName = `${cvName}(${n})`
            n += 1
          } while (cvs.includes(newCVName))
          const saveArray = { username, text, cvName: newCVName }
          return save(saveArray)
            .then(() => newCVName)
        })
    })
}

const deleteCV = ({ username, cvName }) => {
  return loadCVList({ username })
    .then((cvs) => {
      if (cvs.length >= 2) {
        const query = 'DELETE FROM cvs WHERE username = $1 AND cv_name = $2;'
        return client.query(query, [username, cvName])
          .then(result => result.rowCount.toString())
      }
      return Promise.resolve('0')
    })
}

module.exports = {
  load, save, clear, loadUserList, loadCVList, copy, deleteCV, rename, loadFullName,
}
