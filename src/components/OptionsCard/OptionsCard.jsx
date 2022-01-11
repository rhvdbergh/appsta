import * as React from 'react';
import { useSelector } from 'react-redux';

import BuyerOptionsSelectionBlock from '../BuyerOptionsSelectionBlock/BuyerOptionsSelectionBlock';
import AgencyOptionsSelectionBlock from '../AgencyOptionsSelectionBlock/AgencyOptionsSelectionBlock';
import BuyerReviewSelectionBlock from '../BuyerReviewSelectionBlock/BuyerReviewSelectionBlock';
import BuyerReviewFeaturesBlock from '../BuyerReviewFeaturesBlock/BuyerReviewFeaturesBlock';

//adding MUI components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminOptionSelectionBlock from '../AdminOptionSelectionBlock/AdminOptionSelectionBlock';

function OptionsCard({ feature, listType, quoteData }) {
  const theme = useTheme();
  const user = useSelector((store) => store.user);

  return (
    <Card
      elevation={3}
      sx={{
        display: 'flex',
        m: 4,
        width: listType === 'admin-features' ? '400px' : '800px',
      }}
    >
      {listType !== 'buyer-review' && listType !== 'buyer-review-features' && (
        <>
          {/* Text and Image  */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              color: 'text.primary',
              m: 1,
            }}
          >
            <Typography component="div" variant="h5" sx={{ m: 2 }}>
              {feature.feature_name}
            </Typography>

            <CardMedia
              component="img"
              sx={{ width: 250, m: 2 }}
              image={feature.image_url}
              alt={feature.feature_description}
            />
          </Box>

          <CardContent
            sx={{
              flex: '1 0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'text.primary',
              p: 2,
              mx: 2,
            }}
          >
            {/* //conditionally render block - if buyer vs agency display different blocks */}
            {!user.isBuyer && !user.is_admin && user.id ? (
              <AgencyOptionsSelectionBlock feature={feature} />
            ) : listType !== 'buyer-review-features' &&
              listType !== 'admin-features' ? (
              <BuyerOptionsSelectionBlock feature={feature} />
            ) : (
              <></>
            )}
          </CardContent>
        </>
      )}

      {listType === 'buyer-review' && (
        <BuyerReviewSelectionBlock feature={feature} quoteData={quoteData} />
      )}
      {listType === 'buyer-review-features' && (
        <BuyerReviewFeaturesBlock feature={feature} quoteData={quoteData} />
      )}
      {listType === 'admin-features' && (
        <CardContent
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'text.primary',
            p: 2,
            mx: 2,
          }}
        >
          <AdminOptionSelectionBlock feature={feature} />
        </CardContent>
      )}
    </Card>
  );
}

export default OptionsCard;
