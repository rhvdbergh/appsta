import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// import custom components
import Navbar from '../Navbar/Navbar';
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
  // that feature set, and the cost estimate data from the redux store
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

  // next, once we have the activeProject id,
  // make sure the projectFeatures reducer is up to date
  useEffect(() => {
    dispatch({ type: 'GET_PROJECT_FEATURES', payload: activeProject });
  }, [activeProject]);

  // next, once we have the features associated with the project,
  // get the agencies that provide
  // the feature set
  // we need the feature IDs to pass to the saga
  // so we need to filter
  useEffect(() => {
    dispatch({
      type: 'GET_QUOTING_AGENCIES',
      payload: projectFeatures.map((f) => f.feature_id),
    });
  }, [projectFeatures]);

  // when we have the agencies, get the cost estimate data
  // we need the feature IDs and a list of agency IDs
  // so we need to filter
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

  return (
    <>
      {/* This box contains the navbar and the rest of the page */}
      {/* The rest of the page is contained in a Box */}
      {/* There should only be two children for this first Box */}
      <Box sx={{ display: 'flex' }}>
        {/* passing a button and function as properties to the nav */}
        {/* refreshing the data to make sure old data doesn't  */}
        {/* show up on new pages */}
        <Navbar
          btn1text={'Go Back'}
          fxn1={() => {
            history.push('/BuyerDashboard');
            dispatch({ type: 'REFRESH_DATA' });
          }}
        />
        <Box>
          <Typography sx={{ m: 4, mt: 5 }} variant="h4">
            Review the features of your project
          </Typography>
          {/* We should only display the OptionsList */}
          {/* if we have information to display, else calculations will break */}
          {quoteData.length > 0 && projectFeatures.length > 0 && (
            <OptionsList
              features={projectFeatures}
              listType={'buyer-review-features'}
              quoteData={quoteData}
              quotingAgencies={quotingAgencies}
              totalCost={totalCost}
            />
          )}
          {/* If no agencies can provide this feature, inform the user */}
          {quoteData.length === 0 && projectFeatures.length > 0 && (
            <Typography variant="h6">
              Sorry, no agencies can provide all of your selected features.
            </Typography>
          )}
          {/* Only display this information if there are features */}
          {/* selected for this category */}
          {categoryQuotes.length > 0 && projectFeatures.length > 0 && (
            <Typography variant="h6" sx={{ m: 4 }}>
              Cost range for {categoryName} group:{' '}
              {totalCost(categoryQuotes, quotingAgencies)}
            </Typography>
          )}
          {/* only display this information if there are agencies */}
          {/* that can provide all of the features */}
          {quoteData.length > 0 && projectFeatures.length && (
            <Typography variant="h6" sx={{ m: 4 }}>
              Cost range for project: {totalCost(quoteData, quotingAgencies)}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
export default BuyerReviewFeatures;
