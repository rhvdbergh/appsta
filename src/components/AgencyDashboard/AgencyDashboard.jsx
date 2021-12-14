import React from 'react';
import { useSelector } from 'react-redux';

function AgencyDashboard() {
  const user = useSelector((store) => store.user);

  console.log('this is the user', user);

  return (
    <>
      <h1> AGENCY DASHBOARD </h1>
      <p>
        {' '}
        put some user data on this page to confirm that we are getting correct
        data..... placeholder{' '}
      </p>
    </>
  );
}

export default AgencyDashboard;
