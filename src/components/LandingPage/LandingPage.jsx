import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@mui/material";

// CUSTOM COMPONENTS
import LoginForm from "../LoginForm/LoginForm";

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

        <Typography variant="h5" sx={{ m: 2 }}>
          {" "}
          New to appsta?
          <Button
            sx={{ color: "primary.dark" }}
            onClick={() => {
              history.push("/BuyerOptions");
            }}
          >
            <Typography variant="h6">GET STARTED</Typography>
          </Button>
        </Typography>
        <br />
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            history.push("/AgencyLogin");
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Agency Login
          </Typography>
        </Button>
      </center>
    </div>
  );
}

export default LandingPage;
