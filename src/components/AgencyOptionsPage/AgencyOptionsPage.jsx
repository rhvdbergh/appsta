import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList from '../OptionsList/OptionsList';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
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
      <div class="container">
        <Box sx={{ display: 'flex' }}>
          <Navbar btn1text={'HOME'} fxn1={returnHome} />
          <Box>
            <h1> Choose Which Services You Offer </h1>
            <p>
              {' '}
              Select the features your agency can offer by indicating the
              estimated time to build and your confidence level.{' '}
            </p>
            <OptionsList features={features} />
            <p> Selected Category ID is: {selectedCategory}</p>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AgencyOptionsPage;
