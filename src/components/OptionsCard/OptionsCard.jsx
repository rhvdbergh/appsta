import { useSelector } from 'react-redux';

// import custom components
import BuyerOptionsSelectionBlock from '../BuyerOptionsSelectionBlock/BuyerOptionsSelectionBlock';
import AgencyOptionsSelectionBlock from '../AgencyOptionsSelectionBlock/AgencyOptionsSelectionBlock';
import BuyerReviewSelectionBlock from '../BuyerReviewSelectionBlock/BuyerReviewSelectionBlock';
import BuyerReviewFeaturesBlock from '../BuyerReviewFeaturesBlock/BuyerReviewFeaturesBlock';
import AdminOptionSelectionBlock from '../AdminOptionSelectionBlock/AdminOptionSelectionBlock';

//adding MUI components
import { Typography, Box, Card, CardContent, CardMedia } from '@mui/material';

// this component shows different features
// it also has a child "block" component based on
// where it appears; this "block" component
// provides different functionalities (e.g., buyers selecting features,
// agencies updating their estimation regarding this feature, adming
// can delete feature, etc.)
function OptionsCard({ feature, listType, quoteData }) {
  // retrieve the user object from the redux store
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
      {/* above: the size of the component is smaller on the admin page */}
      {/* conditionally render either the AgencySelectionBlockor the BuyerSlectionBlock */}
      {/* the buyer-review pages uses different styling options and components */}
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

      {/* the listType shows which parent component */}
      {/* has called this list and determines what component */}
      {/* it should display as a child */}
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
