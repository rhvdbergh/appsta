import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

// import custom components
import OptionsList from '../OptionsList/OptionsList';
import Navbar from '../Navbar/Navbar';

function AgencyOptionsPage() {
  // set up the history hook to navigate
  const history = useHistory();

  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the features from the redux store
  const features = useSelector((store) => store.features);

  // navigates the agency to the agency dashboard
  const returnHome = () => {
    history.push('/AgencyDashboard');
  };

  // on page load, ensure that the latest
  // features are in the redux store
  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {/* the one button with its function is passed */}
        {/* to navbar as props */}
        <Navbar btn1text={'HOME'} fxn1={returnHome} />
        <Box>
          <Typography variant="h5" sx={{ m: 3 }}>
            Choose Which Services You Offer
          </Typography>
          <Typography variant="body1" sx={{ m: 3 }}>
            Click a category on the left to show a list of features for the
            category. Select the features your agency can offer by choosing a
            T-shirt size and your confidence level.
          </Typography>
          {/* if no listType is passed as a prop to OptionsList */}
          {/* OptionsList defaults to AgencyDashboard or AgencyOptionsPage */}
          <OptionsList features={features} />
          <Button sx={{ m: 3 }} variant="contained" onClick={returnHome}>
            Done Selecting? Move to Dashboard
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AgencyOptionsPage;
