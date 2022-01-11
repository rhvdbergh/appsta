//import MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//import React
import { useState, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//import custom components
import BuyerRegistrationForm1 from './BuyerRegistrationForm1';
import BuyerRegistrationForm2 from './BuyerRegistrationForm2';
import BuyerRegistrationForm3 from './BuyerRegistrationForm3';

// this component is the main view for buyer registration
// it contains a stepper; each step is a different
// registration form that builds out the buyer object
// to be saved in the database
function BuyerRegistration() {
  const buyer = useSelector((store) => store.newBuyer);

  // grab the list of features from the store
  const features = useSelector((store) => store.features);

  // build the selectedFeatures from local storage
  // this will be sent along with the buyer's information
  // to save a project with its features in the database
  const selectedFeatures = [];
  features
    // filter through features and check if it is in localStorage
    .filter((feature) => localStorage.getItem(`feature_${feature.id}`) !== null)
    // retrieve all those in localStorage and add them to selectedFeatures array
    // this includes the quantity
    // localStorage can't save objects, so we need to parse
    // the string to make it an object
    .forEach((feature) =>
      selectedFeatures.push(
        JSON.parse(localStorage.getItem(`feature_${feature.id}`))
      )
    );

  // build an array of steps, containing the step names
  // the length of this array helps determine where
  // the user is at
  const steps = ['Step 1', 'Step 2', 'Step 3'];

  // local state for keeping track of where the user is
  // and whether the user's input has been validated (and can move forward)
  const [activeStep, setActiveStep] = useState(0);
  const [canMoveForward, setCanMoveForward] = useState(false);

  // set up the redux dispatch
  const dispatch = useDispatch();

  // set up the history hook to navigate
  const history = useHistory();

  const handleBack = () => {
    // if we're at the first page, send the user back to the
    // LandingPage
    if (activeStep === 0) {
      history.push('/LandingPage');
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // this will only be used if there was an error
  // and the user was not registered
  const handleReset = () => {
    setActiveStep(0);
  };

  //on button click
  const handleNext = () => {
    if (canMoveForward && activeStep === steps.length - 1) {
      dispatch({
        type: 'ADD_NEW_BUYER',
        payload: {
          buyer: buyer,
          project_features: selectedFeatures,
          history: history,
        },
      });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // this function returns the component
  // that corresponds to the active step
  // that the stepper is on
  // setCanMoveForward is passed down so the
  // component can validate the input and declare
  // whether the user can move forward
  const handleRender = () => {
    switch (activeStep) {
      case 0:
        return <BuyerRegistrationForm1 setCanMoveForward={setCanMoveForward} />;
      case 1:
        return <BuyerRegistrationForm2 setCanMoveForward={setCanMoveForward} />;
      case 2:
        return <BuyerRegistrationForm3 setCanMoveForward={setCanMoveForward} />;
    }
  };

  // on page load, refresh the features
  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
  }, []);

  return (
    <Container sx={{ width: '40%' }}>
      <Typography variant="h3" sx={{ my: 3, textAlign: 'center' }}>
        Appsta Registration
      </Typography>
      <Box sx={{ width: '100%' }}>
        {/* The stepper determines which of the steps the user is on */}
        {/* and displays the corresponding component */}
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Typography variant="h6" sx={{ my: 5, textAlign: 'center' }}>
          Please complete all fields marked with * to continue.
        </Typography>
        <Box>
          {/* Conditionally render whether components should show or reset button */}
          {activeStep === steps.length ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset} variant="containted">
                  Reset
                </Button>
              </Box>
            </Fragment>
          ) : (
            <Fragment>
              <Box sx={{ minHeight: '45vh' }}>
                {/* handleRender conditionally renders the form */}
                {handleRender()}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  pt: 5,
                }}
              >
                {/* Buttons move user backward; color, msg determined by user's step position */}
                <Button
                  color={activeStep === 0 ? 'error' : 'primary'}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  {activeStep === 0 ? 'Cancel' : 'Back'}
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {/* Button only displays if validation succeeds */}
                {/* validation is done on the registration component itself */}
                {/* On the last step, this shows submit instead of next */}
                {canMoveForward && (
                  <Button onClick={handleNext} variant="contained">
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                )}
              </Box>
            </Fragment>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default BuyerRegistration;
