import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function AgencyLoginPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <center>
        <h1>Agency Login Page </h1>
       
          <LoginForm />

        <p> First time here?
          <Button 
            color="secondary"
            onClick={() => {
            history.push('/AgencyReg');
          }}>
             Register Now </Button> </p>
     
        <Button
          color='secondary'
          variant="contained"
          onClick= {() => {
              history.push('/LandingPage');
          }}>
          Not an Agency? Click Here
          </Button>
      </center>
    </div>
  );
}

export default AgencyLoginPage;