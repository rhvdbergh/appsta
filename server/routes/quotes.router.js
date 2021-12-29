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

module.exports = router;