import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuotesCard from '../QuotesCard/QuotesCard';

function BuyerQuotesList({ projectFeatures, quotingAgencies }) {
  // set up the dispatch
  const dispatch = useDispatch();

  // retrieve the list of agencies that can offer the buyer's selection of features
  const agencyQuoteData = useSelector((store) => store.agencyQuoteData);

  // when we have list of the agencies
  useEffect(() => {
    dispatch({
      type: 'GET_AGENCY_QUOTE_DATA',
      payload: {
        selected_features: projectFeatures.map((f) => f.id),
        agency_ids: quotingAgencies.map((a) => a.id),
      },
    });
  }, [quotingAgencies]);

  // once we have the quote data,
  // perform the calculation of costs for each agency
  useEffect(() => {
    console.log(`you've reached it, and here is`);
  }, [agencyQuoteData]);

  // calculates the cost for each agency
  // based on the features they can provide and their
  // preferences
  const calcCost = (agency) => {
    // grab all the features belonging to this agency's quote
    const quotes = agencyQuoteData.filter((d) => d.agency_id === agency.id);
    let cost = 0;
    // now run through each quote for each feature and add it all up
    quotes.forEach((feature) => {
      let hours;
      // determine the hours based on this feature's t-shirt size
      switch (feature.t_shirt_size) {
        case 'XS':
          hours = feature.xsmall_hours;
          break;
        case 'S':
          hours = feature.small_hours;
          break;
        case 'M':
          hours = feature.medium_hours;
          break;
        case 'L':
          hours = feature.large_hours;
          break;
        case 'XL':
          hours = feature.xlarge_hours;
          break;
      }
      // determine the quantity that the client wants
      const quantity = projectFeatures.find(
        (f) => f.id === feature.feature_id
      ).quantity;
      // add to the cost this agency's hours multiplied by the hourly rate
      cost += hours * quantity * feature.hourly_rate;
    });

    return cost;
  };

  console.log('Agency quote data is: ', agencyQuoteData);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {agencyQuoteData.length > 0 &&
          projectFeatures.length > 0 &&
          quotingAgencies.map((agency) => {
            return (
              <QuotesCard
                key={agency.id}
                agency={agency}
                cost={calcCost(agency)}
              />
            );
          })}
      </Box>
    </>
  );
}

export default BuyerQuotesList;
