const express = require('express');
const pool = require('../modules/pool');
const router = express.Router;
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');

// Post a new agency to the DB

router.post('/new', (req, res) => {
    //add a user first then return the user id.  
    //use the user id in the NewAgencyId. 
    console.log('in router . post /new', req.body);
    const userName = req.body.userName;
    const password = encryptLib.encryptPassword(req.body.password);
    const addUserQuery = `
        INSERT INTO users
        ("username", "password")
        VALUES ($1, $2)
        RETURNING "id";
        `;





    const agency = req.body;
    const addAgencyQuery = `
        INSERT INTO agencies
        ("agency_name", "agency_blurb", 
        "postal_code","city", "state_province", 
        "country_code", "team_size", "minority_owned", 
        "woman_owned", "veteran_owned", "onshore_only", 
        "onshore_offshore_mix", "talent_off_lead_on", 
        "contact_first_name","contact_last_name", "logo_url")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING "id";
        `;
    const values = [
        agency.agency_name, agency.agency_blurb,
        agency.postal_code, agency.city, agency.state_province,
        agency.country_code, agency.team_size, agency.minority_owned,
        agency.woman_owned, agency.veteran_owned, agency.onshore_only,
        agency.onshore_offshore_mix, agency.talent_off_lead_on,
        agency.contact_first_name, agency.contact_last_name, agency.logo_url
    ];
    pool.query(addAgencyQuery, values)
        .then(result => {
            console.log('New Agency Id', result.rows[0].id);
            const newAgencyId = result.rows[0].id;
            res.send({ agency_id: newAgencyId });
        })
        .catch(err => {
            console.log('error starting new agency', err);
            res.sendStatus(500);
        })
})

module.exports = router;