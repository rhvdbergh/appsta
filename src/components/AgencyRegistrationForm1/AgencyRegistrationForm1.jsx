import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
function AgencyRegistrationForm1({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const agency = useSelector((store) => store.newAgency);

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    setUsername(agency.username);
    setPassword(agency.password);
    setPasswordConfirmation(agency.password);
    isCompletedForm();
  }, []);

  // check to see if everything is filled out and
  // the user can move forward
  const isCompletedForm = () => {
    if (agency.password && agency.username) {
      setCanMoveForward(true);
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
          label="User Name*"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onBlur={() => {
            handleData('username', username);
          }}
        />
        <TextField
          label="Password*"
          type="password"
          variant="outlined"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => {
            handleData('password', password);
          }}
        />
        <TextField
          label="Re-enter Password*"
          variant="outlined"
          type="password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          onBlur={() => {
            handleData('passwordConfirmation', passwordConfirmation);
          }}
        />
      </Grid>
    </>
  );
}

export default AgencyRegistrationForm1;
