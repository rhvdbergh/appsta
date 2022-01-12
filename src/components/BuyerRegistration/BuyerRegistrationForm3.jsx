import { TextField, Grid, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

// this component displays on the BuyerRegistration main view
// setCanMoveForward requires validation to move to the next form
function BuyerRegistrationForm3({ setCanMoveForward }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the buyer object from the redux store
  // this is the buyer object that will be submitted to the database
  // each successive "step" on the BuyerRegistration page fills
  // out more details of this object
  const buyer = useSelector((store) => store.newBuyer);

  // define local state to capture user input
  const [project_name, setProject_name] = useState(null);
  const [company_name, setCompany_name] = useState(null);
  const [city, setCity] = useState(null);
  const [postal_code, setPostal_code] = useState(null);

  // on page load, set the local state to what has been previously
  // entered in the buyer object if the new agency user is returning
  useEffect(() => {
    setProject_name(buyer.project_name);
    setCompany_name(buyer.company_name);
    setCity(buyer.city);
    setPostal_code(buyer.postal_code);
  }, []);

  // when any required fields change, check to see if the user can proceed
  useEffect(() => {
    isCompletedForm();
  }, [city, postal_code, project_name, company_name]);

  // validate that required form fields are filled out
  const isCompletedForm = () => {
    // only move forward if the required fields of city and postal code have non-null, non-empty content
    if (city !== null && postal_code !== null && project_name !== null) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

  // add data to the redux store
  // data expects a string with the property to set on the newBuyer reducer
  const handleData = (data, value) => {
    // check to see that the data field is not empty
    if (data !== '') {
      dispatch({
        type: 'SET_NEW_BUYER',
        payload: { ...buyer, [data]: value },
      });
    }
  };

  const handleDemo = () => {
    setProject_name("Start-up");
    setCompany_name("...");
    setCity("Minneapolis");
    setPostal_code("55409");
  }

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <p onClick={handleDemo}>*</p>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* onBlur captures the information as soon as the user moves */}
        {/* out of the field */}
        <TextField
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
          label="Company Name"
          value={company_name}
          variant="outlined"
          onChange={(event) => setCompany_name(event.target.value)}
          onBlur={() => {
            handleData('company_name', company_name);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
          label="Project Name*"
          value={project_name}
          variant="outlined"
          onChange={(event) => setProject_name(event.target.value)}
          onBlur={() => {
            handleData('project_name', project_name);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
          label="City*"
          value={city}
          variant="outlined"
          onChange={(event) => setCity(event.target.value)}
          onBlur={() => {
            handleData('city', city);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: '60%', maxWidth: '350px', my: 2 }}
          label="Zip Code*"
          value={postal_code}
          variant="outlined"
          onChange={(event) => setPostal_code(event.target.value)}
          onBlur={() => {
            handleData('postal_code', postal_code);
          }}
        />
      </Box>
    </Grid>
  );
}

export default BuyerRegistrationForm3;
