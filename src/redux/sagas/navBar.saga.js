import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetches and refreshes the category list
function* fetchCategory() {
  try {
    const response = yield axios.get('/api/category');
    yield put({ type: 'SET_CATEGORIES', payload: response.data });
  } catch (error) {
    yield put({ type: 'GET_CATEGORY_ERROR' });
  }
}

function* navBarSaga() {
  yield takeLatest('FETCH_CATEGORY', fetchCategory);
}

export default navBarSaga;
