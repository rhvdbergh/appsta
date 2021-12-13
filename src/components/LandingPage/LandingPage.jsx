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
    <div className="container">

      <center>
        <h1>Buyer Login</h1>
        <div className="grid-col grid-col_4">
          <LoginForm />
        </div>
      </center>
      <center>
      <p> New to appsta? </p>
      <Button onClick={() => {
        history.push('/BuyerOptions');
      }}> Get Started </Button>
      <br/>
        <Button
          variant="contained"
          onClick ={() => {
            history.push('/AgencyLogin');
          }}>
          Agency Login
          </Button>
      </center>
    </div>
  );
}

export default LandingPage;
