import {
  TextField,
  Grid,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

// this component displays on the AgencyRegistration main view
// setCanMoveForward requires validation to move to the next form
function AgencyRegistrationForm4({ setCanMoveForward }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the agency object from the redux store
  // this is the agency object that will be submitted to the database
  // each successive "step" on the AgencyRegistration page fills
  // out more details of this object
  const agency = useSelector((store) => store.newAgency);

  // define the state variables the component will be altering
  const [team_size, setTeam_size] = useState(null);
  const [minority_owned, setMinority_owned] = useState(null);
  const [woman_owned, setWoman_owned] = useState(null);
  const [veteran_owned, setVeteran_owned] = useState(null);
  const [lgbt_owned, setLgbt_owned] = useState(null);

  // on page load, set local state to what has already been entered
  // in the agency object, if anything
  useEffect(() => {
    setTeam_size(agency.team_size);
    setMinority_owned(agency.minority_owned);
    setWoman_owned(agency.woman_owned);
    setVeteran_owned(agency.veteran_owned);
    setLgbt_owned(agency.lgbt_owned);
  }, []);

  // when any required fields change, check to see if we can move forward
  useEffect(() => {
    isCompletedForm();
  }, [team_size, minority_owned, woman_owned, veteran_owned, lgbt_owned]);

  // validate that required fields in the form are filled out
  const isCompletedForm = () => {
    if (team_size !== null) {
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
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
          label="Team Size (0-9999)*"
          type="number"
          variant="outlined"
          value={team_size}
          onChange={(event) => setTeam_size(event.target.value)}
          onBlur={() => {
            handleData('team_size', team_size);
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl
          component="fieldset"
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
        >
          <FormGroup row aria-label="minority-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="Minority Owned"
              onChange={(event) => setMinority_owned(event.target.checked)}
              onBlur={() => {
                handleData('minority_owned', minority_owned);
              }}
            />
          </FormGroup>

          <FormGroup row aria-label="women-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="Women Owned"
              onChange={(event) => setWoman_owned(event.target.checked)}
              onBlur={() => {
                handleData('woman_owned', woman_owned);
              }}
            />
          </FormGroup>

          <FormGroup row aria-label="veteran-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="Veteran Owned"
              onChange={(event) => setVeteran_owned(event.target.checked)}
              onBlur={() => {
                handleData('veteran_owned', veteran_owned);
              }}
            />
          </FormGroup>

          <FormGroup row aria-label="lgbt-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="LGBT Owned"
              onChange={(event) => setLgbt_owned(event.target.checked)}
              onBlur={() => {
                handleData('lgbt_owned', lgbt_owned);
              }}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Grid>
  );
}

export default AgencyRegistrationForm4;
