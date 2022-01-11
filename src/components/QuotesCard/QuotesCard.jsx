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
import EmailIcon from '@mui/icons-material/Email';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// this component is a card that shows details of an agency
// that is providing a quote
function QuotesCard({ agency, cost, displayingBuyerCompareQuotes }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // keep track of whether Learn More section is open or not
  const [isExpanded, setIsExpanded] = useState(false);

  // get the saved agencies from the redux store
  const projectAgencies = useSelector((store) => store.projectAgencies);

  // get the active project id from the redux store
  const activeProject = useSelector((store) => store.activeProject);

  // local state to keep track of whether this agency has been selected or not
  const [isSelected, setIsSelected] = useState(
    projectAgencies.map((a) => a.agency_id).includes(agency.id)
  );

  // function to toggle whether this quote is selected or not
  // only shows up if the select button is showing
  const handleSelect = () => {
    if (isSelected) {
      // we need to remove this from the db
      dispatch({
        type: 'DELETE_PROJECT_AGENCY',
        payload: { activeProject: activeProject, agency_id: agency.id },
      });
      setIsSelected(false);
    } else {
      // we need to add this to the db
      dispatch({
        type: 'ADD_PROJECT_AGENCY',
        payload: { activeProject: activeProject, agency_id: agency.id },
      });
      setIsSelected(true);
    }
  };

  return (
    <Box>
      <Card elevation={3} sx={{ width: '350px', m: 1 }}>
        <CardHeader align="center" title={agency.agency_name} />
        <CardMedia
          component="img"
          width="350"
          image={agency.logo_url}
          sx={{ height: '300px' }}
        />
        <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
          <Box>
            {/* This button toggles whether the expand */}
            <Button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Show Less' : 'Learn More'}
            </Button>
          </Box>
        </CardActions>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box sx={{ display: 'flex', my: 0.5 }}>
              <PhoneIcon />
              <Typography>{agency.phone_number}</Typography>
            </Box>
            <Box sx={{ display: 'flex', my: 0.5 }}>
              <EmailIcon />
              <Typography>{agency.agency_email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', my: 0.5 }}>
              <PersonIcon />
              <Typography>
                {agency.contact_first_name} {agency.contact_last_name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', my: 0.5 }}>
              <LocationOnIcon />
              <Typography>{agency.city}</Typography>
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography>{agency.agency_blurb}</Typography>
            </Box>
            <Box>
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
                {agency.woman_owned ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Veteran Owned: </Typography>
                {agency.veteran_owned ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>LGBT Owned: </Typography>
                {agency.lgbt_owned ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography>
                  Staff Location: {agency.staffing_location}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Collapse>
        <CardContent>
          {/* Calculate the cost for this specific company */}
          <Typography variant="h5" align="center">
            Cost: ${cost}
          </Typography>
        </CardContent>
      </Card>
      {/* The select button should only display on buyer compare quotes page */}
      {displayingBuyerCompareQuotes && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, mb: 3 }}>
          <Button variant="contained" onClick={handleSelect}>
            {/* checks whether this agency has already been selected */}
            {isSelected ? 'Remove' : 'Select'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default QuotesCard;
