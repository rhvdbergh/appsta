const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
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

    pool.query(addUserQuery, [username, password])
        .then(result => {
            console.log('New agency user id', result.rows[0].id);
            const newAgencyUserId = result.rows[0].id;
            const agency = req.body;
            const addAgencyQuery = `
            INSERT INTO agencies
            ("user_id", "agency_name", "agency_blurb", 
            "postal_code","city", "state_province", 
            "country_code", "team_size", "minority_owned", 
            "woman_owned", "veteran_owned", "staffing_location", 
            "contact_first_name","contact_last_name", "logo_url")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING "id";
            `;
            const values = [
                newAgencyUserId, agency.agency_name, agency.agency_blurb,
                agency.postal_code, agency.city, agency.state_province,
                agency.country_code, agency.team_size, agency.minority_owned,
                agency.woman_owned, agency.veteran_owned, agency.staffing_location,
                agency.contact_first_name, agency.contact_last_name, agency.logo_url
            ];
            pool.query(addAgencyQuery, values)
                .then(result => {
                    res.sendStatus(201);
                })
                .catch(err => {
                    console.log('error adding new agency', err);
                    res.sendStatus(500);
                })
        })
        .catch(err => {
            console.log('error adding new agency user', err);
            res.sendStatus(500);
        })
})

module.exports = router;