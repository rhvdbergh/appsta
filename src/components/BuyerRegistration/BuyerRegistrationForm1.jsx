//import from MUI
import {
  TextField,
  InputLabel,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';

//import from react
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function BuyerRegistrationForm1({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const buyer = useSelector((store) => store.newBuyer);

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  useEffect(() => {
    setUsername(buyer.username);
    setPassword(buyer.password);
    setPasswordConfirmation(buyer.password);
    // isCompletedForm();
  }, []);

  useEffect(() => {
    isCompletedForm();
  }, [username, password, passwordConfirmation]);

  // check to see if everything is filled out and
  // the user can move forward
  // black list
  const isCompletedForm = () => {
    if (
      username !== null &&
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

  const handleData = (data, value) => {
    // validate the user password
    // both password fields should have the same content and not be empty
    if (data === 'password' || data === 'passwordConfirmation') {
      if (password === passwordConfirmation && password !== '') {
        dispatch({
          type: 'SET_NEW_BUYER',
          payload: { ...buyer, password: value },
        });
      } // end if check equal passwords
    } // end if data === password
    else if (data !== '') {
      // check to see that the data field is not empty
      dispatch({
        type: 'SET_NEW_BUYER',
        payload: { ...buyer, [data]: value },
      });
    }
    isCompletedForm();
  };

  console.log('this is buyer', buyer);
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: '60%', maxWidth: '350px', my: 1.5 }}
          label="Email*"
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
          sx={{ width: '60%', maxWidth: '350px', my: 1.5 }}
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
          sx={{ width: '60%', maxWidth: '350px', my: 1.5 }}
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

export default BuyerRegistrationForm1;
