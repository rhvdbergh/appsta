import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* postNewFeature (action){
console.log('payload', action.payload );

}

function* adminSaga () {
    yield takeLatest('POST_NEW_FEATURE', postNewFeature)
}

export default adminSaga;