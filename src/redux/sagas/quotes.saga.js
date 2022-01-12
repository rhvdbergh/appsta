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
    const response = yield axios.post('api/quotes/agencyquote', action.payload);
    yield put({ type: 'SET_AGENCY_QUOTE_DATA', payload: response.data });
  } catch (error) {
    console.log('error in get agency quote data', error);
    yield put({ type: 'GET_AGENCY_QUOTE_DATA_ERROR' });
  }
}

// gets the latest project saved by this user and
// sets this as the active project
// the expected payload is the buyer's id
function* getLatestProject(action) {
  try {
    const response = yield axios.get(`/api/quotes/project/${action.payload}`);
    yield put({ type: 'SET_ACTIVE_PROJECT', payload: response.data.id });
  } catch (error) {
    console.log('error in get latest project', error);
    yield put({ type: 'GET_LATEST_PROJECT_ERROR' });
  }
}

// Get agencies that have been saved by the user
// payload is expected to be the active project id
function* getSavedQuotingAgencies(action) {
  try {
    const response = yield axios.get(
      `api/quotes/savedagencies/${action.payload}`
    );
    // we set the quoting agencies
    yield put({ type: 'SET_QUOTING_AGENCIES', payload: response.data });
  } catch (error) {
    console.log('error in getting saved quoting agencies', error);
    yield put({ type: 'GET_SAVED_QUOTING_AGENCIES_ERROR' });
  }
}

// gets a list of selected agencies associated with a project
// expected payload is the active project id
// this is the same as getSavedQuotingAgencies BUT saves to a different
// reducer
function* getProjectAgencies(action) {
  try {
    const response = yield axios.get(
      `api/quotes/savedagencies/${action.payload}`
    );
    // we set the quoting agencies
    yield put({ type: 'SET_PROJECT_AGENCIES', payload: response.data });
  } catch (error) {
    console.log('error in getting saved project agencies', error);
    yield put({ type: 'GET_PROJECT_AGENCIES_ERROR' });
  }
}

// removes an agency from a project's project_agency table
// expected payload is an object with two properties, activeProject and agency_id
function* deleteProjectAgency(action) {
  try {
    yield axios.delete(
      `/api/quotes/project/${action.payload.activeProject}/${action.payload.agency_id}`
    );
    yield put({
      type: 'GET_PROJECT_AGENCIES',
      payload: action.payload.activeProject,
    });
  } catch (error) {
    console.log('error in delete project agency saga', error);
    yield put({ type: 'DELETE_PROJECT_AGENCY_ERROR' });
  }
}

// adds a specific agency to the saved list of a project
// expected payload is an object with two properties,
// activeProject and agency_id
function* addProjectAgency(action) {
  try {
    yield axios.post(
      `/api/quotes/project/${action.payload.activeProject}/${action.payload.agency_id}`
    );
    yield put({
      type: 'GET_PROJECT_AGENCIES',
      payload: action.payload.activeProject,
    });
  } catch (error) {
    console.log('error in adding the project agency saga', error);
    yield put({ type: 'ADD_PROJECT_AGENCY_ERROR' });
  }
}

// generator function for all quote-related Saga requests
function* quotesSaga() {
  yield takeLatest('GET_QUOTING_AGENCIES', getQuotingAgencies);
  yield takeLatest('GET_AGENCY_QUOTE_DATA', getAgencyQuoteData);
  yield takeLatest('GET_LATEST_PROJECT', getLatestProject);
  yield takeLatest('GET_SAVED_QUOTING_AGENCIES', getSavedQuotingAgencies);
  yield takeLatest('GET_PROJECT_AGENCIES', getProjectAgencies);
  yield takeLatest('DELETE_PROJECT_AGENCY', deleteProjectAgency);
  yield takeLatest('ADD_PROJECT_AGENCY', addProjectAgency);
}

export default quotesSaga;
