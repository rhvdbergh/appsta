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
  // set up history hook
  const history = useHistory()
  // grab selected category ID from redux Store
  const selectedCategory = useSelector((store) => store.selectedCategory);
  // set up dispatch hook
  const dispatch = useDispatch();
  // retrieve the buyers feature set, the agencies that can provide
  // that feature set, and the cost estimate data.
  const selectedFeatures = useSelector((store) => store.selectedFeatures);
  const selectedFeatureIDs = selectedFeatures.map(feature => feature.id);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const quotingAgencyIDs = quotingAgencies.map(agency => agency.id);
  const quoteData = useSelector((store) => store.agencyQuoteData)

  // function to create the total cost range for the set of selected features
  // const totalCost = () => {
  //   let minCost, maxCost = 0;
  //   for (feature in selectedFeatureIDs) {
  //     quoteData
  //       .filter(item => item.feature_id === feature)
  //       .map(item => item.)

  //   }

  // }
  // on page load, get the agencies that provide
  // the feature set
  useEffect(() => {
    dispatch({ type: 'GET_QUOTING_AGENCIES', 
      payload: selectedFeatureIDs
    });   
  }, []);
  // when we have the agencies, get the cost estimate data
  useEffect(() => {
    dispatch({ 
      type: 'GET_AGENCY_QUOTE_DATA',
      payload: {
        selected_features: selectedFeatureIDs,
        agency_ids: quotingAgencyIDs
      }    
    });
  }, [quotingAgencies]);
  // once we have the cost estimate data, perform one final calc/render
  useEffect(() => {
    console.log('Final useEffect and render');
  }, [quoteData]);

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

  // function to calculate average cost of a given feature
  const avgCost = (feature) => {
    const quotes = quoteData.filter((quote) => quote.feature_id === feature.id);
    
  }
 
  const handleFeatureChange = () => {
    history.push('/BuyerOptions')
  }
  const handleRegister = () => {
    history.push('/BuyerRegistration')
  }
  console.log('Selected feature IDs are: ', selectedFeatureIDs);
  console.log('Quoting agency IDs are: ', quotingAgencyIDs);
  console.log('Agency quote data is:', quoteData);
  console.log('Test Calc:', agencyFeatureCost(quoteData[1]));

 
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
