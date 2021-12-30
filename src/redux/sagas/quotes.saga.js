import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Get agencies that can satisfy the buyer's feature list
// payload is expected to be an array of feature ID's from
// the buyer's selected features
function* getQuotingAgencies(action) {
  try {
    const response = yield axios.post(
      'api/quotes/findagencies',
      action.payload
    );
    yield put({ type: 'SET_QUOTING_AGENCIES', payload: response.data });
  } catch (error) {
    console.log('error in getting quoting agencies', error);
    yield put({ type: 'GET_QUOTING_AGENCIES_ERROR' });
  }
}

// Get agency feature data for a given buyer quote.
// payload is expected to be an object including an array of agency ID's
// and the array of feature ID's corresponding to the buyer's
// selected features
function* getAgencyQuoteData(action) {
  try {
    const response = yield axios.get('api/quotes/agencyquote', action.payload);
    yield put({ type: 'SET_AGENCY_QUOTE_DATA', payload: response.data });
  } catch (error) {
    console.log('error in get agency quote data', error);
    yield put({ type: 'GET_AGENCY_QUOTE_DATA_ERROR' });
  }
}

// Get all the details of a list of agencies
// payload is expected to be an array of agency id's
function* getQuotingAgenciesDetails(action) {
  try {
    const response = yield axios.get('api/agency/list', action.payload);
    yield put({ type: 'SET_QUOTING_AGENCIES_DETAILS', payload: response.data });
  } catch (error) {
    console.log('error in getting quoting agencies details', error);
    yield put({ type: 'GET_QUOTING_AGENCIES_DETAILS_ERROR' });
  }
}

// generator function for all quote-related Saga requests
function* quotesSaga() {
  yield takeLatest('GET_QUOTING_AGENCIES', getQuotingAgencies);
  yield takeLatest('GET_AGENCY_QUOTE_DATA', getAgencyQuoteData);
  yield takeLatest('GET_QUOTING_AGENCIES_DETAILS', getQuotingAgenciesDetails);
}

export default quotesSaga;
