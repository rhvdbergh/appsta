import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Create function to POST new agency to db
function* postNewAgency(action) {
  console.log('received payload in postNewAgency', action.payload);
  try {
    yield axios.post('/api/agency/new', action.payload);
    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
    // clear the local storage, since the agency has successfully registered
    localStorage.clear();
  } catch (error) {
    console.log('error in post new agency', error);
    yield put({ type: 'POST_AGENCY_ERROR' });
  }
}

// Generator function to PUT agency info to the DB
function* updateAgencyInformation(action) {
  console.log(
    'this is updated information from dashboard',
    action.payload.agencyID
  );
  try {
    yield axios.put(
      `api/agency/${action.payload.agencyID}`,
      action.payload.agency
    );
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('error in agency information update', error);
    yield put({ type: 'UPDATE_AGENCY_ERROR' });
  }
}

function* agencySaga() {
  yield takeLatest('ADD_NEW_AGENCY', postNewAgency);
  yield takeLatest('UPDATE_AGENCY_INFORMATION', updateAgencyInformation);
}

export default agencySaga;
