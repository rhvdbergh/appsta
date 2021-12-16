import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

function AgencyOptionsSelectionBlock({ feature }) {
  // local state for the t-shirtsize and confidence level
  const [tShirtSize, setTShirtSize] = useState(0);
  const [confidence, setConfidence] = useState(50);

  // grab the feature from the store, if it already exists
  // else localStorage will set this to null
  // it would have been saved as a string, so make it an object
  const savedFeature = JSON.parse(
    localStorage.getItem(`agency_feature_${feature.id}`)
  );
  // local state for the quantity Select dropdown
  const [quantity, setQuantity] = useState(
    savedFeature === null ? 1 : savedFeature.quantity
  );
  // local state to determine whether this has been added to our project
  // we set this state for each feature according to whether an entry
  // for that feature exists in localStorage
  const [addedToProject, setAddedToProject] = useState(
    savedFeature === null ? false : true
  );

  // handles quantity change
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
    // if already in localStorage, update
    if (localStorage.getItem(`agency_feature_${feature.id}`) !== null) {
      feature.quantity = event.target.value;
      localStorage.setItem(
        `agency_feature_${feature.id}`,
        JSON.stringify(feature)
      );
    }
  };

  const handleClick = (event) => {
    setAddedToProject(!addedToProject);
    // update the localStorage
    if (savedFeature === null) {
      // we add the quantity here so we can retrieve it later
      feature.quantity = quantity;
      // it has not been added yet, so add it
      // we need to JSON.stringify because localStorage can't store objects
      localStorage.setItem(
        `agency_feature_${feature.id}`,
        JSON.stringify(feature)
      );
    } else {
      // it's already there, so remove it
      localStorage.removeItem(`agency_feature_${feature.id}`);
      // reset the quantity to 1
      setQuantity(1);
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
      label: 'S',
    },
    {
      value: 40,
      label: 'M',
    },
    {
      value: 60,
      label: 'L',
    },
    {
      value: 80,
      label: 'XL',
    },
    {
      value: 100,
      label: 'XXL',
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
          onChange={(event) => setTShirtSize(event.target.value)}
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
          onChange={(event) => setConfidence(event.target.value)}
        />
      </Box>
    </>
  );
}

export default AgencyOptionsSelectionBlock;
