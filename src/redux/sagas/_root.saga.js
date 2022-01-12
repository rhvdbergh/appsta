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
import adminSaga from './admin.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in the redux store as rootSaga (and sent to index.js)

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
    adminSaga(),
    agencyConversionSaga(),
    projectsSaga(),
  ]);
}
