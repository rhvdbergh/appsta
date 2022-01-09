import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function AgencyLoginPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Box className="container">
      <center>
        <LoginForm isAgency="true" />
        <Box>
          <Typography
          variant="body"
        > First time here?
        </Typography>
          <Button 
            color="secondary"
            onClick={() => {
            history.push('/AgencyReg');
          }}>
             Register Now </Button>
        </Box>
        <Button
          color='secondary'
          variant="contained"
          onClick= {() => {
              history.push('/LandingPage');
          }}>
          Not an Agency? Click Here
          </Button>


        
        
      </center>
    </Box>
  );
}

export default AgencyLoginPage;