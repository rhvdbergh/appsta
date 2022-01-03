const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

// Post a new agency to the DB

router.post('/new', (req, res) => {
  //add a user first then return the user id.
  //use the user id in the NewAgencyId.
  console.log('in router . post /new', req.body);
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const addUserQuery = `
        INSERT INTO users
        ("username", "password", "is_admin")
        VALUES ($1, $2, 'false')
        RETURNING "id";
        `;

  pool
    .query(addUserQuery, [username, password])
    .then((result) => {
      console.log('New agency user id', result.rows[0].id);
      const newAgencyUserId = result.rows[0].id;
      const agency = req.body;
      const addAgencyQuery = `
            INSERT INTO agencies
            ("user_id", "agency_name", "agency_blurb", 
            "postal_code","city", "state_province", 
            "country_code", "team_size", "minority_owned", 
            "woman_owned", "veteran_owned", "staffing_location", 
            "contact_first_name","contact_last_name", "logo_url", "phone_number")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING "id";
            `;
      const values = [
        newAgencyUserId,
        agency.agency_name,
        agency.agency_blurb,
        agency.postal_code,
        agency.city,
        agency.state_province,
        agency.country_code,
        agency.team_size,
        agency.minority_owned,
        agency.woman_owned,
        agency.veteran_owned,
        agency.staffing_location,
        agency.contact_first_name,
        agency.contact_last_name,
        agency.logo_url,
        agency.phone_number,
      ];
      pool
        .query(addAgencyQuery, values)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('error adding new agency', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('error adding new agency user', err);
      res.sendStatus(500);
    });
});

//Agency Dashboard 2.4 

router.get('/:id', (req, res) => {
  const queryText = `
  SELECT * FROM "agencies"
  WHERE "id" = $1;
  `;
  pool.query(queryText)
  .then((response) => {
    res.send(response.rows);
  })
  .catch((err) => {
    console.log('error fetching agency by id', err);
    res.sendStatus(500);
  });
});

// get the features associated with an agency
// GET /api/agency/features
router.get('/features', rejectUnauthenticated, (req, res) => {
  // build the sql query
  const queryText = `
  SELECT "agency_features".id AS "agency_features_id", "agency_id", 
    "feature_id", "feature_notes", "t_shirt_size", "confidence" 
  FROM "agency_features" 
  JOIN "agencies" ON "agencies".id = "agency_features".agency_id
  JOIN "users" ON "users".id = "agencies".user_id
  WHERE "users".id = ${req.user.id};
  `;

  // run the query
  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('error fetching the agency features', err);
      res.sendStatus(500);
    });
});

// insert a single new agency_feature
// POST /api/agency/feature
router.post('/feature', rejectUnauthenticated, (req, res) => {
  // build the sql query
  const queryText = `
  INSERT INTO "agency_features" (agency_id, feature_id, t_shirt_size, confidence)
  VALUES ($1, $2, $3, $4);
  `;

  // parameterize the inputs
  const values = [
    req.body.agency_id,
    req.body.feature.id,
    req.body.feature.t_shirt_size,
    req.body.feature.confidence,
  ];

  // run the query
  pool
    .query(queryText, values)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error adding the agency feature', err);
      res.sendStatus(500);
    });
});

// updates an existing agency_feature
// PUT /api/agency/feature
router.put('/feature', rejectUnauthenticated, (req, res) => {
  // build the sql query
  const queryText = `
    UPDATE "agency_features"
    SET "t_shirt_size" = $1, confidence = $2
    WHERE "id" = $3;
  `;

  // parameterize the values
  const values = [
    req.body.t_shirt_size,
    req.body.confidence,
    req.body.agency_features_id,
  ];

  // run the query
  pool
    .query(queryText, values)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error updating the agency feature', err);
      res.sendStatus(500);
    });
});

// deletes a specific agency_feature from the db
// DELETE /api/agency/feature
router.delete(
  '/feature/:agency_features_id',
  rejectUnauthenticated,
  (req, res) => {
    console.log(`in DELETE /api/agency/feature, req.body:`, req.body);
    // build the sql query
    const queryText = `
    DELETE FROM "agency_features"
    WHERE "id" = $1;
  `;

    // run the query with a parameterized value
    pool
      .query(queryText, [req.params.agency_features_id])
      .then((response) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log('error deleting the agency feature', err);
        res.sendStatus(500);
      });
  }
);


module.exports = router;
