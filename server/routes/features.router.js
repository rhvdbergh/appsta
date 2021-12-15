const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route for GET /api/features
// returns a list of all the features in the db
router.get('/', (req, res) => {
  // build a sql query
  const queryText = `
    SELECT * FROM "features";
  `;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('error getting the features on the db', err);
      res.sendStatus(500);
    });
});

module.exports = router;
