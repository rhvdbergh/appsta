import React from 'react';
import { useSelector } from 'react-redux';

function BuyerDashboard() {
  const user = useSelector((store) => store.user);

  console.log('this is the user', user);

  return (
    <>
      <div className="container">

        <h1> BUYER DASHBOARD </h1>
        <p>
          {' '}
          put some user data on this page to confirm that we are getting correct
          data..... placeholder{' '}
        </p>
      </div>
    </>
  );
}

export default BuyerDashboard;
