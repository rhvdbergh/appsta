import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { TextField, Stack, Radio, FormLabel, RadioGroup } from '@mui/material';
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
  const [city, setCity] = useState(user.city);
  const [state_province, setState_province] = useState(user.state_province);
  const [country_code, setCountry_code] = useState(user.country_code);
  const [postal_code, setPostal_code] = useState(user.agencies_postal_code);
  const [staffing_location, setStaffing_location] = useState('Onshore Talent Only');

  const agency = {
    agency_name: agency_name,
    agency_blurb: agency_blurb,
    logo_url: logo_url,
    contact_first_name: contact_first_name,
    contact_last_name: contact_last_name,
    phone_number: phone_number,
    team_size: team_size,
    minority_owned: minority_owned,
    woman_owned: woman_owned,
    veteran_owned: veteran_owned,
    city: city,
    state_province: state_province,
    country_code: country_code,
    postal_code: postal_code,
    staffing_location: staffing_location
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
            value={agency_name}
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
            onChange={(event) => setLogo_url(event.target.value)}
          />
          <TextField
            label="Contact First Name*"
            variant="outlined"
            value={contact_first_name}
            onChange={(event) => setContact_first_name(event.target.value)}
          />
          <TextField
            label="Contact Last Name*"
            variant="outlined"
            value={contact_last_name}
            onChange={(event) => setContact_last_name(event.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            type="tel"
            value={phone_number}
            onChange={(event) => setPhone_number(event.target.value)}
          />
        </Stack>
        <Stack>
          <TextField
            label="Team Size (0-9999)*"
            variant="outlined"
            value={team_size}
            onChange={(event) => setTeam_size(event.target.value)}
          />

          <FormControl component="fieldset">
            <FormGroup row aria-label="minority-owned">
              <FormControlLabel
                control={<Checkbox />}
                label="Minority Owned"
                value={minority_owned}
                checked={minority_owned}
                onChange={(event) => setMinority_owned(event.target.checked)}
              />
            </FormGroup>

            <FormGroup row aria-label="women-owned">
              <FormControlLabel
                control={<Checkbox />}
                label="Women Owned"
                value={woman_owned}
                checked={woman_owned}
                onChange={(event) => setWoman_owned(event.target.checked)}
              />
            </FormGroup>

            <FormGroup row aria-label="veteran-owned">
              <FormControlLabel
                control={<Checkbox />}
                label="Veteran Owned"
                checked={veteran_owned}
                value={veteran_owned}
                onChange={(event) => setVeteran_owned(event.target.checked)}
              />
            </FormGroup>
          </FormControl>
          <Grid>
            <TextField
              label="City*"
              value={city}
              variant="outlined"
              onChange={(event) => setCity(event.target.value)}
              
            />
            <TextField
              label="State/Province"
              value={state_province}
              variant="outlined"
              onChange={(event) => setState_province(event.target.value)}
             />
            <TextField
              label="Country Code"
              value={country_code}
              variant="outlined"
              onChange={(event) => setCountry_code(event.target.value)}   
            />
            <TextField
              label="Zip/Postal Code*"
              value={postal_code}
              variant="outlined"
              onChange={(event) => setPostal_code(event.target.value)}  
            />
          </Grid>
          <FormControl component="fieldset">
            <FormLabel component="legend">Staff Location*</FormLabel>
            <RadioGroup
              aria-label="staffing-location"
              name="radio-buttons-group"
              value={staffing_location}
              onChange={(event) => setStaffing_location(event.target.value)}
            >
              <FormControlLabel value={"Onshore Talent Only"} control={<Radio />} label="Onshore Talent Only" />
              <FormControlLabel value="Onshore and Offshore Talent" control={<Radio />} label="Onshore and Offshore Talent" />
              <FormControlLabel value="Offshore Talent, Onshore Leadership" control={<Radio />} label="Offshore Talent, Onshore Leadership" />
              <FormControlLabel value="All Staff Offshore" control={<Radio />} label="All Staff Offshore" />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </>
  );
}

export default AgencyDashboard;
