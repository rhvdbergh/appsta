import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// creates a new buyer in the db
// expected payload is an object with the new buyer's info
function* postNewBuyer(action) {
  try {
    // we're receiving the project id
    const response = yield axios.post('/api/buyer/new', action.payload);
    // update the active project, since there is an existing project now
    yield put({ type: 'SET_ACTIVE_PROJECT', payload: response.data.id });
    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload.buyer });
    // send the user to the compare quotes page
    yield action.payload.history.push('/BuyerCompareQuotes');
    // clear the local storage, since the buyer has successfully registered
    yield localStorage.clear();
  } catch (error) {
    console.log('error in post new buyer', error);
    yield put({ type: 'POST_BUYER_ERROR' });
  }
}

function* buyerSaga() {
  yield takeLatest('ADD_NEW_BUYER', postNewBuyer);
}
export default buyerSaga;
