import React, { useEffect, useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function AgencyOptionsSelectionBlock({ feature }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // get this feature from the redux store, if it exists
  // we filter through the features in the store with find,
  // which returns the feature (f) or undefined if no feature is saved
  const savedFeature = useSelector((store) =>
    store.agencyFeatures.find((f) => f.id === feature.id)
  );

  // local state for the t-shirtsize and confidence level
  const [tShirtSize, setTShirtSize] = useState(0);
  const [confidence, setConfidence] = useState(50);

  // on page load
  useEffect(() => {
    dispatch({ type: 'GET_AGENCY_FEATURES' });
  }, []);

  // when the savedFeature data refreshes
  useEffect(() => {
    // if this feature already had values previously, set
    // the state to those values
    savedFeature && setTShirtSize(savedFeature.t_shirt_size);
    savedFeature && setConfidence(savedFeature.confidence);
  }, [savedFeature]);

  // sets the t-shirt size
  const tShirtSizesMarks = [
    {
      value: 0,
      label: 'Not Offered',
    },
    {
      value: 20,
      label: 'XS',
    },
    {
      value: 40,
      label: 'S',
    },
    {
      value: 60,
      label: 'M',
    },
    {
      value: 80,
      label: 'L',
    },
    {
      value: 100,
      label: 'XL',
    },
  ];

  // sets the confidence level
  const confidenceMarks = [
    {
      value: 0,
      label: 'Less',
    },
    {
      value: 100,
      label: 'More',
    },
  ];

  const handleTShirtChange = (event) => {
    if (savedFeature) {
      // update the feature
      dispatch({
        type: 'UPDATE_AGENCY_FEATURE',
        payload: { ...savedFeature, t_shirt_size: event.target.value },
      });
    } else {
      // add this as a new feature that the agency offers
      dispatch({
        type: 'ADD_AGENCY_FEATURE',
        payload: {
          ...feature,
          t_shirt_size: event.target.value,
          confidence: confidence,
        },
      });
    }
    // display the right size, and update local state
    setTShirtSize(event.target.value);
  };

  const handleConfidenceChange = (event) => {
    if (savedFeature) {
      // update the feature
      dispatch({
        type: 'UPDATE_AGENCY_FEATURE',
        payload: { ...savedFeature, confidence: event.target.value },
      });
    } else {
      // add this as a new feature that the agency offers
      dispatch({
        type: 'ADD_AGENCY_FEATURE',
        payload: {
          ...feature,
          t_shirt_size: tShirtSize,
          confidence: event.target.value,
        },
      });
    }
    // display the right confidence level, and update local state
    setConfidence(event.target.value);
  };

  return (
    <>
      <Box sx={{ width: 300 }}>
        <Typography variant="body1">Time Estimate:</Typography>
        <Slider
          aria-label="T-shirt-size marks"
          defaultValue={tShirtSize}
          step={20}
          valueLabelDisplay="off"
          marks={tShirtSizesMarks}
          onChange={handleTShirtChange}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography variant="body1">Confidence:</Typography>
        <Slider
          aria-label="Confidence marks"
          defaultValue={50}
          disabled={tShirtSize === 0}
          step={5}
          valueLabelDisplay="off"
          marks={confidenceMarks}
          onChange={handleConfidenceChange}
        />
      </Box>
    </>
  );
}

export default AgencyOptionsSelectionBlock;
