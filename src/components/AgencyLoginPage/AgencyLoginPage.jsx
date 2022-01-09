import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

// CUSTOM COMPONENTS
import LoginForm from "../LoginForm/LoginForm";

function AgencyLoginPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <Box className="container">
      <center>
        <LoginForm isAgency="true" />
        <Box>
          <Typography variant="h6"> First time agency?</Typography>
          <Button
            sx = {{ color: "primary.dark" }}
            onClick={() => {
              history.push("/AgencyReg");
            }}
          >
            <Typography variant="h6">REGISTER NOW</Typography>
          </Button>
        </Box>
        <Button
          color="secondary"
          variant="contained"
          sx={{ m: 3 }}
          onClick={() => {
            history.push("/LandingPage");
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>Not an Agency? Click Here</Typography>
        </Button>
      </center>
    </Box>
  );
}

export default AgencyLoginPage;
