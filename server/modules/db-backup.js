const pool = require('../modules/pool');

const dbBackup = (server) => {
  // this query returns all the public tables in the db
  const query = `
    SELECT table_name 
    FROM information_schema.tables
    WHERE table_schema = 'public';
  `;
  pool
    .query(query)
    .then((response) => {
      // uncomment this line to automatically detect the tables
      // note that the inserts might not be in the correct order!
      // also comment out the const tables below.
      // const tables = response.rows.map((t) => t.table_name);

      // these tables have been placed into the correct order
      // for the insert statements to work
      const tables = [
        'users',
        'buyers',
        'feature_categories',
        'features',
        'agencies',
        'projects',
        'project_features',
        'agency_features',
        'project_agencies',
        'agency_conversion',
      ];

      for (let i = 0; i < tables.length; i++) {
        backupTable(tables[i]);
      }
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

const backupTable = (table) => {
  // grab the table in a query
  const query = `
    SELECT * FROM ${table};
  `;
  pool
    .query(query)
    .then((response) => {
      // extract the entries of all these tables
      const entries = response.rows;

      //extract the table headings
      const headings = Object.keys(entries[0]);

      // construct an insert query
      let insertQuery = `INSERT INTO ${table} (`;

      // add table headings, except last heading
      // we start form 1 because heading 0 is the "id"
      // which we don't want!
      for (let i = 1; i < headings.length - 1; i++) {
        insertQuery += `"${headings[i]}", `;
      }
      // add the last heading
      insertQuery += `"${headings[headings.length - 1]}") VALUES `;

      // add the values
      // for each entry except the last
      for (let j = 0; j < entries.length - 1; j++) {
        insertQuery += `(`;
        // for each heading except the last
        // we start form 1 to exclude the "id"
        for (let i = 1; i < headings.length - 1; i++) {
          insertQuery += `'${entries[j][headings[i]]}', `;
        }
        insertQuery += `'${entries[j][headings[headings.length - 1]]}'), `;
      }

      // now add the last entry
      insertQuery += `(`;
      // for each heading except the last
      // we start from 1 to exclude the "id"
      for (let i = 1; i < headings.length - 1; i++) {
        insertQuery += `'${entries[entries.length - 1][headings[i]]}', `;
      }
      insertQuery += `'${
        entries[entries.length - 1][headings[headings.length - 1]]
      }');`;

      console.log(insertQuery);
    })
    .catch((err) => {
      console.log('there was an error selecting from table', table);
      console.log('Error:', err);
    });
};

module.exports = dbBackup;
