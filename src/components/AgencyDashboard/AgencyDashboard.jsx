import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { Box, Typography } from '@mui/material';

function AgencyDashboard() {
  const user = useSelector((store) => store.user);

  console.log('this is the user', user);

  return (
    <>
      <Box sx={{ display: 'flex',  }}>
        <Typography variant="h3">Welcome, {user.agency_name}</Typography>

        <Navbar />
      </Box>
    </>
  );
}

export default AgencyDashboard;
