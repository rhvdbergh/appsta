import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
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
  Typography,
} from '@mui/material';

// import custom components
import Navbar from '../Navbar/Navbar';
import OptionsList from '../OptionsList/OptionsList';
import AgencyConversionSettings from '../AgencyConversionSettings/AgencyConversionSettings';

// this component is the main agency dashboard view
function AgencyDashboard() {
  // grab the user and features from the redux store
  const user = useSelector((store) => store.user);
  const features = useSelector((store) => store.features);

  // set up the redux dispatch
  const dispatch = useDispatch();

  // set up local state to capture agency information in the dialog modal
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

  // create the agency object
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

  // updates the db with newly captured agency information
  const handleUpdate = () => {
    // the logged in user's user object contains the agency's id
    const agencyID = user.agency_id;
    dispatch({
      type: 'UPDATE_AGENCY_INFORMATION',
      payload: { agency, agencyID },
    });
  };

  // local state to control the dialog modal
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  // handler to open the dialog modal
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  // handler to close the dialog modal
  const handleClose = () => {
    setOpen(false);
  };

  // handle the focus of the dialog
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // on page load, update the agency conversion settings
  // this helps prepopulate if the user opens AgencyConversionSettings
  useEffect(() => {
    dispatch({ type: 'GET_AGENCY_CONVERSION', payload: user.agency_id });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Navbar />
        <Box>
          <Typography sx={{ m: 4 }} variant="h4">
            {user.agency_name} Settings
          </Typography>
          <Button
            variant="contained"
            sx={{ mx: 4, my: 2, textSecondary: 'text.secondary' }}
            onClick={handleClickOpen('body')}
          >
            Update Account Information
          </Button>

          <AgencyConversionSettings user={user} />
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">
              Update Account Information
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <Stack>
                  <TextField
                    sx={{ my: 2 }}
                    label="Agency Name*"
                    value={agency_name}
                    variant="outlined"
                    onChange={(event) => setAgency_name(event.target.value)}
                  />
                  <TextField
                    sx={{ mb: 2 }}
                    label="Tell us more about your company"
                    multiline={true}
                    rows={3}
                    sx={{ width: 1.0, height: 100 }}
                    value={user.agency_blurb}
                    onChange={(event) => setAgency_blurb(event.target.value)}
                  />
                  <TextField
                    sx={{ my: 2 }}
                    label="Logo URL"
                    variant="outlined"
                    value={user.logo_url}
                    onChange={(event) => setLogo_url(event.target.value)}
                  />
                  <TextField
                    sx={{ mb: 2 }}
                    label="Contact First Name*"
                    variant="outlined"
                    value={contact_first_name}
                    onChange={(event) =>
                      setContact_first_name(event.target.value)
                    }
                  />
                  <TextField
                    sx={{ mb: 2 }}
                    label="Contact Last Name*"
                    variant="outlined"
                    value={contact_last_name}
                    onChange={(event) =>
                      setContact_last_name(event.target.value)
                    }
                  />
                  <TextField
                    sx={{ mb: 2 }}
                    label="Phone Number"
                    variant="outlined"
                    type="tel"
                    value={phone_number}
                    onChange={(event) => setPhone_number(event.target.value)}
                  />
                </Stack>
                <Stack>
                  <TextField
                    sx={{ mb: 2 }}
                    label="Team Size (0-9999)*"
                    type="number"
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
                      sx={{ m: 1 }}
                      label="City*"
                      value={city}
                      variant="outlined"
                      onChange={(event) => setCity(event.target.value)}
                    />
                    <TextField
                      sx={{ m: 1 }}
                      label="State/Province"
                      value={state_province}
                      variant="outlined"
                      onChange={(event) =>
                        setState_province(event.target.value)
                      }
                    />
                    <TextField
                      sx={{ m: 1 }}
                      label="Country Code"
                      value={country_code}
                      variant="outlined"
                      onChange={(event) => setCountry_code(event.target.value)}
                    />
                    <TextField
                      sx={{ m: 1 }}
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
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
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
