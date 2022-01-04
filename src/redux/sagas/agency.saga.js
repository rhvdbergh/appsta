import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

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

// function* updateAgency(action) {
//   console.log('edit this agency', action.payload.id)
//   try {
//     yield axios.put(`api/agency/${action.payload.id}`, action.payload)

//   } catch (error) {
//     console.log('Error in Put', error)
//   }
// }

function* updateAgencyInformation(action) {
  console.log('this is updated information from dashboard', action.payload)
  try {
    yield axios.put('/', action.payload)
    yield put({ type: '' })
  } catch (error) {
    console.log('error in agency information update', error)
    yield put({ type: 'UPDATE_AGENCY_ERROR' })
  }
}


function* agencySaga() {
  yield takeLatest('ADD_NEW_AGENCY', postNewAgency);
  yield takeLatest('UPDATE_AGENCY_INFORMATION', updateAgencyInformation)
}

export default agencySaga;
