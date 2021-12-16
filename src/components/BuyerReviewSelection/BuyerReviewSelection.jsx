import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import OptionsList from '../OptionsList/OptionsList';


function BuyerReviewSelection() {
  const history = useHistory()
  const selectedCategory = useSelector((store) => store.selectedCategory);
  const dispatch = useDispatch();
  const selectedFeatures = useSelector((store) => store.selectedFeatures);
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
          <OptionsList features={selectedFeatures} listType={'buyer-review'} />
          <Typography variant="h6" sx={{ my:1 }}>
            Cost Range for *Feature* Group: $1,234 - $3,456
          </Typography>
          <Typography variant="h6" sx={{ my:1 }}>
            Total cost range: $4,567 - $6,789
          </Typography>
          
          <Button onClick={handleFeatureChange}>Change Features</Button>
          <Button>Register to view quotes</Button>
        </Box>
      </Box>
    </>
  );
}
export default BuyerReviewSelection;
