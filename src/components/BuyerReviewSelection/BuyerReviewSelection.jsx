import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom';

function BuyerReviewSelection() {

  const history = useHistory()

  const selectedCategory = useSelector((store) => store.selectedCategory);

  const dispatch = useDispatch();

  const features = useSelector((store) => store.features);

  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
  }, []);

  const handleFeatureChange = () => {
    history.push('/BuyerOptions')
  }

  // const handleRegister = () => {
  //   history.push('/')
  // }


  return (
    <>

      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box>
          <h1>Review your project</h1>
          <Button onClick={handleFeatureChange}>Change Features</Button>
          <Button>Register to view quotes</Button>
        </Box>
      </Box>
    </>
  );
}

export default BuyerReviewSelection;
