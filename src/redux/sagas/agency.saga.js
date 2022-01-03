import axios from 'axios';
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
//GET agency for dashboard 2.4
 function* fetchAgency(action){
   console.log('fetch agency by id', action.payload);
   try{
     const response = yield axios.get(`api/agency/${action.payload}`);
   }catch (error) {
     console.log('error in get agency', error);
     yield put ({ type: 'SET_INDIVIDUAL_AGENCY', payload: response.data});
   }
 }


function* agencySaga() {
  yield takeLatest('ADD_NEW_AGENCY', postNewAgency);
  yield takeLatest('FETCH_AGENCY', fetchAgency);
}

export default agencySaga;
