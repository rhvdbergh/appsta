import * as React from 'react';
import { useSelector } from 'react-redux';

import BuyerOptionsSelectionBlock from '../BuyerOptionsSelectionBlock/BuyerOptionsSelectionBlock';
import AgencyOptionsSelectionBlock from '../AgencyOptionsSelectionBlock/AgencyOptionsSelectionBlock';
import BuyerReviewSelectionBlock from '../BuyerReviewSelectionBlock/BuyerReviewSelectionBlock';

 
//adding MUI components 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';


function OptionsCard({ feature, listType, quoteData }) {
  const theme = useTheme();
  const user = useSelector(store => store.user);

  return (

    <Card  sx={{ display: 'flex'}}>
      {listType !== 'buyer-review' && (
        <>
{/* Text and Image  */}
          <Box sx={{ display: 'flex', flexDirection: 'column', color: 'text.secondary', }}>
            <Typography component="div" variant="h5">
              {feature.feature_name}
            </Typography>

            <CardMedia
              component="img"
              sx={{ width: 250 }}
              image={feature.image_url}
              alt={feature.feature_description}
            />
          </Box>

          <CardContent sx={{ flex: '1 0 auto', border: "2px solid red", display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
            {/* //conditionally render block - if buyer vs agency display different blocks */}
            {!user.isBuyer && user.id ? (
              <AgencyOptionsSelectionBlock feature={feature} />
            ) : (<BuyerOptionsSelectionBlock feature={feature} />
            )}
          </CardContent>
        </>
      )}
      
      {listType === 'buyer-review' && 
        <BuyerReviewSelectionBlock feature={feature} quoteData={quoteData} />}
    </Card>
  );
}

export default OptionsCard;
