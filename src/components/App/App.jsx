import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import BuyerOptionsPage from '../BuyerOptionsPage/BuyerOptionsPage';
import AgencyLoginPage from '../AgencyLoginPage/AgencyLoginPage';
import AgencyRegistration from '../AgencyRegistration/AgencyRegistration';
import BuyerDashboard from '../BuyerDashboard/BuyerDashboard';
import AgencyDashboard from '../AgencyDashboard/AgencyDashboard';
import BuyerReviewSelection from '../BuyerReviewSelection/BuyerReviewSelection';
import AgencyOptionsPage from '../AgencyOptionsPage/AgencyOptionsPage';
import BuyerRegistration from '../BuyerRegistration/BuyerRegistration'

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/LandingPage */}
          <Redirect exact from="/" to="/LandingPage" />
          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute> */}
          {/* <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute> */}
          {/* <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the LandingPage
              <LandingPage />
            )}
          </Route> */}
          {/* <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route> */}



          <Route exact path="/LandingPage">
            {user.id && user.isBuyer ? (
              // If the user is already logged in,
              // and the user is a buyer,
              // redirect them to the /BuyerDashboard page
              <Redirect to="/BuyerDashboard" />
            ) : // but if they're an agency, to the agency page
              user.id && !user.isBuyer ? (
                <Redirect to="/AgencyDashboard" />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
          </Route>
          <Route exact path="/BuyerReview">
            <BuyerReviewSelection />
          </Route>
          {/* Adding a Buyer Options Route */}
          <Route exact path="/BuyerOptions">
            <BuyerOptionsPage />
          </Route>
          {/* Adding Buyer Registration Route */}
          <Route exact path='/BuyerRegistration'>
            <BuyerRegistration />
          </Route>
          {/* Adding router for Agency Login Page */}
          <Route exact path="/AgencyLogin">
            {user.id && !user.isBuyer ? (
              // If the user is already logged in,
              // and the user is an agency,
              // redirect them to the /AgencyDashboard page
              <Redirect to="/AgencyDashboard" />
            ) : (
              // Otherwise, show the AgencyLoginPage
              <AgencyLoginPage />
            )}
          </Route>
          {/* Adding Agency Registration */}
          <Route exact path="/AgencyReg">
            <AgencyRegistration />
          </Route>
          {/* Protected Buyer Dashboard Route */}
          <ProtectedRoute exact path="/BuyerDashboard">
            {user.isBuyer ? (
              <BuyerDashboard />
            ) : (
              <Redirect to="/AgencyDashboard" />
            )}
          </ProtectedRoute>
          {/* Protected Agency Dashboard Route */}
          <ProtectedRoute exact path="/AgencyDashboard">
            {!user.isBuyer ? (
              <AgencyDashboard />
            ) : (
              <Redirect to="/BuyerDashboard" />
            )}
          </ProtectedRoute>
        {/* adding AgencyOptionsPage Route */}
          <ProtectedRoute exact path="/AgencyOptionsPage">
            {!user.isBuyer ? (
              <AgencyOptionsPage />
            ) : (
              <Redirect to="/BuyerDashboard" />
            )}
          </ProtectedRoute> 


          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
