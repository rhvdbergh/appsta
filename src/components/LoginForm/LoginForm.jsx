import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//adding MUI components 
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

//added MUI styles for login form 
const useStyles = makeStyles(() => ({
  form: {
    marginTop: '100px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '400px',
    width: '300px',
    textAlign: 'center',
  },
  input: {
    margin: '20px',
    width: '100%',
  },
}));


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

//set up the MUI style
const { form, input} = useStyles();

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
        <Typography variant='h3'> Login </Typography>
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

            <Button type="submit" name="submit" value="Log In" variant='contained'>
              <Typography variant='h6'>Login</Typography>
              </Button>
       
      </form>
    </FormControl>
  );
}

export default LoginForm;
