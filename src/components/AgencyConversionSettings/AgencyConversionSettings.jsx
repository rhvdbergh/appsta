import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function AgencyConversionSettings(user) {
  // initialize the dispatch variable
  const dispatch = useDispatch();

  // grab the conversion data from the store
  const conversionData = useSelector((store) => store.agencyConversion);

  const [xsmall_hours, SetXsmall_hours] = useState(conversionData.xsmall_hours);
  const [small_hours, SetSmall_hours] = useState(conversionData.small_hours);
  const [medium_hours, SetMedium_hours] = useState(conversionData.medium_hours);
  const [large_hours, SetLarge_hours] = useState(conversionData.large_hours);
  const [xlarge_hours, SetXlarge_hours] = useState(conversionData.xlarge_hours);
  const [hourly_cost, SetHourly_cost] = useState(conversionData.hourly_cost);

  const updateData = {
    xsmall_hours,
    small_hours,
    medium_hours,
    large_hours,
    xlarge_hours
  }

  // const handleData = (field, value) => {
  //   conversionData[field] = parseInt(value);
  // }

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
        value={conversionData.xsmall_hours}
        onChange={(event) => SetXsmall_hours(event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for S T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.small_hours}
        onChange={(event) => SetSmall_hours(event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for M T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.medium_hours}
        onChange={(event) => SetMedium_hours(event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for L T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.large_hours}
        onChange={(event) => SetLarge_hours(event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for XL T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.xlarge_hours}
        onChange={(event) => SetXLarge_hours(event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hourly Rate"
        variant="outlined"
        defaultValue={conversionData.hourly_rate}
        onChange={(event) => SetHourly_rate(event.target.value)}
      />
      <Button onClick={handleUpdate}>Update Data</Button>

    </Box>
    
  )
}

export default AgencyConversionSettings;
