import {
    TextField,
    InputLabel,
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
  } from '@mui/material';
  import Visibility from '@mui/icons-material/Visibility';
  import VisibilityOff from '@mui/icons-material/VisibilityOff';
  import Grid from '@mui/material/Grid';
  import { useEffect, useState } from 'react';
  import { useSelector } from 'react-redux';
  import { useDispatch } from 'react-redux';


  function BuyerRegistrationForm1({ setCanMoveForward }) {
    const dispatch = useDispatch();
  //Do we have a reducer / saga set up?
    const buyer = useSelector((store) => store.buyer);
  
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
      isCompletedForm();
    };
  
    console.log('this is agency', agency);
    return (
      <>
        <Grid>
          <TextField
            label="Email Address*"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onBlur={() => {
              handleData('username', username);
            }}
          />
          <FormControl variant="filled">
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
          <FormControl variant="filled">
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
        </Grid>
      </>
    );
  }
  
  export default BuyerRegistrationForm1;
  