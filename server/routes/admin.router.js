const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/newFeature', (req, res) => {

    console.log(req.body);

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

router.delete('/:id', (req, res) => {
    const id = req.params.id
    console.log('delete action payload(which is the feature) id', id)

    const query = `
      DELETE FROM "features"
      WHERE id = $1;`;

    pool.query(query, [id])
        .then(result => {
            res.sendStatus(204)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
})

router.put('/edit/:id', (req, res) => {
    const id = req.params.id
    console.log('edit action payload(which is the feature) id', id)

    const query = `
    UPDATE "features"
    SET feature_name = $1, feature_story = $2, feature_description = $3, category_id = $4, image_url = $5
    WHERE "id" = $6;`;

    const values = [
        req.body.feature_name,
        req.body.feature_story,
        req.body.feature_description,
        req.body.category_id,
        req.body.image_url,
        id
      ];
      pool
    .query(query, values)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error updating the admin feature', err);
      res.sendStatus(500);
    });
})

module.exports = router;
