//import MUI components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//import from components
import AgencyRegistrationForm1 from './AgencyRegistrationForm1';
import AgencyRegistrationForm2 from './AgencyRegistrationForm2';
import AgencyRegistrationForm3 from './AgencyRegistrationForm3';
import AgencyRegistrationForm4 from './AgencyRegistrationForm4';
import AgencyRegistrationForm5 from './AgencyRegistrationForm5';

//import react and redux
import { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// this component is the main view for agency registration
// it contains a stepper; each step is a different
// registration form that builds out the agency object
// to be saved in the database
function AgencyRegistration() {
  // build an array of steps, containing the step names
  // the length of this array helps determine where
  // the user is at
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  // local state for keeping track of where the user is
  // and whether the user's input has been validated (and can move forward)
  const [activeStep, setActiveStep] = useState(0);
  const [canMoveForward, setCanMoveForward] = useState(false);

  // set up the redux dispatch
  const dispatch = useDispatch();

  // set up the history hook to navigate
  const history = useHistory();

  // the newAgency object in the redux store
  // when everything is changed through the registration process,
  // we want to submit this object that we have built
  const agency = useSelector((store) => store.newAgency);

  const handleNext = () => {
    // check to see if we're on the last step and
    // everything on the last registration form has been
    // filled out
    // if so, do a dispatch of the agency object that we built
    if (canMoveForward && activeStep === steps.length - 1) {
      dispatch({ type: 'ADD_NEW_AGENCY', payload: agency });
      // move the user to the agency options page
      history.push('/AgencyOptionsPage');
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setCanMoveForward(false);
  };

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

  // this function returns the component
  // that corresponds to the active step
  // that the stepper is on
  // setCanMoveForward is passed down so the
  // component can validate the input and declare
  // whether the user can move forward
  const handleRender = () => {
    switch (activeStep) {
      case 0:
        return (
          <AgencyRegistrationForm1 setCanMoveForward={setCanMoveForward} />
        );
      case 1:
        return (
          <AgencyRegistrationForm2 setCanMoveForward={setCanMoveForward} />
        );
      case 2:
        return (
          <AgencyRegistrationForm3 setCanMoveForward={setCanMoveForward} />
        );
      case 3:
        return (
          <AgencyRegistrationForm4 setCanMoveForward={setCanMoveForward} />
        );
      case 4:
        return (
          <AgencyRegistrationForm5 setCanMoveForward={setCanMoveForward} />
        );
    }
  };

  return (
    <Container sx={{ width: '60%' }}>
      <Typography variant="h3" sx={{ my: 3, textAlign: 'center' }}>
        Agency Registration
      </Typography>

      <Box sx={{ width: '100%' }}>
        {/* The stepper determines which of the steps the user is on */}
        {/* and displays the corresponding component */}
        <Stepper activeStep={activeStep}>
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
        {/* Conditionally render whether components should show or reset button */}
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset} variant="contained">
                Reset
              </Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Box sx={{ minHeight: '52vh' }}>
              {/* handleRender conditionally renders the form */}
              {handleRender()}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {/* Buttons move user backward; color, msg determined by user's step position */}
              <Button
                color={activeStep === 0 ? 'error' : 'primary'}
                onClick={handleBack}
                sx={{ ml: '30%' }}
                variant="contained"
              >
                {activeStep === 0 ? 'Cancel' : 'Back'}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* Button only displays if validation succeeds */}
              {/* validation is done on the registration component itself */}
              {/* On the last step, this shows submit instead of next */}
              {canMoveForward && (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  sx={{ mr: '30%' }}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              )}
            </Box>
          </Fragment>
        )}
      </Box>
    </Container>
  );
}

export default AgencyRegistration;
