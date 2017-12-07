const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

let text = '';
const username = 'user1';

client.connect()

const selectQuery = 'SELECT eng_body FROM cv_sections WHERE cv_nr IN (SELECT cv_nr FROM cv_table WHERE username = $1);';

client.query(selectQuery, [username], (err, result) => {
  if (err) throw err;
  JSON.parse(JSON.stringify(result.rows[0]), (key, value) => {
    if (key === 'eng_body') {
      text = value;
    }
  })
})

const load = () => text

const save = (input) => {
  text = input;
  const cv_nr = 1; //for testing purposes - later, cv_nr should be unique
  const section_nr = 1; //for testing purposes - later, the combination of cv_nr and section_nr should be unique
  const query = 'INSERT INTO cv_sections VALUES ($1, $2, $3, NULL) ON CONFLICT (cv_nr, section_nr) DO UPDATE SET eng_body = $3 WHERE cv_sections.cv_nr = $1;';
  return new Promise((resolve, reject) => {
    client.query(query, [cv_nr, section_nr, text], (err, result) => {
      if (err) reject(err);
      else if (result) resolve('Save succeeded.');
    });
  });
};

module.exports = { load, save }
