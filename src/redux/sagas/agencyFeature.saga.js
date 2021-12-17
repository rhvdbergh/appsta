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

function* agencyFeatureSaga() {
  yield takeLatest('GET_AGENCY_FEATURES', getAgencyFeatures);
}

export default agencyFeatureSaga;
