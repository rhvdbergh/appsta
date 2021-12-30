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
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

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
          <Box sx={{ display: 'flex' }}>
            <PhoneIcon />
            <Typography>{agencyQuote.phone_number}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <PersonIcon />
            <Typography>
              {agencyQuote.contact_first_name} {agencyQuote.contact_last_name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <LocationOnIcon />
            <Typography>{agencyQuote.city}</Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Minority Owned: </Typography>
          {agencyQuote.minority_owned ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Woman Owned: </Typography>
          {agencyQuote.woman_owned ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Veteran Owned: </Typography>
          {agencyQuote.veteran_owned ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </Box>
      </Collapse>
      <CardContent>
        {/* Calculate the cost for this specific company */}
        <Typography>Cost: ${}</Typography>
      </CardContent>
    </Card>
  );
}

export default QuotesCard;
