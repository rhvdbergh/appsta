import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//adding MUI components
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

//added MUI styles for login form
const useStyles = makeStyles(() => ({
  form: {
    marginTop: '50px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '300px',
    width: '300px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    color: 'black',
  },
}));

// component acting as login form for LandingPage
// also on AgencyLogin screen - works for both
// but with some conditional rendering based on
// whether this is on AgencyLogin or not
function LoginForm({ isAgency }) {
  // set up local state to capture user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  // set up the redux dispatch
  const dispatch = useDispatch();

  //set up the MUI style
  const { form, input } = useStyles();

  // validates that all inputs are filled out
  // and sends login request to server
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <FormControl>
      <form className={form} onSubmit={login}>
        <Typography variant="h3">
          {isAgency && 'Agency '}
          Login
        </Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}

        <TextField
          label="username"
          type="email"
          name="username"
          required
          className={input}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <TextField
          label="password"
          type="password"
          name="password"
          required
          className={input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button type="submit" name="submit" value="Log In" variant="contained">
          <Typography variant="h6">Login</Typography>
        </Button>
      </form>
    </FormControl>
  );
}

export default LoginForm;
