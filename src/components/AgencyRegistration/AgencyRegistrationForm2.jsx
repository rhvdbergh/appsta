import { TextField, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function AgencyRegistrationForm2({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const agency = useSelector((store) => store.newAgency);

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

  // when any of the required fields change, check
  // to see if we can move forward
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

  // add data to the redux store
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
    <>
      <Stack>
        <TextField
          label="Agency Name*"
          value={agency_name}
          variant="outlined"
          onChange={(event) => setAgency_name(event.target.value)}
          onBlur={() => {
            handleData('agency_name', agency_name);
          }}
        />
        <TextField
          label="Tell us more about your company"
          multiline={true}
          rows={3}
          sx={{ width: 0.3, height: 100 }}
          value={agency_blurb}
          onChange={(event) => setAgency_blurb(event.target.value)}
          onBlur={() => {
            handleData('agency_blurb', agency_blurb);
          }}
          // value
        />
        <TextField
          label="Logo URL"
          variant="outlined"
          value={logo_url}
          onChange={(event) => setLogo_url(event.target.value)}
          onBlur={() => {
            handleData('logo_url', logo_url);
          }}
        />
        <TextField
          label="Contact First Name*"
          variant="outlined"
          value={contact_first_name}
          onChange={(event) => setContact_first_name(event.target.value)}
          onBlur={() => {
            handleData('contact_first_name', contact_first_name);
          }}
        />
        <TextField
          label="Contact Last Name*"
          variant="outlined"
          value={contact_last_name}
          onChange={(event) => setContact_last_name(event.target.value)}
          onBlur={() => {
            handleData('contact_last_name', contact_last_name);
          }}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          type="tel"
          value={phone_number}
          onChange={(event) => setPhone_number(event.target.value)}
          onBlur={() => {
            handleData('phone_number', phone_number);
          }}
        />
      </Stack>
    </>
  );
}

export default AgencyRegistrationForm2;
