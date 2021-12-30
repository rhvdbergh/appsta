import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div>

      <center>
        <h1>Buyer Login</h1>
          <LoginForm />
  
        <p> New to appsta?
          <Button onClick={() => {
            history.push('/BuyerOptions');
          }}>
            Get Started </Button> </p>
        <br />
        <Button
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
