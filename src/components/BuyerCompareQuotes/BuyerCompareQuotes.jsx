import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BuyerQuotesList from '../BuyerQuotesList/BuyerQuotesList';

function BuyerCompareQuotes() {
  // set up the dispatch
  const dispatch = useDispatch();

  // retrieve the list of agencies that can offer the buyer's selection of features
  const projectFeatures = useSelector((store) => store.projectFeatures);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const activeProject = useSelector((store) => store.activeProject);

  // on page load, grab the projectFeatures for this buyer's project
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_FEATURES', payload: activeProject });
  }, []);

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
