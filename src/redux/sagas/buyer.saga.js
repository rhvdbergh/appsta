import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postNewBuyer(action) {
    console.log('received payload in postNewAgency', action.payload)
    try {
        yield axios.post('/api/buyer/new', action.payload);
    } catch (error) {
        console.log('error in post new buyer', error);
        yield put({ type: 'POST_BUYER_ERROR' });
    }
}
function* buyerSaga() {
    yield takeLatest('ADD_NEW_BUYER', postNewBuyer);
}
export default buyerSaga;