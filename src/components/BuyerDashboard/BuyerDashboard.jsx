import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Modal,
} from '@mui/material';
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

  // local state for modal
  const [modalOpen, setModalOpen] = useState(false);

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
    dispatch({ type: 'REFRESH_DATA' });
    history.push('/BuyerReviewFeatures');
  };

  const handleStartNewQuote = () => {
    setModalOpen(!modalOpen);
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            p: 2,
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6">
              Do you want to start a new project?
            </Typography>
            <Typography variant="h6">
              This will delete your previous project and quotes.
            </Typography>
          </CardContent>
          <CardContent
            sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}
          >
            <Button
              sx={{ mr: '30px' }}
              variant="contained"
              color="error"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => history.push('/BuyerOptions')}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
}

export default BuyerDashboard;
