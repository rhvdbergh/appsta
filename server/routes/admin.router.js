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
    console.log('this is the id from action payload(which is the feature) id', id)

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

module.exports = router;
