const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.post('/new', (req, res) => {
  const username = req.body.buyer.username;
  const password = encryptLib.encryptPassword(req.body.buyer.password);
  const features = req.body.project_features;
  const addUserQuery = `
        INSERT INTO users
        ("username", "password", "is_admin")
        VALUES ($1, $2, 'false')
        RETURNING "id";
        `;
  pool
    .query(addUserQuery, [username, password])
    .then((result) => {
      console.log('New buyer user id', result.rows[0].id);
      const newBuyerUserId = result.rows[0].id;
      const buyer = req.body.buyer;
      const addBuyerQuery = `
            INSERT INTO "buyers"
            ("user_id", "company_name", "project_name", "first_name", "last_name", "city", "postal_code")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING "id";
            `;
      const values = [
        newBuyerUserId,
        buyer.company_name,
        buyer.project_name,
        buyer.first_name,
        buyer.last_name,
        buyer.city,
        buyer.postal_code,
      ];
      pool
        .query(addBuyerQuery, values)
        .then((result) => {
          const newBuyerUserId = result.rows[0].id;
          // uses a function to do further queries
          insertProject(newBuyerUserId, features, res);
        })
        .catch((err) => {
          console.log('error adding new buyer', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('error adding new buyer user', err);
      res.sendStatus(500);
    });
});

// route to create a new project
router.post('/newproject', rejectUnauthenticated, (req, res) => {
  insertProject(req.body.buyer_id, req.body.features, res);
});

// function to post a new project and the selected project features
// the parameters required are:
// buyerId: the id of the buyer with which this project will be associated
// the features associated with this project
// and the res, so we can send a res if the query is successful
// or there is a problem
function insertProject(buyerId, features, res) {
  const addProjectQuery = `
    INSERT INTO "projects"
    ("buyer_id", date_of_project)
    VALUES ($1, CURRENT_DATE)
    RETURNING "id";`;
  pool
    .query(addProjectQuery, [buyerId])
    .then((result) => {
      console.log('this is the project id', result.rows);
      const project_id = result.rows[0];
      let query = `
        INSERT INTO "project_features"
        ("project_id", "feature_id", "quantity")
        VALUES 
      `;
      const values = [project_id.id];
      let counter = 1;
      // build the query and value array except for last item
      for (let i = 0; i < features.length - 1; i++) {
        query += `($1, $${counter + 1}, $${counter + 2}),`;
        values.push(features[i].id, features[i].quantity);
        counter += 2;
      }
      // add last query line with semicolon
      query += `($1, $${counter + 1}, $${counter + 2});`;
      values.push(
        features[features.length - 1].id,
        features[features.length - 1].quantity
      );
      // now run the query
      pool
        .query(query, [...values])
        .then((response) => {
          res.status(201).send(project_id);
        })
        .catch((err) => {
          console.log('Error inserting project features', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('error adding project', err);
      res.sendStatus(500);
    });
}

module.exports = router;
