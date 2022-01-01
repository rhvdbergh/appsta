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

  // calculate min and max total costs for the set of selected 
  // features
  const totalCost = (quotes, agencies) => {
    // initialize our min and max costs
    let minTotal = 0;
    let maxTotal = 0;
    // loop through the agencies array given into the function
    for (let agency of agencies) {
      // filter the quote data to extract the rows associated with the agency
      let agencyQuote = quotes.filter((q) => q.agency_id === agency.id);
      // calculate the agency's cost to provide all features
      // first map the array to get an array of feature costs
      let agencyTotal = agencyQuote.map((ac) =>
      ac.hourly_rate * ac[tShirtField(ac.t_shirt_size)])
      // then reduce the array to get the total
      .reduce((a,b) => (a + b));
      console.log('Min, max and agency are:', minTotal, maxTotal, agencyTotal);
      // use conditionals to change minTotal and maxTotal as appropriate
      if (maxTotal === 0 && agencyTotal > 0) {
        minTotal = agencyTotal;
        maxTotal = agencyTotal;
      } else if (agencyTotal > maxTotal) {
        maxTotal = agencyTotal;
      } else if (agencyTotal < minTotal && minTotal > 0) {
        minTotal = agencyTotal;
      }
    }
    return (`$${minTotal} - $${maxTotal}`);
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
 
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box>
          <Typography variant="h5">
            Review your project
          </Typography>
          {quoteData.length > 0 && 
            <OptionsList features={selectedFeatures} listType={'buyer-review'} quoteData={quoteData} />
          }
          {/* <Typography variant="h6" sx={{ my:1 }}>
            Cost Range for {selectedCategory} Group: $1,234 - $3,456
          </Typography> */}
          {quoteData.length > 0 &&
            <Typography variant="h6" sx={{ my:1 }}>
              Total cost range: {totalCost(quoteData, quotingAgencies)}
            </Typography>
          }        
          <Button onClick={handleFeatureChange}>Change Features</Button>
          <Button onClick={handleRegister}>Register to view quotes</Button>
        </Box>
      </Box>
    </>
  );
}
export default BuyerReviewSelection;
