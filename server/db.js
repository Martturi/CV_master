const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const load = ({ cvID }) => {
  const query = `
    SELECT a.section_id AS section_id, fin_title, eng_title, fin_text, eng_text, fin_template,
    eng_template FROM cv_sections AS a LEFT OUTER JOIN section_data AS b ON
    a.section_id = b.section_id AND cv_id = $1 ORDER BY section_order;
  `
  return client.query(query, [cvID])
    .then((result) => {
      const rows = result.rows
      // After left outer join result.rows[i].text can be NULL if section_data doesn't have a row
      // with an id of result.rows[i].section_id. In this case, we want to show user a template
      // section.
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i]
        if (row.fin_text === null) row.fin_text = row.fin_template
        if (row.eng_text === null) row.eng_text = row.eng_template
        // ui doesn't care about templates so we set them to 'hidden' to reduce network usage.
        // we could also delete the template property but it's dramatically slower.
        row.fin_template = 'hidden'
        row.eng_template = 'hidden'
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

const save = ({ cvID, username, sections }) => {
  const upsertSection = (index) => {
    if (index < sections.length) {
      const section = sections[index]
      // do upsert
      const query = `
        INSERT INTO section_data VALUES ($1, $2, $3, $4) ON CONFLICT (cv_id, section_id) DO UPDATE
        SET fin_text = $3, eng_text = $4;
      `
      return client.query(query, [cvID, section.section_id, section.fin_text, section.eng_text])
        .then(() => upsertSection(index + 1))
    }
    return Promise.resolve('Save succeeded.')
  }
  const date = new Date().toUTCString() // for example: 'Fri, 09 Feb 2018 13:55:00 GMT'.
  // Postgres automatically translates this string into a correct date object.
  const query = `
    INSERT INTO cvs VALUES ($1, $2, 'Unknown CV', '${date}') ON CONFLICT (cv_id) DO UPDATE SET last_updated = '${date}';
  `
  return client.query(query, [cvID, username])
    .then(() => upsertSection(0))
}

const initializeTestDB = (testUsername, testCVName, testSections) => {
  if (config.env !== 'production') {
    const date = new Date().toUTCString()
    const sectionInserts = testSections.map(section => (
      `INSERT INTO cv_sections VALUES (${section.section_id}, '${section.fin_title}',
      '${section.eng_title}', '${section.fin_template}', '${section.eng_template}',
      ${section.order})`
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
      .catch(() => 'Initialize failed.')
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

const renameUser = ({ username, fullname }) => {
  const query = 'UPDATE users SET full_name = $2 WHERE username = $1;'
  return client.query(query, [username, fullname])
    .then(result => result.rowCount)
}

const addUser = ({ username, fullname }) => {
  const query = 'INSERT INTO users VALUES ($1, $2) ON CONFLICT DO NOTHING;'
  return client.query(query, [username, fullname])
    .then(res => res.rowCount) // res.rowCount: 0 on conflict, 1 otherwise
}

const copy = ({ cvID }) => {
  const query = 'SELECT username, cv_name FROM cvs WHERE cv_id = $1;'
  return client.query(query, [cvID])
    .then(result => (result.rows[0] || Promise.reject('Copy failed')))
    .then((row) => {
      const username = row.username
      const newCVName = `${row.cv_name} (copy)`
      return createCV({ username, cvName: newCVName })
        .then((newCVID) => {
          return load({ cvID })
            .then((sections) => {
              return save({ cvID: newCVID, username, sections })
                .then(() => newCVID.toString())
            })
        })
    })
}

const deleteCV = ({ cvID }) => {
  const selectQuery = 'SELECT username FROM cvs WHERE cv_id = $1;'
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

const configureUser = ({ username, fullname }) => {
  console.log('configuring user', username, fullname)
  return addUser({ username, fullname })
    .then((insertRowCount) => {
      if (!insertRowCount) {
        // user existed beforehand and nothing was done. updating user's full name:
        return renameUser({ username, fullname })
          .then(() => 'user exists in database')
      }
      // user didn't exist beforehand and it was created. creating a cv for the newly created user:
      return createCV({ username, cvName: 'New CV' })
        .then(() => 'new user and cv were created')
    })
}

const getAsset = ({ filename }) => {
  const query = 'SELECT filetype, contents FROM assets WHERE filename = $1;'
  return client.query(query, [filename])
    .then(result => result.rows[0])
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
  configureUser,
  addUser,
  getAsset,
}
