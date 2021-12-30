const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

// Retrieve a list of agency ID's that provide all of the selected
// features

router.get('/findagencies', (req, res) => {
  // define SQL query text
  const queryText = `
  SELECT af.agency_id, agencies.*, array_agg (af.feature_id) FROM agency_features af
  JOIN agencies ON af.agency_id = agencies.id
  GROUP BY af.agency_id, agencies.id
  HAVING array_agg(af.feature_id) @> ($1::INTEGER[]);
  `;
  // define the array of selected features from req.body
  const values = [req.body.selected_features];
  console.log('Selected features are: ', req.body.selected_features);

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
// given the agency ID and the selected feature ID's

router.get('/agencyquote', (req, res) => {
  // define SQL query text
  const queryText = `
  SELECT af.*, ac.*, features.category_id FROM agency_features af
  JOIN agencies a ON af.agency_id = agencies.id
  JOIN agency_conversion ac ON af.agency_id = ac.agency_id
  JOIN features ON af.feature_id = features.id
  WHERE af.feature_id = ANY ($1) AND agencies.id = $2;
  `;
  // define the values to be passed into the query
  const values = [req.body.selected_features, req.body.agency_id];
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

module.exports = router;
