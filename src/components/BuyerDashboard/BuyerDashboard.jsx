import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { Container, Typography } from '@mui/material';
import BuyerQuotesList from '../BuyerQuotesList/BuyerQuotesList';
import { useEffect } from 'react';

function BuyerDashboard() {
  // set up the dispatch
  const dispatch = useDispatch();

  // retrieve the user from the redux store
  const user = useSelector((store) => store.user);

  // retrieve the list of agencies that can offer the buyer's selection of features
  const projectFeatures = useSelector((store) => store.projectFeatures);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const activeProject = useSelector((store) => store.activeProject);

  // on page load, retrieve the latest project associated with this user as buyer
  // and save as the activeProject
  useEffect(() => {
    dispatch({ type: 'GET_LATEST_PROJECT', payload: user.buyers_id });
  }, []);

  // when we have the latest project id in activeProject
  // we should get the features associated with this project
  // we should get the list of agency ids that is saved with this project
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_FEATURES', payload: activeProject });
    dispatch({ type: 'GET_SAVED_QUOTING_AGENCIES', payload: activeProject });
  }, [activeProject]);

  return (
    <Container>
      <Typography variant="h3">Welcome, {user.first_name}</Typography>
      <BuyerQuotesList
        projectFeatures={projectFeatures}
        quotingAgencies={quotingAgencies}
      />
      <Navbar />
    </Container>
  );
}

export default BuyerDashboard;
