import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList from '../OptionsList/OptionsList';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';

function BuyerOptionsPage() {
  const selectedCategory = useSelector((store) => store.selectedCategory);

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
    console.log('Quote Submitted', selectedFeatures);
  };

  const dispatch = useDispatch();
  const features = useSelector((store) => store.features);

  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
  }, []);

  return (
    <>
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
    </>
  );
}

export default BuyerOptionsPage;
