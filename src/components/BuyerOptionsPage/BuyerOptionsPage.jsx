import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList from '../OptionsList/OptionsList';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';

function BuyerOptionsPage() {
  const selectedCategory = useSelector((store) => store.selectedCategory);

  const history = useHistory();
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
      .forEach((feature) =>
        selectedFeatures.push(
          JSON.parse(localStorage.getItem(`feature_${feature.id}`))
        )
      );
    // dispatch to save in the redux store
    dispatch({ type: 'SET_SELECTED_FEATURES', payload: selectedFeatures });
    console.log('Quote Submitted', selectedFeatures);
    history.push('/BuyerReview');
  };

  const dispatch = useDispatch();
  const features = useSelector((store) => store.features);

  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
    dispatch({ type: 'REFRESH_QUOTING_AGENCIES_DATA' });
    dispatch({ type: 'REFRESH_AGENCY_QUOTE_DATA' });
    dispatch({ type: 'REFRESH_PROJECT_AGENCIES_DATA' });
    dispatch({ type: 'REFRESH_PROJECT_FEATURES_DATA' });
  }, []);

  return (
    <>
      <div class="container">
        <Box sx={{ display: 'flex' }}>
          <Navbar btn1text={'SUBMIT QUOTE'} fxn1={submitQuote} />
          <Box>
            <h1> Start Building your Project! </h1>
            <p>
              {' '}
              Select the features to include in your project. Your estimate will
              be based on selected features.{' '}
            </p>
            <OptionsList features={features} />
            <p> Selected Category ID is: {selectedCategory}</p>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default BuyerOptionsPage;
