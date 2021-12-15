const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/',(req, res) => {
    const query = `
    SELECT * FROM "feature_categories";
    `;
    pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: GET categories', err);
      res.sendStatus(500)
    })
});

module.exports = router;