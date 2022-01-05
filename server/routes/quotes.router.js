const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

// Retrieve a list of agency ID's that provide all of the selected
// features

router.post('/findagencies', (req, res) => {
  // define SQL query text
  const queryText = `
  SELECT af.agency_id, agencies.*, array_agg (af.feature_id) FROM agency_features af
  JOIN agencies ON af.agency_id = agencies.id
  GROUP BY af.agency_id, agencies.id
  HAVING array_agg(af.feature_id) @> ($1::INTEGER[]);
  `;
  // define the array of selected features from req.body
  const values = [req.body];
  console.log('Selected features are: ', req.body);

  // run the query
  pool
    .query(queryText, values)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('error grabbing agencies to quote', err);
      res.sendStatus(500);
    });
});

// retrieve a list of agency feature data needed for a quote,
// given the list of agency ID's and the selected feature ID's

router.post('/agencyquote', (req, res) => {
  console.log('in GET /api/quotes/agencyquote, req.body is: ', req.body);
  // define SQL query text
  const queryText = `
  SELECT af.*, ac.*, features.category_id FROM agency_features af
  JOIN agencies ON af.agency_id = agencies.id
  JOIN agency_conversion ac ON af.agency_id = ac.agency_id
  JOIN features ON af.feature_id = features.id
  WHERE af.feature_id = ANY ($1) AND agencies.id = ANY ($2);
  `;
  // define the values to be passed into the query
  const values = [req.body.selected_features, req.body.agency_ids];
  // run the query
  pool
    .query(queryText, values)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('error grabbing agency feature quote data', err);
      res.sendStatus(500);
    });
});

// gets the latest project saved by this user and
// sends back the id as an object, e.g. {id: 7}
// GET /api/quotes/project/:buyer_id
router.get('/project/:buyer_id', rejectUnauthenticated, (req, res) => {
  // build the SQL query - this will return all, but the latest
  // project will be the first row
  const query = `
  SELECT * FROM projects
  WHERE buyer_id = $1
  ORDER BY date_of_project DESC;
  `;

  // run the query
  pool
    .query(query, [req.params.buyer_id])
    .then((response) => res.send(response.rows[0]))
    .catch((err) => {
      console.log('error getting the latest project id', err);
      res.sendStatus(500);
    });
});

// retrieves a list of ids of agencies that have been
// saved by the user with respect to this project
// GET /api/quotes/savedagencies/:project_id
router.get('/savedagencies/:project_id', rejectUnauthenticated, (req, res) => {
  // build the sql query
  const query = `
    SELECT * FROM project_agencies
    JOIN agencies ON agencies.id = project_agencies.agency_id; 
  `;
  // run the query
  pool
    .query(query)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('error retrieving saved agencies for this project', err);
      res.sendStatus(500);
    });
});

// deletes a specific agency associated with a specific project
// from the project_agencies table
// DELETE /api/quotes/project/:project_id/:agency_id
router.delete(
  '/project/:project_id/:agency_id',
  rejectUnauthenticated,
  (req, res) => {
    // build the SQL query
    const query = `
    DELETE FROM project_agencies
    WHERE project_id = $1 AND agency_id = $2;
  `;
    // parameterize the input
    const values = [req.params.project_id, req.params.agency_id];
    // run the query
    pool
      .query(query, values)
      .then((response) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log('error removing the agency from the project', err);
        res.sendStatus(500);
      });
  }
);

// adds a specific agency to a specific project in the
// project_agencies table
// POST /api/quotes/project/:project_id/:agency_id
router.post(
  '/project/:project_id/:agency_id',
  rejectUnauthenticated,
  (req, res) => {
    // build the SQL query
    const query = `
      INSERT INTO project_agencies
      ("project_id", "agency_id")
      VALUES
      ($1, $2);
    `;
    // parameterize the input
    const values = [req.params.project_id, req.params.agency_id];
    // run the query
    pool
      .query(query, values)
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error adding the agency to the project', err);
        res.sendStatus(500);
      });
  }
);

module.exports = router;
