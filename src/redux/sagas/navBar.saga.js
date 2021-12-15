import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCategory() {
    try {
        const response = yield axios.get('/api/category');
        console.log('categories from database', response);
        yield put ({type:'SET_CATEGORIES'})
    } catch (error) {
        yield put({ type: 'GET_CATEGORY_ERROR' })
    }
}

function* navBarSaga() {
    yield takeLatest('FETCH_CATEGORY', fetchCategory);
}


export default navBarSaga;
