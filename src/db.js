const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

let text = ''
const cv_nr = 1
const section_nr = 1 //for testing

client.connect()

client.query('SELECT eng_body FROM sections WHERE cv_nr = $1 AND section_nr = $2;', [cv_nr, section_nr], (err, result) => {
  if (err) throw err
  JSON.parse(JSON.stringify(result.rows[0]), (key, value) => {
    if (key === 'eng_body') {
      text = value
    }
  })
})

const load = () => text

const save = (input) => {
  text = input
  const query = 'UPDATE sections SET eng_body = $1 WHERE cv_nr = $2 AND section_nr = $3;'
  return new Promise((resolve, reject) => {
    client.query(query, [text, cv_nr, section_nr], (err, result) => {
      if (err) reject(err)
      else if (result) resolve('Save succeeded.')
    })
  })
}

module.exports = { load, save }
