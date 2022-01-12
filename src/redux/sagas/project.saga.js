import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// adds a new project to the database with features
// payload consists of an object with buyer_id, features, and history
function* addNewProject(action) {
  try {
    const response = yield axios.post('api/buyer/newproject', {
      buyer_id: action.payload.buyer_id,
      features: action.payload.features,
    });
    yield put({ type: 'SET_ACTIVE_PROJECT', payload: response.data.id });
    // the new project has successfully been saved
    // so push the user to the buyer compare quotes page
    yield action.payload.history.push('/BuyerCompareQuotes');
  } catch (err) {
    console.log('error in add new project saga', error);
    yield put({ type: 'ADD_NEW_PROJECT_ERROR' });
  }
}

// generator function for  project-related Saga requests
function* projectsSaga() {
  yield takeLatest('ADD_NEW_PROJECT', addNewProject);
}

export default projectsSaga;
