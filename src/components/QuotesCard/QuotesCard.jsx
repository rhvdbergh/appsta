import {
  Card,
  CardHeader,
  CardActions,
  Collapse,
  CardContent,
  Box,
  CardMedia,
  Typography,
} from '@mui/material';

// expects an agencyQuote object that is similar to the
// route received from /api/quotes/agencyquote
function QuotesCard({ agencyQuote }) {
  return (
    <Card>
      <CardHeader title={agencyQuote.agency_name} />
      <CardMedia component="img" height="200" image={agencyQuote.logo_url} />
      <CardContent>
        <Typography>{agencyQuote.agency_blurb}</Typography>
      </CardContent>
    </Card>
  );
}

export default QuotesCard;
