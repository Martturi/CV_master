const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let text = '';

client.connect();

client.query('SELECT text FROM cv_table WHERE id = 0;', (err, res) => {
  if (err) throw err;
  JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
    if (key === 'text') {
      text = value;
    }
  });
});

const load = () => text;

const save = (input) => {
  text = input;
  const q = 'UPDATE cv_table SET text=$1 WHERE id = 0;';
  client.query(q, [text], (res, err) => {
    if (err) {
      return err;
    }
    return res;
  });
};

module.exports = { load, save };
