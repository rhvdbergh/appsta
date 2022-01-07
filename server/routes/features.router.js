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

// route for GET /api/features/:project_id
// returns a list of all the project features in the db
// associated with this project id
router.get('/:project_id', (req, res) => {
  // build a sql query
  const queryText = `
    SELECT * FROM project_features
    JOIN projects ON projects.id = project_features.project_id
    JOIN features ON project_features.feature_id = features.id
    WHERE projects.id = $1; 
  `;

  // parameterize the user input
  const values = [req.params.project_id];

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


router.post('/newFeature', (req, res) => {
  //build a query 
  const query = `
  INSERT INTO "features" (feature_name, feature_story, feature_description, category_id, image_url)
  VALUES ($1, $2, $3, $4, $5);
  `;
  const inf = req.body;

  pool.query(query, [inf.feature_name, inf.feature_story, inf.feature_description, inf.category_id, inf.image_url])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
