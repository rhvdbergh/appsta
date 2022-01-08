const pool = require('../modules/pool');

const dbBackup = (server) => {
  // this query returns all the public tables in the db
  const query = `
    SELECT table_name 
    FROM information_schema.tables
    WHERE table_schema = 'public';
  `;
  console.log('in dbBackup');
  pool
    .query(query)
    .then((response) => {
      console.log(response.rows);
    })
    .catch((err) =>
      console.log(
        'there was an error while retrieving the tables in the database:',
        err
      )
    );
  console.log('Backup complete: closing server...');
  server.close();
};

module.exports = dbBackup;
