const { Client } = require('pg')
const config = require('./config')

const client = new Client({
  connectionString: config.databaseURL,
})

client.connect().catch(e => console.error('connection error', e.stack))

const load = ({ username, cvName }) => {
  const query = 'SELECT section_nr, text FROM Sections WHERE username = $1 AND cv_name = $2 ORDER BY section_nr;'
  return client.query(query, [username, cvName])
    .then((result) => {
      const rows = result.rows
      const lastSectionNr = rows.length === 0 ? 0 : rows[rows.length - 1].section_nr
      const sectionContents = []
      for (let i = 0; i <= lastSectionNr; i += 1) sectionContents.push('')
      rows.forEach((row) => { sectionContents[row.section_nr] = row.text })
      return sectionContents
    })
}

const save = ({ username, cvName, sectionContents }) => {
  const insertOrDelete = (index, nonEmptySectionCount) => {
    if (index < sectionContents.length) {
      // if sectionContents[index] is non-empty do upsert
      if (sectionContents[index]) {
        const query = `INSERT INTO Sections VALUES ($1, $2, ${index}, $3) ON CONFLICT (username, cv_name, section_nr) DO UPDATE SET text = $3;`
        return client.query(query, [username, cvName, sectionContents[index]])
          .then(() => insertOrDelete(index + 1, nonEmptySectionCount + 1))
      }
      // otherwise, delete an empty section from db:
      const query = `DELETE FROM Sections WHERE username = $1 AND cv_name = $2 and section_nr = ${index};`
      return client.query(query, [username, cvName])
        .then(() => insertOrDelete(index + 1, nonEmptySectionCount))
    }
    // if all sections were empty (and so all sections were deleted), add an empty section so that
    // the whole CV doesn't get deleted:
    if (!nonEmptySectionCount) {
      const query = 'INSERT INTO Sections VALUES ($1, $2, 0, \'\') ON CONFLICT (username, cv_name, section_nr) DO UPDATE SET text = \'\';'
      return client.query(query, [username, cvName])
        .then(() => 'Save succeeded.')
    }
    return Promise.resolve('Save succeeded.')
  }
  return insertOrDelete(0, 0)
}

const clear = () => {
  if (config.env !== 'production') {
    const query = 'TRUNCATE TABLE Sections; TRUNCATE TABLE cvs; TRUNCATE TABLE users;'
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
  const query = 'SELECT DISTINCT cv_name FROM Sections WHERE username = $1 ORDER BY cv_name;'
  return client.query(query, [username])
    .then(result => result.rows.map(row => row.cv_name))
}

const rename = ({ username, cvName, newCVName }) => {
  const query = 'UPDATE Sections SET cv_name = $3 WHERE username = $1 AND cv_name = $2;'
  return client.query(query, [username, cvName, newCVName])
    .then(result => result.rowCount.toString())
}

const copy = ({ username, cvName }) => {
  return load({ username, cvName })
    .then((sectionContents) => {
      return loadCVList({ username })
        .then((cvs) => {
          let n = 1
          let newCVName
          do {
            newCVName = `${cvName}(${n})`
            n += 1
          } while (cvs.includes(newCVName))
          const saveArray = { username, sectionContents, cvName: newCVName }
          return save(saveArray)
            .then(() => newCVName)
        })
    })
}

const deleteCV = ({ username, cvName }) => {
  return loadCVList({ username })
    .then((cvs) => {
      if (cvs.length >= 2) {
        const query = 'DELETE FROM Sections WHERE username = $1 AND cv_name = $2;'
        return client.query(query, [username, cvName])
          .then(result => result.rowCount.toString())
      }
      return Promise.resolve('0')
    })
}

module.exports = {
  load, save, clear, loadUserList, loadCVList, copy, deleteCV, rename,
}
