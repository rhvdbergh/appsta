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
      const tables = response.rows.map((t) => t.table_name);

      console.log(tables);
      console.log('Backup complete: closing server...');
      server.close();
      process.exit();
    })
    .catch((err) => {
      console.log(
        'there was an error while retrieving the tables in the database:',
        err
      );
      console.log('Closing server...');
      server.close();
      process.exit();
    });
};

module.exports = dbBackup;
