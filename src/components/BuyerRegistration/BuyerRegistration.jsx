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

//import form
import BuyerRegistrationForm1 from './BuyerRegistrationForm1';
import BuyerRegistrationForm2 from './BuyerRegistrationForm2';
import BuyerRegistrationForm3 from './BuyerRegistrationForm3';

function BuyerRegistration() {
  const buyer = useSelector((store) => store.newBuyer);

  // grab the list of features from the store
  const features = useSelector((store) => store.features);

  // build the selectedFeatures from local storage
  const selectedFeatures = [];
  features
    // filter through features and check if it is in localStorage
    .filter((feature) => localStorage.getItem(`feature_${feature.id}`) !== null)
    // retrieve all those in localStorage and add them to selectedFeatures array
    // this includes the quantity
    .forEach((feature) =>
      selectedFeatures.push(
        JSON.parse(localStorage.getItem(`feature_${feature.id}`))
      )
    );

  const steps = ['Step 1', 'Step 2', 'Step 3'];

  const [activeStep, setActiveStep] = useState(0);

  const [canMoveForward, setCanMoveForward] = useState(false);

  const [skipped, setSkipped] = useState(new Set());

  const dispatch = useDispatch();

  const history = useHistory();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    // if we're at the first page, send the user back to the
    // LandingPage
    if (activeStep === 0) {
      history.push('/LandingPage');
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //on button click
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
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

  useEffect(() => {
    dispatch({ type: 'GET_FEATURES' });
  }, []);

  return (
    <Container sx={{ width: '40%' }}>
      <Typography variant="h3" sx={{ my: 3, textAlign: 'center' }}>
        Appsta Registration
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
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
              <Box sx={{ minHeight: '50vh' }}>
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
                <Button
                  color={activeStep === 0 ? 'error' : 'primary'}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="contained"
                >
                  {activeStep === 0 ? 'Cancel' : 'Back'}
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
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
