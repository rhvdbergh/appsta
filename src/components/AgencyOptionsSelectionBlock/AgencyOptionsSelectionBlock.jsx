import React, { useEffect, useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// helper object to convert tShirtSizes to numbers
const convertSizeToNumber = {
  XS: 20,
  S: 40,
  M: 60,
  L: 80,
  XL: 100,
};

// helper function to convert number to tShirtSize
const convertNumberToSize = (num) => {
  switch (num) {
    case 20:
      return XS;
    case 40:
      return S;
    case 60:
      return M;
    case 80:
      return L;
    case 100:
      return XL;
    default:
      return 0;
  }
};

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

function AgencyOptionsSelectionBlock({ feature }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // get this feature from the redux store, if it exists
  // we filter through the features in the store with find,
  // which returns the agency_feature (f) or undefined if no agency_feature is saved
  const savedFeature = useSelector((store) =>
    store.agencyFeatures.find((f) => f.feature_id === feature.id)
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
    savedFeature &&
      setTShirtSize(convertSizeToNumber[savedFeature.t_shirt_size]);
    savedFeature && setConfidence(savedFeature.confidence);
  }, [savedFeature]);

  const handleTShirtChange = (event) => {
    if (savedFeature) {
      // update the feature
      dispatch({
        type: 'UPDATE_AGENCY_FEATURE',
        payload: {
          ...savedFeature,
          t_shirt_size: convertNumberToSize(event.target.value),
        },
      });
    } else {
      // add this as a new feature that the agency offers
      dispatch({
        type: 'ADD_AGENCY_FEATURE',
        payload: {
          ...feature,
          t_shirt_size: convertNumberToSize(event.target.value),
          confidence: confidence,
        },
      });
    }
    // display the right size, and update local state
    setTShirtSize(event.target.value);
    console.log(event.target.label);
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
          t_shirt_size: convertNumberToSize(tShirtSize),
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
          value={tShirtSize}
          step={20}
          valueLabelDisplay="off"
          marks={tShirtSizesMarks}
          onChange={handleTShirtChange}
        />
        <p>tshirtsize {tShirtSize}</p>
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
