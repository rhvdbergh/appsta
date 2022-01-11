import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

// this component serves to help the agency
// update the agency conversion settings
function AgencyConversionSettings({ user }) {
  // initialize the dispatch variable
  const dispatch = useDispatch();

  // retrieve data from the redux store
  const conversionData = useSelector((store) => store.agencyConversion);

  // local state to control snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // when input is filled out, set the state of the reducer
  // data expects a string with the property name to set on the reducer
  const handleChange = (data, value) => {
    dispatch({
      type: 'ADJUST_AGENCY_CONVERSION',
      payload: { ...conversionData, [data]: parseInt(value) },
    });
  };

  // update the db with the latest conversion settings data
  const handleUpdate = () => {
    dispatch({
      type: 'UPDATE_AGENCY_CONVERSION',
      payload: {
        agencyID: user.agency_id,
        conversionData: conversionData,
      },
    });
    // provide feedback to user that the settings have been updated
    setSnackbarOpen(true);
  };

  // on page load, make sure that this agency's conversion rates
  // are set on the reducer
  useEffect(() => {
    dispatch({ type: 'GET_AGENCY_CONVERSION', payload: user.agency_id });
  }, []);

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h5" sx={{ my: 3 }}>
        Update Your T-Shirt Size Estimation Settings
      </Typography>
      <Box align="center" sx={{ my: 2 }}>
        <TextField
          sx={{ m: 1 }}
          label="Hours for XS T-Shirt Size"
          variant="outlined"
          value={conversionData.xsmall_hours || ''}
          onChange={(event) => {
            handleChange('xsmall_hours', event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label="Hours for S T-Shirt Size"
          variant="outlined"
          value={conversionData.small_hours || ''}
          onChange={(event) => {
            handleChange('small_hours', event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label="Hours for M T-Shirt Size"
          variant="outlined"
          value={conversionData.medium_hours || ''}
          onChange={(event) => {
            handleChange('medium_hours', event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label="Hours for L T-Shirt Size"
          variant="outlined"
          value={conversionData.large_hours || ''}
          onChange={(event) => {
            handleChange('large_hours', event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label="Hours for XL T-Shirt Size"
          variant="outlined"
          value={conversionData.xlarge_hours || ''}
          onChange={(event) => {
            handleChange('xlarge_hours', event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label="Hourly Rate"
          variant="outlined"
          value={conversionData.hourly_rate || ''}
          onChange={(event) => {
            handleChange('hourly_rate', event.target.value);
          }}
        />
      </Box>
      <Typography sx={{ my: 3 }}>
        <Button variant="contained" onClick={handleUpdate}>
          Update Estimation Settings
        </Button>
      </Typography>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Estimation settings updated!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AgencyConversionSettings;
