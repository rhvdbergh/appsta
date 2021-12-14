const express = require('express');
const pool = require('../modules/pool');
const router = express.Router;
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Post a new agency to the DB

router.post('/new', (req, res) => {
    console.log('New agency POST request', req.body);
    const addAgencyQuery = `
        INSERT INTO agencies
        ("user_id", "agency_name", "agency_blurb", "postal_code", "city", "state_province", "country_code", "team_size", "minority_owned", "woman_owned", "veteran_owned", "onshore_only", "onshore_offshore_mix", "talent_off_lead_on", "contact_first_name", "contact_last_name", "logo_url")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING "id";`;
    const values = []
    
})