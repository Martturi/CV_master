const { Client } = require('pg');

const pg = new Client({
  connectionString: process.env.DATABASE_URL
});

var text = ''

pg.connect();

pg.query('SELECT text FROM cv_table WHERE id = 0;', (err, res) => {
  if (err) throw err;
    JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
      if (key == "text") {
      text = value;
    }
    });
});

var load = () => {
  return text
};

var save = (text) => {
  var q = "UPDATE cv_table SET text=\'"+text+"\' WHERE id = 0;"
  return pg.query(q);
};

module.exports = {load, save};
