import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import '../LandingPage/LandingPage.css';

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
        <div className="grid-col grid-col_4">
          <LoginForm />
        </div>
      </center>
      <center>
        <Button
          variant="contained">
          Not an Agency? Click Here
          </Button>
      </center>
    </div>
  );
}

export default AgencyLoginPage;