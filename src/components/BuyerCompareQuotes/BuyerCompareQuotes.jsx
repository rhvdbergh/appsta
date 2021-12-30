import { Box } from '@mui/material';
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

function BuyerCompareQuotes() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <QuotesCard agencyQuote={agencyQuote} />
        <QuotesCard agencyQuote={agencyQuote} />
      </Box>
    </>
  );
}

export default BuyerCompareQuotes;
