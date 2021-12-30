import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  Collapse,
  CardContent,
  Box,
  Button,
  CardMedia,
  Typography,
} from '@mui/material';

// expects an agencyQuote object that is similar to the
// route received from /api/quotes/agencyquote
function QuotesCard({ agencyQuote }) {
  // local state to determine whether card is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader title={agencyQuote.agency_name} />
      <CardMedia component="img" height="200" image={agencyQuote.logo_url} />
      <CardContent>
        <Typography>{agencyQuote.agency_blurb}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Learn More'}
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>my content</Typography>
          <Typography>my content</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default QuotesCard;
