import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Get features from the db
function* getAgencyFeatures(action) {
  try {
    const response = yield axios.get('/api/agency/features');
    yield put({ type: 'SET_AGENCY_FEATURES', payload: response.data });
  } catch (error) {
    console.log('error in get agency features', error);
    yield put({ type: 'GET_AGENCY_FEATURES_ERROR' });
  }
}

// add a single agency_feature
// as payload we expect a new feature and
// the logged in user's agency_id
function* addAgencyFeature(action) {
  try {
    yield axios.post('/api/agency/feature', action.payload);
    yield put({ type: 'GET_AGENCY_FEATURES' });
  } catch (error) {
    console.log('error in add agency features', error);
    yield put({ type: 'ADD_AGENCY_FEATURES_ERROR' });
  }
}

// updates an agency_feature that was previously saved in the db
// as payload we expect the savedFeature
function* updateAgencyFeature(action) {
  try {
    yield axios.put('/api/agency/feature', action.payload);
    yield put({ type: 'GET_AGENCY_FEATURES' });
  } catch (error) {
    console.log('error in add agency features', error);
    yield put({ type: 'UPDATE_AGENCY_FEATURES_ERROR' });
  }
}

function* agencyFeatureSaga() {
  yield takeLatest('GET_AGENCY_FEATURES', getAgencyFeatures);
  yield takeLatest('ADD_AGENCY_FEATURE', addAgencyFeature);
  yield takeLatest('UPDATE_AGENCY_FEATURE', updateAgencyFeature);
}

export default agencyFeatureSaga;
