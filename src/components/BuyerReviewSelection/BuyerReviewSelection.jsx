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
  const selectedFeatureIDs = selectedFeatures.map(feature => feature.id);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const quotingAgencyIDs = quotingAgencies.map(agency => agency.id);
  const quoteData = useSelector((store) => store.agencyQuoteData)

  // helper function to convert T-shirt size to quote field

  const tShirtField = (shirtSize) => {
    switch (shirtSize) {
      case 'XS':
        return 'xsmall_hours';
      case 'S':
        return 'small_hours';
      case 'M':
        return 'medium_hours';
      case 'L':
        return 'large_hours';
      case 'XL':
        return 'xlarge_hours';
    }
  }

  // helper function to calculate the cost associated with a given agency_feature quote

  const agencyFeatureCost = (item) => {
    return item.hourly_rate * item[tShirtField(item.t_shirt_size)]
  }



  // function to create the total cost range for the set of selected features
  // const totalCost = () => {
  //   let minCost, maxCost = 0;
  //   for (feature in selectedFeatureIDs) {
  //     quoteData
  //       .filter(item => item.feature_id === feature)
  //       .map(item => item.)

  //   }

  // }

  useEffect(() => {
    // dispatch({ type: 'GET_FEATURES' });
    dispatch({ type: 'GET_QUOTING_AGENCIES', 
      payload: selectedFeatureIDs});
    dispatch({ type: 'GET_AGENCY_QUOTE_DATA',
      payload: {
        selected_features: selectedFeatureIDs,
        agency_ids: quotingAgencyIDs
      }    
    }) 
  }, []);

  const handleFeatureChange = () => {
    history.push('/BuyerOptions')
  }
  const handleRegister = () => {
    history.push('/BuyerRegistration')
  }
  console.log('Selected feature IDs are: ', selectedFeatureIDs);
  console.log('Quoting agency IDs are: ', quotingAgencyIDs);
  console.log('Agency quote data is:', quoteData);
  console.log('Test Calc:', agencyFeatureCost(quoteData[0]));

 
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box>
          <Typography variant="h5">
            Review your project
          </Typography>
          <OptionsList features={selectedFeatures} listType={'buyer-review'} />
          <Typography variant="h6" sx={{ my:1 }}>
            Cost Range for {selectedCategory} Group: $1,234 - $3,456
          </Typography>
          <Typography variant="h6" sx={{ my:1 }}>
            Total cost range: $4,567 - $6,789
          </Typography>
          
          <Button onClick={handleFeatureChange}>Change Features</Button>
          <Button onClick={handleRegister}>Register to view quotes</Button>
        </Box>
      </Box>
    </>
  );
}
export default BuyerReviewSelection;
