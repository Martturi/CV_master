const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const load = ({ cvID }) => {
  const query = `
    SELECT a.section_id AS section_id, eng_title, text FROM cv_sections AS a LEFT OUTER JOIN
    section_data AS b ON a.section_id = b.section_id AND cv_id = $1 ORDER BY section_order;
  `
  return client.query(query, [cvID])
    .then((result) => {
      const rows = result.rows
      // after left outer join result.rows[i].text can be NULL so we have to be careful:
      for (let i = 0; i < rows.length; i += 1) {
        if (!rows[i].text) rows[i].text = ''
      }
      return rows
    })
}

const createCV = ({ username, cvName }) => {
  const date = new Date().toUTCString()
  const query = `INSERT INTO cvs VALUES (DEFAULT, $1, $2, '${date}') RETURNING cv_id;`
  return client.query(query, [username, cvName])
    .then((res) => {
      // default query never causes a conflict so we don't have to check whether res.rows[0] is
      // defined:
      return res.rows[0].cv_id
    })
}

const save = ({ cvID, sections }) => {
  const insertOrDelete = (index) => {
    if (index < sections.length) {
      const section = sections[index]
      // if section.text is non-empty do upsert
      if (section.text) {
        const query = `
          INSERT INTO section_data VALUES ($1, $2, $3) ON CONFLICT (cv_id, section_id) DO UPDATE SET
          text = $3;
        `
        return client.query(query, [cvID, section.section_id, section.text])
          .then(() => insertOrDelete(index + 1))
      }
      // otherwise, delete an empty section from db:
      const query = 'DELETE FROM section_data WHERE cv_id = $1 AND section_id = $2;'
      return client.query(query, [cvID, section.section_id])
        .then(() => insertOrDelete(index + 1))
    }
    return Promise.resolve('Save succeeded.')
  }
  const date = new Date().toUTCString() // for example: 'Fri, 09 Feb 2018 13:55:00 GMT'.
  // Postgres automatically translates this string into a correct date object.
  const query = `UPDATE cvs SET last_updated = '${date}' WHERE cv_id = $1;`
  return client.query(query, [cvID])
    .then(() => insertOrDelete(0))
}

const initializeTestDB = (testUsername, testCVName, testSections) => {
  if (config.env !== 'production') {
    const date = new Date().toUTCString()
    const sectionInserts = testSections.map(section => (
      `INSERT INTO cv_sections VALUES (${section.section_id}, '', '${section.eng_title}', ` +
      `${section.order})`
    )).join('; ')
    const query = `
      DELETE FROM users;
      DELETE FROM cv_sections;
      INSERT INTO users VALUES ('${testUsername}', '');
      ALTER SEQUENCE cvs_cv_id_seq RESTART WITH 1;
      INSERT INTO cvs VALUES (DEFAULT, '${testUsername}', '${testCVName}', '${date}');
      ${sectionInserts};
    `
    return client.query(query)
      .then(() => 'Initialize succeeded.')
  }
  return 'Not allowed!'
}

const clear = () => {
  if (config.env !== 'production') {
    const query = 'TRUNCATE TABLE users CASCADE; TRUNCATE TABLE cv_sections CASCADE;'
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
  const query = `
    SELECT cv_id, cv_name, last_updated FROM cvs WHERE username = $1 ORDER BY last_updated DESC;
  `
  return client.query(query, [username])
    .then(result => result.rows)
}

const rename = ({ cvID, newCVName }) => {
  const query = 'UPDATE cvs SET cv_name = $2 WHERE cv_id = $1;'
  return client.query(query, [cvID, newCVName])
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

const copy = ({ cvID }) => {
  const query = 'SELECT username, cv_name FROM cvs WHERE cv_id = $1'
  return client.query(query, [cvID])
    .then(result => (result.rows[0] || Promise.reject('Copy failed')))
    .then((row) => {
      const username = row.username
      const newCVName = `${row.cv_name} (copy)`
      return createCV({ username, cvName: newCVName })
        .then((newCVID) => {
          return load({ cvID })
            .then((sections) => {
              return save({ cvID: newCVID, sections })
                .then(() => newCVID.toString())
            })
        })
    })
}

const deleteCV = ({ cvID }) => {
  const selectQuery = 'SELECT username FROM cvs WHERE cv_id = $1'
  return client.query(selectQuery, [cvID])
    .then(result => (result.rows[0] ? result.rows[0].username : Promise.reject('Deleting failed')))
    .then((username) => {
      return loadCVList({ username })
        .then((cvs) => {
          if (cvs.length >= 2) {
            const query = 'DELETE FROM cvs WHERE cv_id = $1;'
            return client.query(query, [cvID])
              .then(result => result.rowCount.toString())
          }
          return Promise.resolve('0')
        })
    })
}

module.exports = {
  load,
  save,
  clear,
  loadUserList,
  loadCVList,
  copy,
  deleteCV,
  rename,
  loadFullName,
  initializeTestDB,
}
