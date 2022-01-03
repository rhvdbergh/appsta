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
      return 'XS';
    case 40:
      return 'S';
    case 60:
      return 'M';
    case 80:
      return 'L';
    case 100:
      return 'XL';
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
  // grab the user from the store
  const user = useSelector((store) => store.user);

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
    if (savedFeature && tShirtSize === 0) {
      // user has set slider to "not offered", remove this as a saved feature
      dispatch({ type: 'REMOVE_AGENCY_FEATURE', payload: savedFeature });
    } else {
      if (savedFeature) {
        // update the feature
        dispatch({
          type: 'UPDATE_AGENCY_FEATURE',
          payload: {
            ...savedFeature,
            t_shirt_size: convertNumberToSize(tShirtSize),
          },
        });
      } else {
        // add this as a new feature that the agency offers
        dispatch({
          type: 'ADD_AGENCY_FEATURE',
          payload: {
            feature: {
              ...feature,
              t_shirt_size: convertNumberToSize(tShirtSize),
              confidence: confidence,
            },
            agency_id: user.agency_id,
          },
        });
      } // end if savedFeature ... else
    } // end if savedFeature && val === 0
  };

  const handleConfidenceChange = (event) => {
    if (savedFeature) {
      // update the feature
      dispatch({
        type: 'UPDATE_AGENCY_FEATURE',
        payload: { ...savedFeature, confidence: confidence },
      });
    } else {
      // add this as a new feature that the agency offers
      dispatch({
        type: 'ADD_AGENCY_FEATURE',
        payload: {
          ...feature,
          t_shirt_size: convertNumberToSize(tShirtSize),
          confidence: confidence,
        },
      });
    }
  };

  return (
    <>
      <Box sx={{ width: 300, }}>
        <Typography variant="body1">Time Estimate:</Typography>
        <Slider 
          aria-label="T-shirt-size marks"
          value={tShirtSize}
          step={20}
          valueLabelDisplay="off"
          marks={tShirtSizesMarks}
          onChange={(event) => setTShirtSize(event.target.value)}
          onChangeCommitted={handleTShirtChange}
        />
        {/* above: onChange happens continuously, onChangeCommitted only once */}
        <p>tshirtsize {tShirtSize}</p>
      </Box>
      <Box sx={{ width: 300, }}>
        <Typography variant="body1">Confidence:</Typography>
        <Slider
          aria-label="Confidence marks"
          value={confidence}
          disabled={tShirtSize === 0}
          step={5}
          valueLabelDisplay="off"
          marks={confidenceMarks}
          onChange={(event) => setConfidence(event.target.value)}
          onChangeCommitted={handleConfidenceChange}
        />
        {/* above: onChange happens continuously, onChangeCommitted only once */}
      </Box>
    </>
  );
}

export default AgencyOptionsSelectionBlock;
