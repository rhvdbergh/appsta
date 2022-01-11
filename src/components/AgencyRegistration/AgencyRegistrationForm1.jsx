import {
  TextField,
  InputLabel,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
  Box,
  Grid,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// this component displays on the AgencyRegistration main view
// setCanMoveForward requires validation to move to the next form
function AgencyRegistrationForm1({ setCanMoveForward }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the agency object from the redux store
  // this is the agency object that will be submitted to the database
  // each successive "step" on the AgencyRegistration page fills
  // out more details of this object
  const agency = useSelector((store) => store.newAgency);

  // define local state to capture user input
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  // on page load, set the local state to the entries coming
  // from the reducer
  // should the user step back, the entries in the reducer
  // repopulates with what the user entered previously
  useEffect(() => {
    setUsername(agency.username);
    setPassword(agency.password);
    setPasswordConfirmation(agency.password);
  }, []);

  // if the local state changes, the reducers have been updated
  // so run the validation to see if all the required fields
  // have been updated
  useEffect(() => {
    isCompletedForm();
  }, [username, password, passwordConfirmation]);

  // check to see if everything is filled out and
  // the user can move forward
  const isCompletedForm = () => {
    if (
      username !== null &&
      username !== '' &&
      password !== null &&
      password !== '' &&
      passwordConfirmation !== null &&
      password === passwordConfirmation
    ) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

  // data expects a string with the property to set on the newAgency reducer
  const handleData = (data, value) => {
    // validate the user password
    // both password fields should have the same content and not be empty
    if (data === 'password' || data === 'passwordConfirmation') {
      if (password === passwordConfirmation && password !== '') {
        dispatch({
          type: 'SET_NEW_AGENCY',
          payload: { ...agency, password: value },
        });
      } // end if check equal passwords
    } // end if data === password
    else if (data !== '') {
      // check to see that the data field is not empty
      dispatch({
        type: 'SET_NEW_AGENCY',
        payload: { ...agency, [data]: value },
      });
    }
    // check if the user can move forward
    isCompletedForm();
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
        <TextField
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
          label="Email Address*"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onBlur={() => {
            handleData('username', username);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl
          variant="filled"
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
        >
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="filled-adornment-password"
            type={passwordShown ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => {
              handleData('password', password);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordShown(!passwordShown)}
                  edge="end"
                >
                  {passwordShown ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl
          variant="filled"
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
        >
          <InputLabel htmlFor="filled-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="filled-adornment-password"
            type={passwordConfirmationShown ? 'text' : 'password'}
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            onBlur={() => {
              handleData('passwordConfirmation', passwordConfirmation);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setPasswordConfirmationShown(!passwordConfirmationShown)
                  }
                  edge="end"
                >
                  {passwordConfirmationShown ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </Grid>
  );
}

export default AgencyRegistrationForm1;
