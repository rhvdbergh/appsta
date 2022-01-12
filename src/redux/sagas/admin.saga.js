import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// posts a new feature to the db
// expected payload is the new feature object
function* postNewFeature(action) {
  try {
    yield axios.post('/api/admin/newFeature', action.payload);
    yield put({ type: 'GET_FEATURES' });
  } catch (error) {
    console.log('error in postNewFeatures', error);
  }
}

// deletes a feature from the db
// expected payload is the id of the feature to delete
function* deleteFeature(action) {
  try {
    yield axios.delete(`/api/admin/${action.payload}`);
    yield put({ type: 'GET_FEATURES' });
  } catch (error) {
    console.log('error in delete features route', error);
  }
}

// edits an existing feature in the database
// expected payload is the id of the feature to edit
function* editFeature(action) {
  try {
    yield axios.put(`/api/admin/edit/${action.payload}`);
    yield put({ type: 'GET_FEATURES' });
  } catch (error) {
    console.log('error in delete features route', error);
  }
}

function* adminSaga() {
  yield takeLatest('POST_NEW_FEATURE', postNewFeature);
  yield takeLatest('DELETE_FEATURE', deleteFeature);
  yield takeLatest('EDIT_FEATURE', editFeature);
}

export default adminSaga;
