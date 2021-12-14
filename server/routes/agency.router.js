const express = require('express');
const pool = require('../modules/pool');
const router = express.Router;
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Post a new agency to the DB

router.post('/new', (req, res) => {
    console.log('New agency POST request', req.body);
    const agency = req.body.agency;
    const addAgencyQuery = `
        INSERT INTO agencies
        ("user_id", "agency_name", "agency_blurb", 
        "postal_code","city", "state_province", 
        "country_code", "team_size", "minority_owned", 
        "woman_owned", "veteran_owned", "onshore_only", 
        "onshore_offshore_mix", "talent_off_lead_on", 
        "contact_first_name","contact_last_name", "logo_url")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING "id";
        `;
    const values = [
        agency.user_id, agency.agency_name, agency.agency_blurb, 
        agency.postal_code, agency.city, agency.state_province, 
        agency.country_code, agency.team_size, agency.minority_owned,
        agency.woman_owned, agency.veteran_owned, agency.onshore_only, 
        agency.onshore_offshore_mix, agency.talent_off_lead_on, 
        agency.contact_first_name, agency.contact_last_name, agency.logo_url
    ]
    
})