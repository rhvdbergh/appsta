import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Get agency conversion data for a given agency ID from the DB
// expected payload is the agency id
function* getAgencyConversion(action) {
  try {
    const response = yield axios.get(`api/conversion/${action.payload}`);
    yield put({ type: 'SET_AGENCY_CONVERSION', payload: response.data });
  } catch (error) {
    console.log('error in getting agency conversion', error);
    yield put({ type: 'GET_AGENCY_CONVERSION_ERROR' });
  }
}

// Create function to update agency conversion info to the DB
// expected payload is the agency id as agencyID and
// the new conversionData info
function* updateAgencyConversion(action) {
  try {
    yield axios.put(
      `api/conversion/${action.payload.agencyID}`,
      action.payload.conversionData
    );
  } catch (error) {
    console.log('error in updating agency conversion', error);
    yield put({ type: 'UPDATE_AGENCY_CONVERSION_ERROR' });
  }
}

function* agencyConversionSaga() {
  yield takeLatest('GET_AGENCY_CONVERSION', getAgencyConversion);
  yield takeLatest('UPDATE_AGENCY_CONVERSION', updateAgencyConversion);
}

export default agencyConversionSaga;
