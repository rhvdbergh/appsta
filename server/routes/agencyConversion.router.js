const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

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
    conv.hourly_rate
  ];
  pool
    .query(agencyConversionQuery, values)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error adding new agency conversion data', err);
      res.sendStatus(500);      
    });
});


module.exports = router;
