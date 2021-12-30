import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuotesCard from '../QuotesCard/QuotesCard';

// dummy selectedFeatures list
const selectedFeatures = [
  {
    id: 6,
    feature_name: 'clear table',
    feature_story: 'this table is clear',
    feature_description: 'clear table',
    category_id: 3,
    image_url: 'https://i.stack.imgur.com/jm4zL.png',
    quantity: 2,
  },
  {
    id: 4,
    feature_name: 'clear table',
    feature_story: 'this table is clear',
    feature_description: 'clear table',
    category_id: 3,
    image_url: 'https://i.stack.imgur.com/jm4zL.png',
    quantity: 1,
  },
];

function BuyerCompareQuotes() {
  // set up the dispatch
  const dispatch = useDispatch();

  // retrieve the list of agencies that can offer the buyer's selection of features
  // TODO: remove the // below, it's just for testing
  //const selectedFeatureIDs = useSelector((store = store.selectedFeatures));
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const agencyQuoteData = useSelector((store) => store.agencyQuoteData);

  // on page load
  useEffect(() => {
    dispatch({
      type: 'GET_QUOTING_AGENCIES',
      payload: selectedFeatures.map((f) => f.id),
    });
    // we only need the ids for both the agency ids and the feature ids
  }, []);

  // when we have list of the agencies
  useEffect(() => {
    dispatch({
      type: 'GET_AGENCY_QUOTE_DATA',
      payload: {
        selected_features: selectedFeatures.map((f) => f.id),
        agency_ids: quotingAgencies.map((a) => a.id),
      },
    });
  }, [quotingAgencies]);

  // once we have the quote data,
  // perform the calculation of costs for each agency
  useEffect(() => {
    console.log(`you've reached it, and here is`);
  }, [agencyQuoteData]);

  const calcCost = (agency) => {
    const quotes = agencyQuoteData.filter((d) => d.agency_id === agency.id);
    let cost = 0;
    console.log('here are the quotes for agency', agency.id, ':', quotes);

    quotes.forEach((feature) => {
      let hours;
      switch (feature.t_shirt_size) {
        case 'XS':
          hours = feature.tiny_hours;
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
          hours = feature.extra_large_hours;
          break;
      }
      // determine the quantity that the client wants
      const quantity = selectedFeatures.find(
        (f) => f.id === feature.feature_id
      ).quantity;
      cost += hours * quantity * feature.hourly_rate;
    });

    return cost;
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {agencyQuoteData.length > 0 &&
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

export default BuyerCompareQuotes;
