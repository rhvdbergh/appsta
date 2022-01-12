import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

// component used in the OptionsCard when in BuyerReviewSelection view
function BuyerReviewSelectionBlock({ feature, quoteData }) {
  // retrieve the selected features from the redux store
  // we need this to calculate the quantity
  const selectedFeatures = useSelector((store) => store.selectedFeatures);

  // determine the quantity the client wants for the given feature
  const quantity = selectedFeatures.find((f) => f.id === feature.id).quantity;
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
  };

  // helper function to convert an integer to currency format
  function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(number);
  }

  // extract the quote data for the particular feature
  const featureQuotes = quoteData.filter((d) => d.feature_id === feature.id);

  // use this quote data to get an array of costs from each agency
  const agencyCosts = featureQuotes.map(
    (fq) => fq.hourly_rate * fq[tShirtField(fq.t_shirt_size)]
  );

  // finally, use the reduce function to take the average of the
  // quotes
  const avgCost = agencyCosts.reduce((a, b) => a + b) / agencyCosts.length;

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Box
        sx={{
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ my: 2 }} component="div" variant="h5">
          {feature.feature_name}
        </Typography>
        <Typography sx={{ my: 2 }} component="div" variant="h6">
          AVERAGE ESTIMATED COST: {formatCurrency(quantity * avgCost)}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ m: 2, width: '20%' }}
        image={feature.image_url}
        alt={feature.feature_description}
      />
    </Card>
  );
}
export default BuyerReviewSelectionBlock;
