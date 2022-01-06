import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';



function AgencyConversionSettings(user) {
  // initialize the dispatch variable
  const dispatch = useDispatch();

  // grab the conversion data from the store
  const conversionData = useSelector((store) => store.agencyConversion);
  
  
  useEffect(() => {
    dispatch({ type: 'GET_AGENCY_CONVERSION', payload: user.user.agency_id });
  }, []);
  
  console.log('User is: ', user);
  console.log('User ID is: ', user.user.agency_id);
  console.log('Conversion data is:', conversionData);
  return (
    <Box sx = {{my:2}}>
      <Typography type="h6" sx={{my:2}}>Set Your Estimate Parameters</Typography>
      <TextField
        label="Hours for XS T-Shirt Size"
        variant="outlined"
        value={conversionData.xsmall_hours}
        onChange={(event) => setTeam_size(event.target.value)}
      />
      <TextField
        label="Hours for S T-Shirt Size"
        variant="outlined"
        value={conversionData.small_hours}
        onChange={(event) => setTeam_size(event.target.value)}
      />
      <TextField
        label="Hours for M T-Shirt Size"
        variant="outlined"
        value={conversionData.medium_hours}
        onChange={(event) => setTeam_size(event.target.value)}
      />
      <TextField
        label="Hours for L T-Shirt Size"
        variant="outlined"
        value={conversionData.xsmall_hours}
        onChange={(event) => setTeam_size(event.target.value)}
      />
      <TextField
        label="Hours for XL T-Shirt Size"
        variant="outlined"
        value={conversionData.xsmall_hours}
        onChange={(event) => setTeam_size(event.target.value)}
      />
      <TextField
        label="Hourly Rate"
        variant="outlined"
        value={conversionData.xsmall_hours}
        onChange={(event) => setTeam_size(event.target.value)}
      />

    </Box>
    
  )
}

export default AgencyConversionSettings;
