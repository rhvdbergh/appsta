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

// route for GET /api/features/:buyer_id
// returns a list of all the project features in the db
// associated with this buyer id
router.get('/:buyer_id', (req, res) => {
  // build a sql query
  const queryText = `
    SELECT * FROM project_features
    JOIN projects ON projects.id = project_features.project_id
    JOIN features ON project_features.feature_id = features.id
    WHERE projects.buyer_id = $1; 
  `;

  // parameterize the user input
  const values = [req.params.buyer_id];

  pool
    .query(queryText, values)
    .then((response) => {
      console.log(`the buyer's project features are:`, response.rows)
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('error getting the project features on the db', err);
      res.sendStatus(500);
    });
});

module.exports = router;
