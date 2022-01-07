import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* postNewFeature(action) {
    console.log('payload', action.payload);
    try {
        yield action.post('/api/newFeature', action.payload);

        yield put({ type: 'SET_AGENCY_FEATURES', payload: action.payload });
    } catch (error) {
        console.log('error in postNewFeatures', error);
    }
}

function* adminSaga() {
    yield takeLatest('POST_NEW_FEATURE', postNewFeature)
}

export default adminSaga;