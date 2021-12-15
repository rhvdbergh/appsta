import { axios } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Create function to POST new agency to db
function* postNewAgency(action) {
  console.log('received payload in postNewAgency', action.payload);
  try {
    yield axios.post('/api/agency/new', action.payload);
  } catch (error) {
    console.log('error in post new agency', error);
    yield put({ type: 'POST_AGENCY_ERROR' });
  }
}

function* agencySaga() {
  yield takeLatest('ADD_NEW_AGENCY', postNewAgency);
}

export default agencySaga;
