import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// import custom components
import Navbar from '../Navbar/Navbar';
import BuyerQuotesList from '../BuyerQuotesList/BuyerQuotesList';

// this component is the buyer's home page
function BuyerDashboard() {
  // set up the history hook to navigate
  const history = useHistory();

  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the user from the redux store
  const user = useSelector((store) => store.user);

  // retrieve the list of agencies that can offer the buyer's selection of features
  // and the active project and its associated features
  const projectFeatures = useSelector((store) => store.projectFeatures);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const activeProject = useSelector((store) => store.activeProject);

  // local state for modal
  const [modalOpen, setModalOpen] = useState(false);

  // on page load, retrieve the latest project
  // associated with this user as buyer
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

  // moving to the review features page
  // we refresh the data to ensure correct data
  // shows up in the reducers on the next page
  const handleReviewFeatures = () => {
    dispatch({ type: 'REFRESH_DATA' });
    history.push('/BuyerReviewFeatures');
  };

  // this opens up the modal, from where
  // a user can start a new quote or cancel
  const handleStartNewQuote = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* This box above contains the navbar and the rest of the page */}
      {/* The rest of the page is contained in a Box */}
      {/* There should only be two children for this first Box */}

      {/* onBuyerDashboard is set to true and renders aspects on the Navbar */}
      {/* two buttons and associated functions are passed in */}
      <Navbar
        onBuyerDashboard={true}
        btn1text={'Review Features'}
        fxn1={handleReviewFeatures}
        btn2text={'Start New Quote'}
        fxn2={handleStartNewQuote}
      />
      <Box>
        <Typography sx={{ m: 4 }} variant="h4">
          Welcome, {user.first_name}
        </Typography>
        {/* This list populates the dashboard with QuoteCards */}
        {/* of agencies that can provide their saved project's features */}
        {quotingAgencies.length > 0 && projectFeatures.length > 0 && (
          <BuyerQuotesList
            projectFeatures={projectFeatures}
            quotingAgencies={quotingAgencies}
          />
        )}
      </Box>
      {/* The modal is a confirmation dialog that confirms with the */}
      {/* user whether they want to delete their previous project and */}
      {/* start again - canceling just closes the modal */}
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
            {/* If the user wants to start a new project, move to /BuyerOptions */}
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
