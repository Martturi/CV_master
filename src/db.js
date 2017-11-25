const { Pg } = require('pg');

const pg = new Pg({
  connectionString: process.env.DATABASE_URL
});

pg.connect();

pg.query('SELECT text FROM cv_table WHERE id = 0;', (err, res) => {
  if (err) throw err;
    JSON.parse(JSON.stringify(res.rows[0]), (key, value) => {
      if (key == "text") {
      text = value;
    }
    });
});
