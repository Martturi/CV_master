const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let text = '';
const id = 0;

client.connect();

client.query('SELECT text FROM cv_table WHERE id = $1;', [id], (err, result) => {
  if (err) throw err;
  JSON.parse(JSON.stringify(result.rows[0]), (key, value) => {
    if (key === 'text') {
      text = value;
    }
  });
});

const load = () => text;

const save = (input) => {
  text = input;
  const query = 'INSERT INTO cv_table VALUES ($2, $1) ON CONFLICT (id) DO UPDATE SET text = $1 WHERE cv_table.id = $2;';
  return new Promise((resolve, reject) => {
    client.query(query, [text, id], (err, result) => {
      if (err) reject(err);
      else if (result) resolve('Save succeeded.');
    });
  });
};

module.exports = { load, save };
