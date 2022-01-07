import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';


function* postNewFeature(action) {
    console.log('payload', action.payload);
    try {
        yield axios.post('/api/admin/newFeature', action.payload);
        yield put({ type: 'GET_FEATURES' });
    } catch (error) {
        console.log('error in postNewFeatures', error);
    }
}

function* deleteFeature(action) {
    console.log('this is the id of the feature to delete', action.payload)
    try {
        yield axios.delete(`/api/admin/${action.payload}`)
        yield put({ type: 'GET_FEATURES' });

    } catch (error) {
        console.log('error in delete features route', error)
    }
}

function* editFeature(action) {
    console.log('this is the id of the feature to edit', action.payload)
    try {
        yield axios.put(`/api/admin/edit/${action.payload}`)
        yield put({ type: 'GET_FEATURES' });

    } catch (error) {
        console.log('error in delete features route', error)
    }
}

function* adminSaga() {
    yield takeLatest('POST_NEW_FEATURE', postNewFeature)
    yield takeLatest('DELETE_FEATURE', deleteFeature)
    yield takeLatest('EDIT_FEATURE', editFeature)
}

export default adminSaga;