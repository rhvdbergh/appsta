import { Box } from '@mui/material';
import QuotesCard from '../QuotesCard/QuotesCard';

// dummy data to build quotes object
// should be replaced with information from db
const agencyQuote = {
  agency_name: 'Agency Name',
  logo_url: 'https://source.unsplash.com/random',
  agency_blurb: 'put your blurb here',
};

function BuyerCompareQuotes() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <QuotesCard agencyQuote={agencyQuote} />
      </Box>
    </>
  );
}

export default BuyerCompareQuotes;
