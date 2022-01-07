import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* postNewFeature(action) {
    console.log('payload', action.payload);
    try {
        yield axios.post('/api/features/newFeature', action.payload);
        yield put({ type: 'SET_AGENCY_FEATURES', payload: action.payload });
    } catch (error) {
        console.log('error in postNewFeatures', error);
    }
}

function* deleteFeature(action){
    console.log('this is the id of the feature to delete', action.payload)
    try{
        yield axios.delete('/api/features', action.payload)
    }catch(error) {
        console.log('error in delete features route', error)
    }
}

function* adminSaga() {
    yield takeLatest('POST_NEW_FEATURE', postNewFeature)
    yield takeLatest('DELETE_FEATURE', deleteFeature)
}

export default adminSaga;