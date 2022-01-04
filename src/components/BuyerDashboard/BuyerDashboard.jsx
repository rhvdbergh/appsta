import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { Container, Typography } from '@mui/material';

function BuyerDashboard() {
  const user = useSelector((store) => store.user);

  console.log('this is the user', user);

  return (
    <Container>
      <Typography variant="h3">Welcome, {user.first_name}</Typography>

      <Navbar />
    </Container>
  );
}

export default BuyerDashboard;
