const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// route for GET /api/features
// returns a list of all the features in the db
router.get('/', (req, res) => {
  // build a sql query
  const queryText = `
    SELECT * FROM "features";
  `;

  // run the query
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

// route for GET /api/features/:project_id
// returns a list of all the project features in the db
// associated with this project id
router.get('/:project_id', rejectUnauthenticated, (req, res) => {
  // build a sql query
  const queryText = `
    SELECT * FROM project_features
    JOIN projects ON projects.id = project_features.project_id
    JOIN features ON project_features.feature_id = features.id
    WHERE projects.id = $1; 
  `;

  // parameterize the user input
  const values = [req.params.project_id];

  // run the query
  pool
    .query(queryText, values)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('error getting the project features on the db', err);
      res.sendStatus(500);
    });
});

module.exports = router;
