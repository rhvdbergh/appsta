import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';

function BuyerDashboard() {
  const user = useSelector((store) => store.user);

  console.log('this is the user', user);

  return (
    <>
    
      <h1> BUYER DASHBOARD </h1>
      <p>
        {' '}
        put some user data on this page to confirm that we are getting correct
        data..... placeholder{' '}
      </p>
      <p> will need to conditionally render some information for what the specific buyer has selected </p>
      <Navbar />
    </>
  );
}

export default BuyerDashboard;
