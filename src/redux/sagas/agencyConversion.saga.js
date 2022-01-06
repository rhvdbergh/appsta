import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Get agency conversion data for a given agency ID from the DB
function* getAgencyConversion(action) {
  try {
    console.log('In getAgencyConversion with ID:', action.payload);
    
    const response = yield axios.get(`api/conversion/${action.payload}`);
    yield put({ type: 'SET_AGENCY_CONVERSION', payload: response.data });
  } catch (error) {
    console.log('error in getting agency conversion', error);
    yield put({ type: 'GET_AGENCY_CONVERSION_ERROR' });    
  }
}

// Create function to update agency conversion info to the DB
function* updateAgencyConversion(action) {
  console.log('conversion data:', action.payload.conversionData);
  try {
    yield axios.put(
      `api/conversion/${action.payload.agencyID}`,
      action.payload.conversionData
    );
  } catch (error) {
    console.log('error in updating agency conversion', error);
    yield put({ type: 'UPDATE_AGENCY_CONVERSION_ERROR', })    
  }  
}

function* agencyConversionSaga() {
  yield takeLatest('GET_AGENCY_CONVERSION', getAgencyConversion);
  yield takeLatest('UPDATE_AGENCY_CONVERSION', updateAgencyConversion);
}

export default agencyConversionSaga;