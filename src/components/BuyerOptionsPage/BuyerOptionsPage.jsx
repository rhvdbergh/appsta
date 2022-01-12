import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

// import custom components
import OptionsList from '../OptionsList/OptionsList';
import Navbar from '../Navbar/Navbar';

// this component is the main view
// that allows a buyer to choose selected features
function BuyerOptionsPage() {
  // set up the useHistory hook to navigate
  const history = useHistory();

  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the features from the redux store
  const features = useSelector((store) => store.features);

  // clicked when the buyer is satisfied with their selection
  const submitQuote = () => {
    // build the selectedFeatures object to save in the redux store
    const selectedFeatures = [];
    features
      // filter through features and check if it is in localStorage
      .filter(
        (feature) => localStorage.getItem(`feature_${feature.id}`) !== null
      )
      // retrieve all those in localStorage and add them to selectedFeatures array
      // this includes the quantity
      // localStorage doesn't store objects, but just strings, so it
      // needs to be parsed
      .forEach((feature) =>
        selectedFeatures.push(
          JSON.parse(localStorage.getItem(`feature_${feature.id}`))
        )
      );
    // dispatch to save in the redux store
    dispatch({ type: 'SET_SELECTED_FEATURES', payload: selectedFeatures });
    // clear the selectedCategory reducer data
    dispatch({ type: 'REFRESH_SELECTED_CATEGORY_DATA' });
    // move the user to the review page
    history.push('/BuyerReview');
  };

  // on page load, make sure that the feature list is up to date
  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
    // clear out the reducers to ensure no old values are
    // used when creating a new project
    dispatch({ type: 'REFRESH_DATA' });
  }, []);

  return (
    <>
      <Box class="container">
        {/* This box contains the navbar and the rest of the page */}
        {/* The rest of the page is contained in a Box */}
        {/* There should only be two children for this first Box */}
        <Box sx={{ display: 'flex' }}>
          <Navbar btn1text={'SUBMIT QUOTE'} fxn1={submitQuote} />
          <Box>
            <Typography variant="h4" sx={{ my: 2, mx: 4 }}>
              Start Building your Project!
            </Typography>
            <Typography variant="h6" sx={{ my: 2, mx: 4 }}>
              Select the features to include in your project. Your estimate will
              be based on selected features.
            </Typography>
            {/* populate the list with feature options */}
            <OptionsList features={features} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BuyerOptionsPage;
