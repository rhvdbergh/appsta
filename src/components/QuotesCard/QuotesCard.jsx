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

function QuotesCard({ agency, cost }) {
  // local state to determine whether card is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  console.log('agency ', agency.id, 'cost is', cost);

  return (
    <Card>
      <CardHeader title={agency.agency_name} />
      <CardMedia component="img" height="200" image={agency.logo_url} />
      <CardContent>
        <Typography>{agency.agency_blurb}</Typography>
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
            <Typography>{agency.phone_number}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <PersonIcon />
            <Typography>
              {agency.contact_first_name} {agency.contact_last_name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <LocationOnIcon />
            <Typography>{agency.city}</Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Minority Owned: </Typography>
          {agency.minority_owned ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Woman Owned: </Typography>
          {agency.woman_owned ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Veteran Owned: </Typography>
          {agency.veteran_owned ? (
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
