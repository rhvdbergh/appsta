import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BuyerRegistrationForm1 from '../BuyerRegistrationForm1/BuyerRegistrationForm1';
import BuyerRegistrationForm2 from '../BuyerRegistrationForm2/BuyerRegistrationForm2';
import BuyerRegistrationForm3 from '../BuyerRegistrationForm3/BuyerRegistrationForm3';

function BuyerRegistration() {

    const buyer = useSelector((store) => store.newBuyer);

    // grab the list of features from the store
    const features = useSelector((store) => store.features);

    // build the selectedFeatures from local storage
    const selectedFeatures = [];
    features
      // filter through features and check if it is in localStorage
      .filter(
        (feature) => localStorage.getItem(`feature_${feature.id}`) !== null
      )
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


    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        if (canMoveForward && activeStep === steps.length - 1) {
            dispatch({ type: 'ADD_NEW_BUYER', 
                        payload: 
                          {
                            buyer: buyer,
                            project_features: selectedFeatures,
                           }
                      })
            history.push('/BuyerCompareQuotes');
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleRender = () => {
        switch (activeStep) {
            case 0:
                return (
                    <BuyerRegistrationForm1 setCanMoveForward={setCanMoveForward} />
                );
            case 1:
                return (
                    <BuyerRegistrationForm2 setCanMoveForward={setCanMoveForward} />
                );
            case 2:
                return (
                    <BuyerRegistrationForm3 setCanMoveForward={setCanMoveForward} />
                );
        }
    };

    useEffect(() => {
      dispatch({ type: 'GET_FEATURES' });
    }, []);

    return (
        <>
            <h1>Buyer registration page!</h1>
            <p> Complete each required* field to move on to the next step.</p>
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
                            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                                {activeStep === 0 ? 'Cancel' : 'Back'}
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {canMoveForward && (
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            )}
                        </Box>
                    </Fragment>
                )}
            </Box>
        </>
    )
}

export default BuyerRegistration;