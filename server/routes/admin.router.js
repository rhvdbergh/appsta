const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// posts a new feature to the db
// POST /api/admin/newFeature
router.post('/newFeature', rejectUnauthenticated, (req, res) => {
  //build a query
  const query = `
    INSERT INTO "features" (feature_name, feature_story, feature_description, category_id, image_url)
    VALUES ($1, $2, $3, $4, $5);
    `;
  const inf = req.body;

  // run the query
  pool
    .query(query, [
      inf.feature_name,
      inf.feature_story,
      inf.feature_description,
      inf.category_id,
      inf.image_url,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// deletes a specific feature from the database
// DELETE /api/admin/:id
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;

  // build a sql query
  const query = `
      DELETE FROM "features"
      WHERE id = $1;`;

  // run the query
  pool
    .query(query, [id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// edits a specific feature in the db
// PUT /api/edit/:id
router.put('/edit/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;

  // build a sql query
  const query = `
    UPDATE "features"
    SET feature_name = $1, feature_story = $2, feature_description = $3, category_id = $4, image_url = $5
    WHERE "id" = $6;`;

  // parameterize the input
  const values = [
    req.body.feature_name,
    req.body.feature_story,
    req.body.feature_description,
    req.body.category_id,
    req.body.image_url,
    id,
  ];

  // run the query
  pool
    .query(query, values)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error updating the admin feature', err);
      res.sendStatus(500);
    });
});

module.exports = router;
