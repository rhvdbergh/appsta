import { Box } from '@mui/material';
import { useEffect, useReducer } from 'react';
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

  // use the UX checkboxes to create and maintain an array of strings corresponding to the filter criteria
  const changeFilters = (criteria, value) => {
    if (value === true) {
      filters.push(criteria);
    } else if (value === false) {
      filters.splice(filters.indexOf(criteria), 1);
    }
  }
// create a function to filter an agency list based on the checked criteria
  function filterAgency (agency, filters) {
    for (filter in filters) {
      if (agency[filter] === false) {
        return false;
      }
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

  // when the filtering criteria changes, change the filtered agencies
  useEffect(() => {
    const filteredAgencies = quotingAgencies.filter((agency) => filterAgency(agency));
  }, [filters])

  return (
    <Box>
      <Box>
        <FormControl component="fieldset">
          <FormGroup row aria-label="minority-owned">
            <FormControlLabel
              control={<Checkbox />}
              label="Minority Owned"
              onChange={(event) => {
                setMinority_owned(event.target.checked);
                changeFilters('minority_owned', minority_owned);
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
