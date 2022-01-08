import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList from '../OptionsList/OptionsList';
import Navbar from '../Navbar/Navbar';
import { Box, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function AgencyOptionsPage() {
  const selectedCategory = useSelector((store) => store.selectedCategory);

  const history = useHistory();
  //CHANGE THIS TO FEATURES
  const returnHome = () => {
    history.push('/AgencyDashboard');
  };

  const dispatch = useDispatch();
  const features = useSelector((store) => store.features);

  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Navbar btn1text={'HOME'} fxn1={returnHome} />
        <Box>
          <Typography 
            variant="h5" 
            sx={{m:3}}> 
            Choose Which Services You Offer 
          </Typography>
          <Typography
            variant="body1"
            sx={{m:3}}>            
            Click a category on the left to show a list of features for the category. Select the features your agency can offer by choosing a T-shirt size and your confidence level.
          </Typography>
          <OptionsList features={features} />
          <Button
            sx={{m:3}}
            variant="contained"
            onClick={returnHome}>
            Done Selecting? Move to Dashboard
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AgencyOptionsPage;
