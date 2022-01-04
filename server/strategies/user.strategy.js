const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // build a query
  // we need this instead of * to avoid id confusion - we're using aliases
  const queryText = `
    SELECT 
    "users".id as "id", "users".username, "users".password, "users".is_admin, 
    "buyers".id as "buyers_id", "buyers".company_name, "buyers".project_name, 
    "buyers".first_name, "buyers".last_name, "buyers".city, "buyers".postal_code as "buyers_postal_code",
    "agencies".agency_name, "agencies".agency_blurb, "agencies".postal_code as "agencies_postal_code",
    "agencies".city, "agencies".state_province, "agencies".country_code, "agencies".team_size, "agencies".minority_owned,
    "agencies".woman_owned, "agencies".veteran_owned, "agencies".lgbt_owned, "agencies".staffing_location, "agencies".contact_first_name, "agencies".contact_last_name, "agencies".logo_url, "agencies".id AS "agency_id"
    FROM "users" 
    LEFT JOIN "buyers" ON "buyers".user_id = "users".id 
    LEFT JOIN "agencies" ON "agencies".user_id = "users".id
    WHERE "users".id = $1;
`;
  pool
    .query(queryText, [id])
    .then((result) => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];

      if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        // done takes an error (null in this case) and a user
        // check if this is a buyer or an agency
        // we can determine this by checking whether there is agency_name is null
        if (user.agency_name === null) {
          // this is a buyer
          user.isBuyer = true;
        } else {
          // this is an agency
          user.isBuyer = false;
        }
        done(null, user);
      } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    })
    .catch((error) => {
      console.log('Error with query during deserializing user ', error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
});

// Does actual work of logging in
passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    pool
      .query('SELECT * FROM "users" WHERE username = $1', [username])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // All good! Passwords match!
          // done takes an error (null in this case) and a user
          done(null, user);
        } else {
          // Not good! Username and password do not match.
          // done takes an error (null in this case) and a user (also null in this case)
          // this will result in the server returning a 401 status code
          done(null, null);
        }
      })
      .catch((error) => {
        console.log('Error with query for user ', error);
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
      });
  })
);

module.exports = passport;
