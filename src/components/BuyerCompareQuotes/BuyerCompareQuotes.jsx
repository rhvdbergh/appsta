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
      <BuyerQuotesList
        projectFeatures={projectFeatures}
        quotingAgencies={quotingAgencies}
      />
    </Box>
  );
}

export default BuyerCompareQuotes;
