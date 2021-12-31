import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

function BuyerReviewSelectionBlock({ feature }) {
  // Grab quoteData from the store, should be active
  const quoteData = useSelector((store) => store.agencyQuoteData);
  // grab selected features from the store. Only needed for the quantity
  const selectedFeatures = useSelector((store) => store.selectedFeatures);
  // determine the quantity the client wants for the given feature
  const quantity = selectedFeatures.find(
    (f) => f.id === feature.id)
    .quantity;
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
  // extract the quote data for the particular feature
  const featureQuotes = quoteData.filter((d) => d.feature_id === feature.id);

  // use this quote data to get an array of costs from each agency
  const agencyCosts = featureQuotes.map((fq) => 
  fq.hourly_rate * fq[tShirtField(fq.t_shirt_size)]);

  // finally, use the reduce function to take the average of the 
  // quotes
  const avgCost = agencyCosts.reduce((a, b) => (a + b))/agencyCosts.length;

  
  
    return (
        <Box sx={{ display: 'flex' }}>
            <Box>
                <Typography component="div" variant="body2">
                    AVERAGE ESTIMATED COST: ${quantity * avgCost}
                </Typography>
                <Typography component="div" variant="h5">
                    {feature.feature_name}
                </Typography>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 75 }}
                image={feature.image_url}
                alt={feature.feature_description}
            />
        </Box>
    )
}
export default BuyerReviewSelectionBlock;