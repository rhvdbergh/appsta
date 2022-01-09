//
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

import Admin from '../Admin/Admin';
import AboutPage from '../AboutPage/AboutPage';
import LandingPage from '../LandingPage/LandingPage';
import BuyerOptionsPage from '../BuyerOptionsPage/BuyerOptionsPage';
import AgencyLoginPage from '../AgencyLoginPage/AgencyLoginPage';
import AgencyRegistration from '../AgencyRegistration/AgencyRegistration';
import BuyerDashboard from '../BuyerDashboard/BuyerDashboard';
import AgencyDashboard from '../AgencyDashboard/AgencyDashboard';
import BuyerReviewSelection from '../BuyerReviewSelection/BuyerReviewSelection';
import AgencyOptionsPage from '../AgencyOptionsPage/AgencyOptionsPage';
import BuyerRegistration from '../BuyerRegistration/BuyerRegistration';
import BuyerCompareQuotes from '../BuyerCompareQuotes/BuyerCompareQuotes';
import BuyerReviewFeatures from '../BuyerReviewFeatures/BuyerReviewFeatures';

//import MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9ccfca',
      light: '#efefeb',
      //dark is for NavBar
      dark: '#3e3880',
    },
    secondary: {
      main: '#9596d6',
      //light is for highlights/ shadows
      light: '#f5e580',
    },
    //error is DANGER
    error: {
      main: '#ff476c',
    },
    warning: {
      main: '#ffd666',
    },
    info: {
      main: '#e17183',
    },
    success: {
      main: '#76d58e',
    },
    text: {
      primary: '#000000',
      navbar: '#EEEED1',
      // disabled: '#efefeb',
    },
  },
});

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'GET_FEATURES' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
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

            <Route exact path="/LandingPage">
              {user.id && user.isBuyer ? (
                // If the user is already logged in,
                // and the user is a buyer,
                // redirect them to the /BuyerDashboard page
                <Redirect to="/BuyerDashboard" />
              ) : // but if they're an agency, to the agency page
              user.id && !user.isBuyer && !user.is_admin ? (
                <Redirect to="/AgencyDashboard" />
              ) : // if user is admin, to the admin page
              user.id && user.is_admin ? (
                <Redirect to="/Admin" />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
            </Route>
            <Route exact path="/BuyerReview">
              {user.is_admin ? (
                <Redirect to="/Admin" />
              ) : user.id && !user.isBuyer ? (
                <Redirect to="/LandingPage" />
              ) : (
                <BuyerReviewSelection />
              )}
            </Route>
            {/* This path is to display features associated with a saved project */}
            <ProtectedRoute exact path="/BuyerReviewFeatures">
              {user.is_admin ? (
                <Redirect to="/Admin" />
              ) : user.id && !user.isBuyer ? (
                <Redirect to="/LandingPage" />
              ) : (
                <BuyerReviewFeatures />
              )}
            </ProtectedRoute>
            {/* Adding a Buyer Options Route */}
            <Route exact path="/BuyerOptions">
              {user.is_admin ? (
                <Redirect to="/Admin" />
              ) : user.id && !user.isBuyer ? (
                <Redirect to="/LandingPage" />
              ) : (
                <BuyerOptionsPage />
              )}
            </Route>
            {/* Adding Buyer Registration Route */}
            <Route exact path="/BuyerRegistration">
              {user.is_admin ? (
                <Redirect to="/Admin" />
              ) : user.id ? (
                <Redirect to="/LandingPage" />
              ) : (
                <BuyerRegistration />
              )}
            </Route>
            {/* Adding router for Agency Login Page */}
            <Route exact path="/AgencyLogin">
              {user.id && !user.isBuyer && !user.isAdmin ? (
                // If the user is already logged in,
                // and the user is an agency,
                // redirect them to the /AgencyDashboard page
                <Redirect to="/AgencyDashboard" />
              ) : user.id && user.isBuyer ? (
                <Redirect to="BuyerDashboard" />
              ) : (
                // Otherwise, show the AgencyLoginPage
                <AgencyLoginPage />
              )}
            </Route>
            {/* Adding Agency Registration */}
            <Route exact path="/AgencyReg">
              {user.is_admin ? (
                <Redirect to="/Admin" />
              ) : user.id ? (
                <Redirect to="/LandingPage" />
              ) : (
                <AgencyRegistration />
              )}
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
              {!user.isBuyer && !user.is_admin ? (
                <AgencyDashboard />
              ) : user.is_admin ? (
                <Redirect to="/Admin" />
              ) : (
                <Redirect to="/BuyerDashboard" />
              )}
            </ProtectedRoute>
            {/* adding AgencyOptionsPage Route */}
            <ProtectedRoute exact path="/AgencyOptionsPage">
              {!user.is_admin && !user.isBuyer ? (
                <AgencyOptionsPage />
              ) : user.is_admin ? (
                <Redirect to="/Admin" />
              ) : (
                <Redirect to="/BuyerDashboard" />
              )}
            </ProtectedRoute>
            {/* adding BuyerCompareQuotes Route */}
            <ProtectedRoute exact path="/BuyerCompareQuotes">
              {user.isBuyer ? (
                <BuyerCompareQuotes />
              ) : !user.is_admin ? (
                <Redirect to="/AgencyDashboard" />
              ) : (
                <Redirect to="/Admin" />
              )}
            </ProtectedRoute>

            {/* Adding in an Admin Route  */}
            <ProtectedRoute exact path="/Admin">
              {user.is_admin ? <Admin /> : <Redirect to="/LandingPage" />}
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
