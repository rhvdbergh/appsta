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
