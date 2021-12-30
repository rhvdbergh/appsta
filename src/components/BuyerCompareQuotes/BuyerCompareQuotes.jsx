import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuotesCard from '../QuotesCard/QuotesCard';

// dummy data to build quotes object
// should be replaced with information from db
const agencyQuote = {
  agency_name: 'Agency Name',
  logo_url: 'https://source.unsplash.com/random',
  agency_blurb: 'put your blurb here',
  phone_number: '901-999-9999',
  city: 'Providence',
  team_size: '87',
  minority_owned: true,
  woman_owned: false,
  veteran_owned: false,
  staffing_location: 'Onshore Talent Only',
  contact_first_name: 'Ridwan',
  contact_last_name: 'Ali',
};

// dummy selectedFeatures list
const selectedFeatures = [
  {
    id: 6,
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
  //const selectedFeatures = useSelector((store = store.selectedFeatures));
  const quotingAgencies = useSelector((store) => store.quotingAgencies);

  // on page load
  useEffect(() => {
    // we need to send only the feature ids, so we need to filter for the payload
    dispatch({
      type: 'GET_QUOTING_AGENCIES',
      payload: selectedFeatures.map((f) => f.id),
    });
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {quotingAgencies.length > 0 &&
          quotingAgencies.map((agency) => {
            return <QuotesCard key={agency.id} agency={agency} />;
          })}
      </Box>
    </>
  );
}

export default BuyerCompareQuotes;
