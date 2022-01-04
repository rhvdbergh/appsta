import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { TextField, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function AgencyDashboard() {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [agency_name, setAgency_name] = useState(user.agency_name);
  const [agency_blurb, setAgency_blurb] = useState(user.agency_blurb);
  const [logo_url, setLogo_url] = useState(user.logo_url);
  const [contact_first_name, setContact_first_name] = useState(user.contact_first_name);
  const [contact_last_name, setContact_last_name] = useState(user.contact_last_name);
  const [phone_number, setPhone_number] = useState(user.phone_number);
  const [team_size, setTeam_size] = useState(user.team_size);
  const [minority_owned, setMinority_owned] = useState(user.minority_owned);
  const [woman_owned, setWoman_owned] = useState(user.woman_owned);
  const [veteran_owned, setVeteran_owned] = useState(user.veteran_owned);

  const agency = {
    agency_name: agency_name,
    agency_blurb: agency_blurb,
    contact_first_name: contact_first_name,
    contact_last_name: contact_last_name,
    phone_number: phone_number,
    team_size: team_size,
    minority_owned: minority_owned,
    women_owned: woman_owned,
    veteran_owned: veteran_owned
  }

  const handleUpdate = () => {
    const agencyID = user.agency_id
    dispatch({ type: 'UPDATE_AGENCY_INFORMATION', payload: { agency, agencyID } })
  }

  return (
    <>
      <h1> AGENCY DASHBOARD </h1>
      <p>
        {' '}
        put some user data on this page to confirm that we are getting correct
        data..... placeholder{' '}
      </p>
      <p> will need specific information for the agency.  </p>
      {/* <Navbar /> */}

      <div>
        <Stack>
          <TextField
            label="Agency Name*"
            value={user.agency_name}
            variant="outlined"
            onChange={(event) => setAgency_name(event.target.value)}
          />
          <TextField
            label="Tell us more about your company"
            multiline={true}
            rows={3}
            sx={{ width: 0.3, height: 100 }}
            value={user.agency_blurb}
            onChange={(event) => setAgency_blurb(event.target.value)}
          />
          <TextField label="Logo URL" variant="outlined"
            value={user.logo_url}
          />
          <TextField
            label="Contact First Name*"
            variant="outlined"
            value={user.contact_first_name}
            onChange={(event) => setContact_first_name(event.target.value)}
          />
          <TextField
            label="Contact Last Name*"
            variant="outlined"
            value={user.contact_last_name}
            onChange={(event) => setContact_last_name(event.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            type="tel"
            value={user.phone_number}
            onChange={(event) => setPhone_number(event.target.value)}
          />
        </Stack>
        <Stack>
          <TextField
            label="Team Size (0-9999)*"
            variant="outlined"
            value={user.team_size}
            onChange={(event) => setTeam_size(event.target.value)}
          />

          <FormControl component="fieldset">
            <FormGroup row aria-label="minority-owned">
              <FormControlLabel
                control={<Checkbox />}
                label="Minority Owned"
                value={user.minority_owned}
                checked={user.minority_owned}
                onChange={(event) => setMinority_owned(event.target.checked)}
              />
            </FormGroup>

            <FormGroup row aria-label="women-owned">
              <FormControlLabel
                control={<Checkbox />}
                label="Women Owned"
                value={user.women_owned}
                checked={user.women_owned}
                onChange={(event) => setWoman_owned(event.target.checked)}
              />
            </FormGroup>

            <FormGroup row aria-label="veteran-owned">
              <FormControlLabel
                control={<Checkbox />}
                label="Veteran Owned"
                checked={user.veteran_owned}
                value={user.veteran_owned}
                onChange={(event) => setVeteran_owned(event.target.checked)}
              />
            </FormGroup>
          </FormControl>
        </Stack>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </>
  );
}

export default AgencyDashboard;
