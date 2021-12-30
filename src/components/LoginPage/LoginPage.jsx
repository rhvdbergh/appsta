import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

//import from MUI 
import { Box } from "@mui/material"; 
import { makeStyles } from '@mui/styles';

// set up the mui styles
const useStyles = makeStyles(() => ({
  registrationBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function LoginPage() {
  const history = useHistory();

const { registrationBox } = useStyles();

  return (
    <Box className={registrationBox}>
      <LoginForm />

     
        {/* <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button> */}
      
    </Box>
  );
}

export default LoginPage;
