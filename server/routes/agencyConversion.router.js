const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// retrieve agency conversion data for a given agency ID
// GET /api/conversion/:agencyID
router.get('/:agencyID', rejectUnauthenticated, (req, res) => {
  // build SQL query, using agency_id from the user object
  const conversionSearchQuery = `
  SELECT * FROM agency_conversion
  WHERE agency_id = $1; 
  `;
  // run the query
  pool
    .query(conversionSearchQuery, [req.params.agencyID])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((err) => {
      console.log('error fetching conversion data', err);
      res.sendStatus(500);
    });
});

// update agency conversion information into the agency_conversion table
// PUT /api/conversion/:agencyID
router.put('/:agencyID', rejectUnauthenticated, (req, res) => {
  // define the data we'll insert into the DB
  const id = req.params.agencyID;
  const conv = req.body;

  // build SQL query
  const agencyConversionQuery = `
  UPDATE "agency_conversion"
  SET xsmall_hours = $2, small_hours = $3,
  medium_hours = $4, large_hours = $5,
  xlarge_hours = $6, hourly_rate = $7
  WHERE agency_id = $1;
  `;
  // parameterize the values
  const values = [
    id,
    conv.xsmall_hours,
    conv.small_hours,
    conv.medium_hours,
    conv.large_hours,
    conv.xlarge_hours,
    conv.hourly_rate,
  ];
  // run the query
  pool
    .query(agencyConversionQuery, values)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error adding new agency conversion data', err);
      res.sendStatus(500);
    });
});

module.exports = router;
