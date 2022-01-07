import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  //not used on this page..... used on LOGIN FORM 
  // const onLogin = (event) => {
  //   history.push('/login');
  // };

  return (
    <div>
      <center>
        
          <LoginForm />
  
        <p> New to appsta?
          <Button 
            color='secondary'
            onClick={() => {
            history.push('/BuyerOptions');
          }}>
            Get Started </Button> </p>
        <br />
        <Button
          color='secondary'
          variant="contained"
          onClick={() => {
            history.push('/AgencyLogin');
          }}>
          Agency Login
        </Button>
      </center>
    </div>
  );
}

export default LandingPage;
