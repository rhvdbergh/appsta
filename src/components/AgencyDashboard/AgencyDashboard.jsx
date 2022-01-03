import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
function AgencyDashboard() {
  //initalize store and dispatch 

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();


  console.log('user.agency_id', user.agency_id);
  console.log('this is the user', user);

  return (
    <>
      <h1> AGENCY DASHBOARD </h1>
      <p>
        {' '}
        put some user data on this page to confirm that we are getting correct
        data..... placeholder{' '}
      </p> 
      <p> will need specific information for the agency.  </p>
      <Navbar />

    </>
  );
}

export default AgencyDashboard;
