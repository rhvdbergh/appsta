import {
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Grid,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

// this component displays on the AgencyRegistration main view
// setCanMoveForward requires validation to move to the next form
function AgencyRegistrationForm3({ setCanMoveForward }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the agency object from the redux store
  // this is the agency object that will be submitted to the database
  // each successive "step" on the AgencyRegistration page fills
  // out more details of this object
  const agency = useSelector((store) => store.newAgency);

  // define local state to capture user input
  const [city, setCity] = useState(null);
  const [state_province, setState_province] = useState(null);
  const [country_code, setCountry_code] = useState(null);
  const [postal_code, setPostal_code] = useState(null);
  const [staffing_location, setStaffing_location] = useState(
    'Onshore Talent Only'
  );

  // on page load, set the local state to what has been previously
  // entered in the agency object if the new agency user is returning
  useEffect(() => {
    setCity(agency.city);
    setState_province(agency.state_province);
    setCountry_code(agency.country_code);
    setPostal_code(agency.postal_code);
    setStaffing_location(agency.staffing_location);
  }, []);

  // when any required fields change, check to see if the user can proceed
  useEffect(() => {
    isCompletedForm();
  }, [city, state_province, country_code, postal_code, staffing_location]);

  // validate that required form fields are filled out
  const isCompletedForm = () => {
    // only move forward if the required fields of city and postal code have non-null, non-empty content
    if (
      city !== null &&
      city !== '' &&
      postal_code !== null &&
      postal_code !== '' &&
      staffing_location !== null &&
      staffing_location !== ''
    ) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

  // add data to the redux store
  // data expects a string with the property to set on the newAgency reducer
  const handleData = (data, value) => {
    // check to see that the data field is not empty
    if (data !== '') {
      dispatch({
        type: 'SET_NEW_AGENCY',
        payload: { ...agency, [data]: value },
      });
    }
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* onBlur captures the information as soon as the user moves */}
        {/* out of the field */}
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="City*"
          value={city}
          variant="outlined"
          onChange={(event) => setCity(event.target.value)}
          onBlur={() => {
            handleData('city', city);
          }}
        />
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="State/Province"
          value={state_province}
          variant="outlined"
          onChange={(event) => setState_province(event.target.value)}
          onBlur={() => {
            handleData('state_province', state_province);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="Country Code"
          value={country_code}
          variant="outlined"
          onChange={(event) => setCountry_code(event.target.value)}
          onBlur={() => {
            handleData('country_code', country_code);
          }}
        />
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="Zip/Postal Code*"
          value={postal_code}
          variant="outlined"
          onChange={(event) => setPostal_code(event.target.value)}
          onBlur={() => {
            handleData('postal_code', postal_code);
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '5vh' }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Staff Location*</FormLabel>
          <RadioGroup
            aria-label="staffing-location"
            name="radio-buttons-group"
            value={staffing_location}
            onChange={(event) => setStaffing_location(event.target.value)}
            onBlur={() => {
              handleData('staffing_location', staffing_location);
            }}
          >
            <FormControlLabel
              value="Onshore Talent Only"
              control={<Radio />}
              label="Onshore Talent Only"
            />
            <FormControlLabel
              value="Onshore and Offshore Talent"
              control={<Radio />}
              label="Onshore and Offshore Talent"
            />
            <FormControlLabel
              value="Offshore Talent, Onshore Leadership"
              control={<Radio />}
              label="Offshore Talent, Onshore Leadership"
            />
            <FormControlLabel
              value="All Staff Offshore"
              control={<Radio />}
              label="All Staff Offshore"
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ width: '60%', maxWidth: '350px' }}></Box>
      </Box>
    </Grid>
  );
}

export default AgencyRegistrationForm3;
