import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import agencySaga from './agency.saga';
import featureSaga from './feature.saga';
import navBarSaga from './navBar.saga';
import agencyFeatureSaga from './agencyFeature.saga';
import buyerSaga from './buyer.saga';
import quotesSaga from './quotes.saga';
import agencyConversionSaga from './agencyConversion.saga';
import projectsSaga from './project.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    agencySaga(),
    featureSaga(),
    navBarSaga(),
    agencyFeatureSaga(),
    buyerSaga(),
    quotesSaga(),
    agencyConversionSaga(),
    projectsSaga(),
  ]);
}
