const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let text = '';
let id = 0;

client.connect();

client.query('SELECT text FROM cv_table WHERE id = $1;', [id], (err, res) => {
  if (err) throw err;
  JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
    if (key === 'text') {
      text = value;
    }
  });
});

const load = () => text;

var save = (input) => {
  text = input
  const q = "UPDATE cv_table SET text = $1 WHERE id = $2;"
  client.query(q, [text, id], (err, res) => {
    if (err) {
      return err;
    }
    return res;
  });
};

module.exports = { load, save };
