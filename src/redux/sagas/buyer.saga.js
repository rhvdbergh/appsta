import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postNewBuyer(action) {
  console.log('received payload in post new buyer', action.payload);
  try {
    // we're receiving the project id
    const response = yield axios.post('/api/buyer/new', action.payload);

    console.log('push to compare quotes ', action.payload);
    
    yield put({ type: 'SET_ACTIVE_PROJECT', payload: response.data.id });
    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload.buyer });
    yield action.payload.history.push('/BuyerCompareQuotes');
    
  } catch (error) {
    console.log('error in post new buyer', error);
    yield put({ type: 'POST_BUYER_ERROR' });
  }
}

function* buyerSaga() {
  yield takeLatest('ADD_NEW_BUYER', postNewBuyer);
}
export default buyerSaga;
