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
        <h2>Buyer Login</h2>
        <div className="grid-col grid-col_4">
          <LoginForm />
        </div>
      </center>
      <center>
        <Button
          variant="contained">
          Agency Login
          </Button>
      </center>
    </div>
  );
}

export default LandingPage;
