import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postNewBuyer(action) {
    console.log('received payload in post new buyer', action.payload)
    try {
        // we're receiving the project id
        const response = yield axios.post('/api/buyer/new', action.payload);
        yield console.log('the returned project id is', response.data.id)
    } catch (error) {
        console.log('error in post new buyer', error);
        yield put({ type: 'POST_BUYER_ERROR' });
    }
}
function* buyerSaga() {
    yield takeLatest('ADD_NEW_BUYER', postNewBuyer);
}
export default buyerSaga;