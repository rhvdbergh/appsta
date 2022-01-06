import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function AgencyConversionSettings(user) {
  // initialize the dispatch variable
  const dispatch = useDispatch();

  // grab the conversion data from the store
  const conversionData = useSelector((store) => store.agencyConversion);

  const handleData = (field, value) => {
    conversionData[field] = parseInt(value);
  }

  const handleUpdate = () => {
    dispatch({ 
      type: 'UPDATE_AGENCY_CONVERSION', 
      payload: {
        agencyID: user.user.agency_id,
        conversionData: conversionData
      }     
    });
  }
  
  useEffect(() => {
    dispatch({ type: 'GET_AGENCY_CONVERSION', payload: user.user.agency_id });
  }, []);
  
  console.log('User is: ', user);
  console.log('User ID is: ', user.user.agency_id);
  console.log('Conversion data is:', conversionData);
  return (
    <Box sx = {{my:2}}>
      <Typography type="h6" sx={{my:2}}>Update Your Estimate Data</Typography>
      <TextField
        sx={{m:1}}
        label="Hours for XS T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.xsmall_hours}
        onChange={(event) => handleData('xsmall_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for S T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.small_hours}
        onChange={(event) => handleData('small_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for M T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.medium_hours}
        onChange={(event) => handleData('medium_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for L T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.large_hours}
        onChange={(event) => handleData('large_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for XL T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.xlarge_hours}
        onChange={(event) => handleData('xlarge_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hourly Rate"
        variant="outlined"
        defaultValue={conversionData.hourly_rate}
        onChange={(event) => handleData('hourly_rate', event.target.value)}
      />
      <Button onClick={handleUpdate}>Update Data</Button>

    </Box>
    
  )
}

export default AgencyConversionSettings;
