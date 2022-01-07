import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { Box, Typography } from '@mui/material';
import BuyerQuotesList from '../BuyerQuotesList/BuyerQuotesList';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function BuyerDashboard() {
  // set up the history hook to navigate
  const history = useHistory();

  // set up the dispatch
  const dispatch = useDispatch();

  // retrieve the user from the redux store
  const user = useSelector((store) => store.user);

  // retrieve the list of agencies that can offer the buyer's selection of features
  const projectFeatures = useSelector((store) => store.projectFeatures);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const activeProject = useSelector((store) => store.activeProject);

  // // local state
  // const [agenciesState, setAgenciesState] = useState([]);

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

  const handleReviewFeatures = () => {
    history.push('/BuyerReviewFeatures');
  };

  const handleStartNewQuote = () => {
    // TODO:
    if (
      confirm(
        'Do you want to start a new project? This will delete your previous project and quotes.'
      )
    ) {
      history.push('/BuyerOptions');
    } else {
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar
        onBuyerDashboard={true}
        headerText={`Account: ${user.company_name ? user.company_name : ''}`}
        btn1text={'Review Features'}
        fxn1={handleReviewFeatures}
        btn2text={'Start New Quote'}
        fxn2={handleStartNewQuote}
      />
      <Box>
        <Typography variant="h3">Welcome, {user.first_name}</Typography>
        {quotingAgencies.length > 0 && projectFeatures.length > 0 && (
          <BuyerQuotesList
            projectFeatures={projectFeatures}
            quotingAgencies={quotingAgencies}
          />
        )}
      </Box>
    </Box>
  );
}

export default BuyerDashboard;
