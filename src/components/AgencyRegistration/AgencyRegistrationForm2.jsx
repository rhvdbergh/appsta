import { TextField, Grid, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

// this component displays on the AgencyRegistration main view
// setCanMoveForward requires validation to move to the next form
function AgencyRegistrationForm2({ setCanMoveForward }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the agency object from the redux store
  // this is the agency object that will be submitted to the database
  // each successive "step" on the AgencyRegistration page fills
  // out more details of this object
  const agency = useSelector((store) => store.newAgency);

  // define local state to capture user input
  const [agency_name, setAgency_name] = useState(null);
  const [agency_blurb, setAgency_blurb] = useState('');
  const [logo_url, setLogo_url] = useState(null);
  const [contact_first_name, setContact_first_name] = useState(null);
  const [contact_last_name, setContact_last_name] = useState(null);
  const [phone_number, setPhone_number] = useState(null);

  // on page load, set the local state to what has already been
  // entered in the agency object, if that was done previously
  useEffect(() => {
    setAgency_name(agency.agency_name);
    setAgency_blurb(agency.agency_blurb);
    setLogo_url(agency.logo_url);
    setContact_first_name(agency.contact_first_name);
    setContact_last_name(agency.contact_last_name);
    setPhone_number(agency.phone_number);
  }, []);

  // if the local state changes, the reducers have been updated
  // so run the validation to see if all the required fields
  // have been updated
  useEffect(() => {
    isCompletedForm();
  }, [agency_name, contact_first_name, contact_last_name]);

  // validate that all required fields in the form are filled out
  const isCompletedForm = () => {
    // these three fields are required; only move forward if they
    // have some content
    if (
      agency_name !== null &&
      agency_name !== '' &&
      contact_first_name !== null &&
      contact_first_name !== '' &&
      contact_last_name &&
      contact_last_name !== ''
    ) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

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
          label="Agency Name*"
          value={agency_name}
          variant="outlined"
          onChange={(event) => setAgency_name(event.target.value)}
          onBlur={() => {
            handleData('agency_name', agency_name);
          }}
        />
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="Phone Number"
          variant="outlined"
          type="tel"
          value={phone_number}
          onChange={(event) => setPhone_number(event.target.value)}
          onBlur={() => {
            handleData('phone_number', phone_number);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="Contact First Name*"
          variant="outlined"
          value={contact_first_name}
          onChange={(event) => setContact_first_name(event.target.value)}
          onBlur={() => {
            handleData('contact_first_name', contact_first_name);
          }}
        />
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="Contact Last Name*"
          variant="outlined"
          value={contact_last_name}
          onChange={(event) => setContact_last_name(event.target.value)}
          onBlur={() => {
            handleData('contact_last_name', contact_last_name);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Tell us more about your company"
          multiline={true}
          rows={3}
          sx={{ width: '60%', maxWidth: '350px', height: 90, m: 2 }}
          value={agency_blurb}
          onChange={(event) => setAgency_blurb(event.target.value)}
          onBlur={() => {
            handleData('agency_blurb', agency_blurb);
          }}
        />
        <TextField
          sx={{ width: '60%', maxWidth: '350px', m: 2 }}
          label="Logo URL"
          variant="outlined"
          value={logo_url}
          onChange={(event) => setLogo_url(event.target.value)}
          onBlur={() => {
            handleData('logo_url', logo_url);
          }}
        />
      </Box>
    </Grid>
  );
}

export default AgencyRegistrationForm2;
