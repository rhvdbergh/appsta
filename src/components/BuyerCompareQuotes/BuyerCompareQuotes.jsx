import {
  Checkbox,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Modal,
  Card,
  CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import custom components
import BuyerQuotesList from '../BuyerQuotesList/BuyerQuotesList';
import Navbar from '../Navbar/Navbar';

// this component is the main view for buyers to compare quotes
function BuyerCompareQuotes() {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // set up the history to navigate
  const history = useHistory();

  // retrieve the user, list of agencies
  // that can offer the buyer's selection of features
  // and the active project, if there is one
  const user = useSelector((store) => store.user);
  const projectFeatures = useSelector((store) => store.projectFeatures);
  const projectAgencies = useSelector((store) => store.projectAgencies);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const activeProject = useSelector((store) => store.activeProject);

  // define state variables we'll use to filter the quoting agencies
  const [minority_owned, setMinority_owned] = useState(false);
  const [woman_owned, setWoman_owned] = useState(false);
  const [veteran_owned, setVeteran_owned] = useState(false);
  const [lgbt_owned, setLgbt_owned] = useState(false);
  const [onsite_talent, setOnsite_talent] = useState(false);

  // local state for modal
  const [modalOpen, setModalOpen] = useState(false);

  // initialize a filter array which will be populated with strings corresponding to the criteria to check
  let filteredAgencies = quotingAgencies.filter((agency) =>
    filterAgency(agency)
  );

  // create a function to filter an agency list based on the checked criteria
  function filterAgency(agency) {
    if (minority_owned && !agency.minority_owned) {
      return false;
    } else if (woman_owned && !agency.woman_owned) {
      return false;
    } else if (veteran_owned && !agency.veteran_owned) {
      return false;
    } else if (lgbt_owned && !agency.lgbt_owned) {
      return false;
    } else if (
      onsite_talent &&
      agency.staffing_location !== 'Onshore Talent Only'
    ) {
      return false;
    } else {
      return true;
    }
  }

  // on page load, retrieve the latests saved project
  // this should be the project just saved to the db
  useEffect(() => {
    dispatch({ type: 'GET_LATEST_PROJECT', payload: user.buyers_id });
  }, []);

  // when we have a new active project,
  // grab the projectFeatures for this buyer's project
  // also, in case there are already some saved agencies, get
  // their ids (they are needed on QuotesCard)
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_FEATURES', payload: activeProject });
    dispatch({ type: 'GET_PROJECT_AGENCIES', payload: activeProject });
  }, [activeProject]);

  // when projectFeatures changes, update the quoting agencies
  useEffect(() => {
    dispatch({
      type: 'GET_QUOTING_AGENCIES',
      payload: projectFeatures.map((f) => f.id),
    });
    // we only need the ids for both the agency ids and the feature ids
  }, [projectFeatures]);

  return (
    <Box sx={{ display: 'flex', minWidth: '100vw' }}>
      {/* This box above this comment contains the navbar and the rest of the page */}
      {/* The rest of the page is contained in a Box */}
      {/* There should only be two children for this first Box */}
      {/* A button text and associated function is passed to the Navbar */}
      {/* And a prop to show that the user is on the buyer dashboard (or compare quotes) */}
      {/* this boolean value affects the rendering of the navbar */}
      <Navbar
        onBuyerDashboard={true}
        btn1text={'Save Project'}
        fxn1={
          // save project simply moves the buyer to the dashboard
          // the project has already been saved
          // but the user has to have selected at least one agency
          // otherwise the modal pops up asking the user to select at least one
          projectAgencies.length > 0
            ? () => {
                dispatch({ type: 'REFRESH_DATA' });
                history.push('/BuyerDashboard');
              }
            : () => {
                setModalOpen(true);
              }
        }
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ height: '10vh', width: '100%' }}>
          <Typography variant="h3" sx={{ my: 3, textAlign: 'center' }}>
            Compare and Save Quotes
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          {/* This box contains the search filters */}
          <Box
            sx={{ display: 'flex', justifyContent: 'center', height: '8vh' }}
          >
            <FormControl component="fieldset">
              <FormGroup row aria-label="agency-filters">
                <FormControlLabel
                  control={<Checkbox />}
                  label="Minority Owned"
                  onChange={(event) => {
                    console.log('Minority owned clicked');
                    setMinority_owned(event.target.checked);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Woman Owned"
                  onChange={(event) => {
                    console.log('Woman owned clicked');
                    setWoman_owned(event.target.checked);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Veteran Owned"
                  onChange={(event) => {
                    console.log('Veteran owned clicked');
                    setVeteran_owned(event.target.checked);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="LGBT Owned"
                  onChange={(event) => {
                    console.log('LGBT owned clicked');
                    setLgbt_owned(event.target.checked);
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Only Onshore Talent"
                  onChange={(event) => {
                    console.log('Onshore talent clicked');
                    setOnsite_talent(event.target.checked);
                  }}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Box sx={{ height: '78vh', overflow: 'scroll', width: '100%' }}>
            {/* displayingBuyerCompareQuotes makes the "select" button */}
            {/* show up on cards */}
            <BuyerQuotesList
              projectFeatures={projectFeatures}
              quotingAgencies={filteredAgencies}
              displayingBuyerCompareQuotes={true}
            />
          </Box>
        </Box>
      </Box>
      {/* Modal to inform user that at least one agency should be selected */}
      {/* before saving project */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            p: 2,
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6">
              You haven't saved any agencies yet!
            </Typography>
            <Typography variant="h6">
              Please select at least one quote to continue.
            </Typography>
          </CardContent>
          <CardContent
            sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}
          >
            <Button
              sx={{ mr: '30px' }}
              variant="contained"
              onClick={() => setModalOpen(false)}
            >
              OK
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
}

export default BuyerCompareQuotes;
