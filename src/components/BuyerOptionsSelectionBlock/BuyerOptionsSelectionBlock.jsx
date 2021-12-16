import React, { useState } from 'react';
import {
  Button,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

function BuyerOptionsSelectionBlock() {
  // local state for the quantity Select dropdown
  const [quantity, setQuantity] = useState('');

  // handles quantity change
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <>
      <Button variant="contained">
        <Typography variant="body1">Add to my project</Typography>
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
    </>
  );
}

export default BuyerOptionsSelectionBlock;
