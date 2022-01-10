import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import OptionsList from "../OptionsList/OptionsList";

// before finally submitting the project features,
// this component allows the user to review features
// and either move forward or return to the options screen
// to select other features
function BuyerReviewSelection() {
  // set up history hook
  const history = useHistory();
  // grab the user
  const user = useSelector((store) => store.user);
  // grab selected category ID from redux Store
  const selectedCategory = useSelector((store) => store.selectedCategory);
  // set up dispatch hook
  const dispatch = useDispatch();
  // grab the categories list from the redux store
  const categories = useSelector((store) => store.category);
  // extract the selected category name based on selected category ID
  let categoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.category_name
    : "";
  // retrieve the buyers feature set, the agencies that can provide
  // that feature set, and the cost estimate data.
  const selectedFeatures = useSelector((store) => store.selectedFeatures);
  const selectedFeatureIDs = selectedFeatures.map((feature) => feature.id);
  const quotingAgencies = useSelector((store) => store.quotingAgencies);
  const quotingAgencyIDs = quotingAgencies.map((agency) => agency.id);
  const quoteData = useSelector((store) => store.agencyQuoteData);
  // filter the quoteData for the selected category from the navBar
  const categoryQuotes = quoteData.filter(
    (q) => q.category_id === selectedCategory
  );

  // }
  // on page load, get the agencies that provide
  // the feature set
  useEffect(() => {
    dispatch({ type: "GET_QUOTING_AGENCIES", payload: selectedFeatureIDs });
  }, []);
  // when we have the agencies, get the cost estimate data
  useEffect(() => {
    dispatch({
      type: "GET_AGENCY_QUOTE_DATA",
      payload: {
        selected_features: selectedFeatureIDs,
        agency_ids: quotingAgencyIDs,
      },
    });
  }, [quotingAgencies]);
  // once we have the cost estimate data, perform one final calc/render
  useEffect(() => {
    console.log("Final useEffect and render");
  }, [quoteData]);

  // helper function to convert T-shirt size to quote field

  const tShirtField = (shirtSize) => {
    switch (shirtSize) {
      case "XS":
        return "xsmall_hours";
      case "S":
        return "small_hours";
      case "M":
        return "medium_hours";
      case "L":
        return "large_hours";
      case "XL":
        return "xlarge_hours";
    }
  };

  // helper function to convert an integer to currency format

  function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
      console.log("agencyQuote is:", agencyQuote);
      // now loop through all the feature quotes for the agency and add the quantity from the selected features
      for (let quote of agencyQuote) {
        console.log(
          "in the loop, and quote is:",
          quote,
          "and selectedFeatures is:",
          selectedFeatures
        );
        let quantity =
          // match the feature ID from selectedFeatures and the quote
          selectedFeatures.find((f) => f.id === quote.feature_id).quantity || 0;
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
      console.log("Min, max and agency are:", minTotal, maxTotal, agencyTotal);
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

  const handleFeatureChange = () => {
    dispatch({ type: "REFRESH_DATA" });
    history.push("/BuyerOptions");
  };
  //handles registration of user if not yet logged in or
  // creates a new project if this user already has an account
  // and is logged in
  const handleRegister = () => {
    // is the user logged in?
    if (user.id) {
      console.log("the user is logged in");
      // this will create a new project with the selected features
      // and then move the buyer to the buyercomparequotes screen
      dispatch({
        type: "ADD_NEW_PROJECT",
        payload: {
          buyer_id: user.buyers_id,
          features: selectedFeatures,
          history,
        },
      });
    } else {
      history.push("/BuyerRegistration");
    }
  };
  console.log("Selected feature IDs are: ", selectedFeatureIDs);
  console.log("Quoting agency IDs are: ", quotingAgencyIDs);
  console.log("Agency quote data is:", quoteData);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box>
          <Typography sx={{ m: 4, mt: 5 }} variant="h4">
            Review your project
          </Typography>
          {quoteData.length > 0 && (
            <OptionsList
              features={selectedFeatures}
              listType={"buyer-review"}
              quoteData={quoteData}
              quotingAgencies={quotingAgencies}
              totalCost={totalCost}
            />
          )}
          {quoteData.length === 0 && (
            <Typography variant="h6" sx={{ m : 4 }}>
              Sorry, no agencies can provide all of your selected features.
            </Typography>
          )}
          {categoryQuotes.length > 0 &&
            quoteData.length > 0 &&
            quotingAgencies.length > 0 && (
              <Typography variant="h6" sx={{ m: 4 }}>
                Cost range for {categoryName} group:{" "}
                {totalCost(categoryQuotes, quotingAgencies)}
              </Typography>
            )}
          {quoteData.length > 0 && quotingAgencies.length > 0 && (
            <Typography variant="h6" sx={{ m: 4 }}>
              Cost range for project: {totalCost(quoteData, quotingAgencies)}
            </Typography>
          )}
          <Box sx={{ m: 2 }}>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              onClick={handleFeatureChange}
            >
              Change Features
            </Button>
            {/* Conditionally render this button; if the user is logged in */}
            {/* it means that this is not the first project they are starting */}
            {quotingAgencies.length > 0 && (
              <Button
                sx={{ m: 2 }}
                variant="contained"
                onClick={handleRegister}
              >
                {user.id ? "View quotes" : "Register to view quotes"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default BuyerReviewSelection;
