import React, { useState } from 'react';
import {
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import Box from '@mui/material/Box';

function BuyerOptionsSelectionBlock({ feature }) {
  // grab the feature from the store, if it already exists
  // else localStorage will set this to null
  // it would have been saved as a string, so make it an object
  const savedFeature = JSON.parse(
    localStorage.getItem(`feature_${feature.id}`)
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
    if (localStorage.getItem(`feature_${feature.id}`) !== null) {
      feature.quantity = event.target.value;
      localStorage.setItem(`feature_${feature.id}`, JSON.stringify(feature));
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
      localStorage.setItem(`feature_${feature.id}`, JSON.stringify(feature));
    } else {
      // it's already there, so remove it
      localStorage.removeItem(`feature_${feature.id}`);
      // reset the quantity to 1
      setQuantity(1);
    }
  };

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
      <Button 
          color='secondary'
          variant="contained" 
          onClick={handleClick}>
        <Typography variant="body1">
          {addedToProject ? 'Remove from my project' : 'Add to my project'}
        </Typography>
      </Button>
      

      <FormControl fullWidth>
        <InputLabel id="quantity">Quantity</InputLabel>
        <Select
          labelId="quantity"
          value={quantity}
          label="Quantity"
          onChange={handleQuantity}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </>
  );
}

export default BuyerOptionsSelectionBlock;
