import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//Get features from the db 
function* getFeatures(action) {
    try {
        const response = yield axios.get('/api/features');
        yield put({ type: 'SET_FEATURES', payload: response.data });
    } catch (error) {
        console.log('error in get features', error);
        yield put({ type: 'GET_FEATURES_ERROR' });
    }
}

//Get project features from the db for this buyer
// expected payload is the buyer's id (note: not the user id!)
function* getProjectFeatures(action) {
    try {
        const response = yield axios.get(`/api/features/${action.payload}`);
        yield put({ type: 'SET_PROJECT_FEATURES', payload: response.data });
    } catch (error) {
        console.log('error in get project features', error);
        yield put({ type: 'GET_PROJECT_FEATURES_ERROR' });
    }
}

function* featureSaga(){
    yield takeLatest('GET_FEATURES', getFeatures);
    yield takeLatest('GET_PROJECT_FEATURES', getProjectFeatures)
}

export default featureSaga;