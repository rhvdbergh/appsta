import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, Fragment } from 'react';
import AgencyRegistrationForm1 from '../AgencyRegistrationForm1/AgencyRegistrationForm1';
import AgencyRegistrationForm2 from '../AgencyRegistrationForm2/AgencyRegistrationForm2';
import AgencyRegistrationForm3 from '../AgencyRegistrationForm3/AgencyRegistrationForm3';
import AgencyRegistrationForm4 from '../AgencyRegistrationForm4/AgencyRegistrationForm4';

function AgencyRegistration() {
  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  const [activeStep, setActiveStep] = useState(0);

  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleRender = () => {
    switch (activeStep) {
      case 0:
        return <AgencyRegistrationForm1 />;
      case 1:
        return <AgencyRegistrationForm2 />;
      case 2:
        return <AgencyRegistrationForm3 />;
      case 3:
        return <AgencyRegistrationForm4 />;
    }
  };

  return (
    <>
      <h1> Agency Registration Page </h1>
      <p> Will add more over time. Placeholder for now </p>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
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
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {/* handleRender conditionally renders the form */}
            {handleRender()}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>
    </>
  );
}

export default AgencyRegistration;
