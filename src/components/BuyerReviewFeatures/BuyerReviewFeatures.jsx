import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import OptionsList from '../OptionsList/OptionsList';

// this component shows the logged in buyer the features
// associated with their saved project
function BuyerReviewFeatures() {
  // set up history hook
  const history = useHistory();
  // grab selected category ID from redux Store
  const selectedCategory = useSelector((store) => store.selectedCategory);
  // set up dispatch hook
  const dispatch = useDispatch();
  // grab the categories list from the redux store
  const categories = useSelector((store) => store.category);
  // extract the selected category name based on selected category ID
  let categoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.category_name
    : '';
  // retrieve the buyers feature set, the agencies that can provide
  // that feature set, and the cost estimate data.
  const projectFeatures = useSelector((store) => store.projectFeatures);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const quoteData = useSelector((store) => store.agencyQuoteData);
  const activeProject = useSelector((store) => store.activeProject);
  const user = useSelector((store) => store.user);

  // filter the quoteData for the selected category from the navBar
  const categoryQuotes = quoteData.filter(
    (q) => q.category_id === selectedCategory
  );

  // on page load, retrieve the latest project associated with this user as buyer
  // and save as the activeProject
  useEffect(() => {
    dispatch({ type: 'GET_LATEST_PROJECT', payload: user.buyers_id });
    dispatch({ type: 'FETCH_CATEGORY' });
  }, []);

  // next, make sure the projectFeatures reducer is up to date
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_FEATURES', payload: activeProject });
  }, [activeProject]);

  // next, get the agencies that provide
  // the feature set
  useEffect(() => {
    dispatch({
      type: 'GET_QUOTING_AGENCIES',
      payload: projectFeatures.map((f) => f.feature_id),
    });
  }, [projectFeatures]);

  // when we have the agencies, get the cost estimate data
  useEffect(() => {
    dispatch({
      type: 'GET_AGENCY_QUOTE_DATA',
      payload: {
        selected_features: projectFeatures.map((f) => f.feature_id),
        agency_ids: quotingAgencies.map((agency) => agency.id),
      },
    });
  }, [quotingAgencies]);

  // once we have the cost estimate data, perform one final calc/render
  useEffect(() => {
    console.log('Final useEffect and render');
  }, [quoteData]);

  // helper function to convert T-shirt size to quote field

  const tShirtField = (shirtSize) => {
    switch (shirtSize) {
      case 'XS':
        return 'xsmall_hours';
      case 'S':
        return 'small_hours';
      case 'M':
        return 'medium_hours';
      case 'L':
        return 'large_hours';
      case 'XL':
        return 'xlarge_hours';
    }
  };

  // helper function to convert an integer to currency format

  function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(number);
  }

  // calculate min and max total costs for the set of selected
  // features
  const totalCost = (quotes, agencies) => {
    // initialize our min and max costs
    let minTotal = 0;
    let maxTotal = 0;
    // loop through the agencies array given into the function
    for (let agency of agencies) {
      // filter the quote data to extract the rows associated with the agency
      let agencyQuote = quotes.filter((q) => q.agency_id === agency.id);
      console.log('agencyQuote is:', agencyQuote);
      // now loop through all the feature quotes for the agency and add the quantity from the selected features
      for (let quote of agencyQuote) {
        let quantity =
          // match the feature ID from selectedFeatures and the quote
          projectFeatures.find((f) => f.id === quote.feature_id).quantity || 0;
        quote.quantity = quantity;
      }
      // calculate the agency's cost to provide all features
      // first map the array to get an array of feature costs
      let agencyTotal = agencyQuote
        .map(
          (ac) =>
            ac.hourly_rate * ac[tShirtField(ac.t_shirt_size)] * ac.quantity
        )
        // then reduce the array to get the total
        .reduce((a, b) => a + b);
      console.log('Min, max and agency are:', minTotal, maxTotal, agencyTotal);
      // use conditionals to change minTotal and maxTotal as appropriate
      if (maxTotal === 0 && agencyTotal > 0) {
        minTotal = agencyTotal;
        maxTotal = agencyTotal;
      } else if (agencyTotal > maxTotal) {
        maxTotal = agencyTotal;
      } else if (agencyTotal < minTotal && minTotal > 0) {
        minTotal = agencyTotal;
      }
    }
    return `${formatCurrency(minTotal)} - ${formatCurrency(maxTotal)}`;
  };

  console.log(
    'Project feature IDs are: ',
    projectFeatures.map((f) => f.feature_id)
  );
  console.log('Agency quote data is:', quoteData);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar
          btn1text={'Go Back'}
          fxn1={() => history.push('/BuyerDashboard')}
        />
        <Box>
          <Typography variant="h5">
            Review the features of your project
          </Typography>
          {quoteData.length > 0 && 
            projectFeatures.length > 0 && (
            <OptionsList
              features={projectFeatures}
              listType={'buyer-review-features'}
              quoteData={quoteData}
              quotingAgencies={quotingAgencies}
              totalCost={totalCost}
            />
          )}
          {quoteData.length === 0 && 
            projectFeatures.length > 0 && (
            <Typography variant="h6">
              Sorry, no agencies can provide all of your selected features.
            </Typography>
          )}
          {categoryQuotes.length > 0 && 
            projectFeatures.length > 0 && (
            <Typography variant="h6" sx={{ my: 1 }}>
              Cost range for {categoryName} group:{' '}
              {totalCost(categoryQuotes, quotingAgencies)}
            </Typography>
          )}
          {quoteData.length > 0 && 
            projectFeatures.length && (
            <Typography variant="h6" sx={{ my: 1 }}>
              Cost range for project: {totalCost(quoteData, quotingAgencies)}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
export default BuyerReviewFeatures;
