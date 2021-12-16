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

function* featureSaga(){
    yield takeLatest('GET_FEATURES', getFeatures);
}

export default featureSaga;