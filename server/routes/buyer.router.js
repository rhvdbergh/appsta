const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

router.post('/new', (req, res) => {
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
        // promise waiting-  like an async await 
        .then((result) => {
            console.log('New buyer user id', result.rows[0].id);
            const newBuyerUserId = result.rows[0].id;
            const buyer = req.body;
            const addBuyerQuery = `
            INSERT INTO "buyers"
            ("user_id", "company_name", "project_name", "first_name", "last_name", "city", "postal_code")
            VALUES ($1, $2, $3, $4, $5, $6, $7);
            RETURNING "id"
            `;
            const values = [
                newBuyerUserId,
                buyer.company_name,
                buyer.project_name,
                buyer.first_name,
                buyer.last_name,
                buyer.city,
                buyer.postal_code
            ];
            pool
                .query(addBuyerQuery, values)
                .then((result) => {
                    const newBuyerUserId = result.rows[0].id;
                    const addProjectQuery = `
                    INSERT INTO "projects"
                    ("buyer_id", CURRENT_DATE)
                    VALUES ($1, $2)`;
                    pool
                        .query(addProjectQuery, [newBuyerUserId])
                }).then((result) => {
                    res.sendStatus(201)
                }).catch((err) => {
                    res.sendStatus(500)
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

module.exports = router;