const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// retrieves all the feature categories from the database
// GET /api/category
router.get('/', (req, res) => {
  // build a sql query
  const query = `
    SELECT * FROM "feature_categories";
    `;
  // run the query
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: GET categories', err);
      res.sendStatus(500);
    });
});

module.exports = router;
