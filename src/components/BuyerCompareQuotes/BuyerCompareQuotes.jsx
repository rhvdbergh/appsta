import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BuyerQuotesList from '../BuyerQuotesList/BuyerQuotesList';

function BuyerCompareQuotes() {
  // set up the dispatch
  const dispatch = useDispatch();

  // retrieve the user, list of agencies that can offer the buyer's selection of features
  const user = useSelector((store) => store.user);
  const projectFeatures = useSelector((store) => store.projectFeatures);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const activeProject = useSelector((store) => store.activeProject);

  // define state variables we'll use to filter the quoting agencies
  const [minority_owned, setMinority_owned] = useState(false);
  const [woman_owned, setWoman_owned] = useState(false);
  const [veteran_owned, setVeteran_owned] = useState(false);
  const [lgbt_owned, setLgbt_owned] = useState(false);
  const [onsite_talent, setOnsite_talent] = useState(false);

  // initialize a filter array which will be populated with strings corresponding to the criteria to check

  const filters = [];
  let filteredAgencies = quotingAgencies.filter((agency) => filterAgency(agency));
  console.log('Quoting agencies are: ', quotingAgencies);
  console.log('Filtered agencies are', filteredAgencies);

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
    } else if (onsite_talent && agency.staffing_location !== "Onshore Talent Only") {
      return false;
    } else {
      return true;
    }
  }

  // on page load, retrieve the latests saved project
  // this should be the project just saved to the db
  useEffect(() => {
    dispatch({ type: 'GET_LATEST_PROJECT', payload: user.buyers_id });
  });

  // when we have a new active project,
  // grab the projectFeatures for this buyer's project
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_FEATURES', payload: activeProject });
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
    <Box>
      <Box>
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
      <BuyerQuotesList
        projectFeatures={projectFeatures}
        quotingAgencies={filteredAgencies}
      />
    </Box>
  );
}

export default BuyerCompareQuotes;
