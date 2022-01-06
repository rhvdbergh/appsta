import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import newAgency from './agency.reducer';
import features from './feature.reducer';
import category from './category.reducer';
import selectedCategory from './selectedCategory.reducer';
import selectedFeatures from './selectedFeatures.reducer';

import newBuyer from './buyer.reducer';
import agencyFeatures from './agencyFeature.reducer';
import quotingAgencies from './quotingAgencies.reducer';
import agencyQuoteData from './agencyQuoteData.reducer';
import projectFeatures from './projectFeature.reducer';
import activeProject from './activeProject.reducer';
import projectAgencies from './projectAgencies.reducer';
import agencyConversion from './agencyConversion.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  features,
  newAgency, // will store the registration info for a new agency
  category, // will store the array of categories currently in DB
  selectedCategory, // will store the category clicked on the Navbar
  selectedFeatures, // will store the selected features when the user clicks the Submit Quote button without being logged in
  newBuyer, //will store the registration info for a new buyer
  selectedFeatures, // will store the selected features when
  agencyFeatures, // will store features that an agency offers
  quotingAgencies, // will store agencies that qualify for a buyer's feature needs
  agencyQuoteData, // will store data to build an agency quote
  projectFeatures, // will store the features associated with a buyer's project
  activeProject, // stores the active project id
  projectAgencies, // stores the agencies associated with a project id
  agencyConversion, // stores agency conversion pricing data for the logged in agency user
});

export default rootReducer;
