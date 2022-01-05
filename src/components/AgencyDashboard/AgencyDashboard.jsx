import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

import {
  TextField,
  Stack,
  Radio,
  FormLabel,
  RadioGroup,
  Box,
  Button,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import OptionsList from '../OptionsList/OptionsList';
import AgencyConversionSettings from '../AgencyConversionSettings/AgencyConversionSettings';

function AgencyDashboard() {
  const user = useSelector((store) => store.user);

  const features = useSelector((store) => store.features);

  const dispatch = useDispatch();

  const [agency_name, setAgency_name] = useState(user.agency_name);
  const [agency_blurb, setAgency_blurb] = useState(user.agency_blurb);
  const [logo_url, setLogo_url] = useState(user.logo_url);
  const [contact_first_name, setContact_first_name] = useState(
    user.contact_first_name
  );
  const [contact_last_name, setContact_last_name] = useState(
    user.contact_last_name
  );
  const [phone_number, setPhone_number] = useState(user.phone_number);
  const [team_size, setTeam_size] = useState(user.team_size);
  const [minority_owned, setMinority_owned] = useState(user.minority_owned);
  const [woman_owned, setWoman_owned] = useState(user.woman_owned);
  const [veteran_owned, setVeteran_owned] = useState(user.veteran_owned);
  const [lgbt_owned, setLgbt_owned] = useState(user.lgbt_owned);
  const [city, setCity] = useState(user.city);
  const [state_province, setState_province] = useState(user.state_province);
  const [country_code, setCountry_code] = useState(user.country_code);
  const [postal_code, setPostal_code] = useState(user.agencies_postal_code);
  const [staffing_location, setStaffing_location] = useState(
    'Onshore Talent Only'
  );

  const agency = {
    agency_name,
    agency_blurb,
    logo_url,
    contact_first_name,
    contact_last_name,
    phone_number,
    team_size,
    minority_owned,
    woman_owned,
    veteran_owned,
    lgbt_owned,
    city,
    state_province,
    country_code,
    postal_code,
    staffing_location,
  };

  const handleUpdate = () => {
    const agencyID = user.agency_id;
    dispatch({
      type: 'UPDATE_AGENCY_INFORMATION',
      payload: { agency, agencyID },
    });
  };

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Navbar />
        <Box>
          <h1> AGENCY DASHBOARD </h1>
          <Button onClick={handleClickOpen('body')}>
            Update Account Details
          </Button>
          <AgencyConversionSettings />
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
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
                  <TextField
                    label="Logo URL"
                    variant="outlined"
                    value={user.logo_url}
                    onChange={(event) => setLogo_url(event.target.value)}
                  />
                  <TextField
                    label="Contact First Name*"
                    variant="outlined"
                    value={contact_first_name}
                    onChange={(event) =>
                      setContact_first_name(event.target.value)
                    }
                  />
                  <TextField
                    label="Contact Last Name*"
                    variant="outlined"
                    value={contact_last_name}
                    onChange={(event) =>
                      setContact_last_name(event.target.value)
                    }
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
                        onChange={(event) =>
                          setMinority_owned(event.target.checked)
                        }
                      />
                    </FormGroup>

                    <FormGroup row aria-label="lgbt-owned">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="LGBT Owned"
                        value={lgbt_owned}
                        checked={lgbt_owned}
                        onChange={(event) =>
                          setLgbt_owned(event.target.checked)
                        }
                      />
                    </FormGroup>

                    <FormGroup row aria-label="women-owned">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Women Owned"
                        value={woman_owned}
                        checked={woman_owned}
                        onChange={(event) =>
                          setWoman_owned(event.target.checked)
                        }
                      />
                    </FormGroup>

                    <FormGroup row aria-label="veteran-owned">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Veteran Owned"
                        checked={veteran_owned}
                        value={veteran_owned}
                        onChange={(event) =>
                          setVeteran_owned(event.target.checked)
                        }
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
                      onChange={(event) =>
                        setState_province(event.target.value)
                      }
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
                      onChange={(event) =>
                        setStaffing_location(event.target.value)
                      }
                    >
                      <FormControlLabel
                        value={'Onshore Talent Only'}
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
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
          <Box>
            <OptionsList features={features} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AgencyDashboard;
