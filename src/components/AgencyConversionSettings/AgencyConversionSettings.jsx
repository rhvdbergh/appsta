import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function AgencyConversionSettings({user, conversionData}) {
  // initialize the dispatch variable
  const dispatch = useDispatch();

  // conversionData = useSelector(store => store.agencyConversion);


  // const [xsmall_hours, setXsmall_hours] = useState(null);
  // const [small_hours, setSmall_hours] = useState(null);
  // const [medium_hours, setMedium_hours] = useState(null);
  // const [large_hours, setLarge_hours] = useState(null);
  // const [xlarge_hours, setXlarge_hours] = useState(null);
  // const [hourly_rate, setHourly_rate] = useState(null);

  // const updateData = {
  //   xsmall_hours,
  //   small_hours,
  //   medium_hours,
  //   large_hours,
  //   xlarge_hours,
  //   hourly_rate
  // }

  const handleData = (field, value) => {
    conversionData[field] = parseInt(value);
  }

  const handleUpdate = () => {
    dispatch({ 
      type: 'UPDATE_AGENCY_CONVERSION', 
      payload: {
        agencyID: user.agency_id,
        conversionData: conversionData
      }     
    });
  }
  
  useEffect(() => {
    dispatch({ type: 'GET_AGENCY_CONVERSION', payload: user.agency_id });
  }, []);

  

  // useEffect(() => {
  //   setXsmall_hours(conversionData.xsmall_hours);
  //   setSmall_hours(conversionData.small_hours);
  //   setMedium_hours(conversionData.medium_hours);
  //   setLarge_hours(conversionData.large_hours);
  //   setXlarge_hours(conversionData.xlarge_hours);
  //   setHourly_rate(conversionData.hourly_rate);
  // }, [])
  
  console.log('User is: ', user);
  console.log('User ID is: ', user.agency_id);
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
        onBlur={(event) => handleData('small_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for M T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.medium_hours}
        onBlur={(event) => handleData('medium_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for L T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.large_hours}
        onBlur={(event) => handleData('large_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hours for XL T-Shirt Size"
        variant="outlined"
        defaultValue={conversionData.xlarge_hours}
        onBlur={(event) => handleData('xlarge_hours', event.target.value)}
      />
      <TextField
        sx={{m:1}}
        label="Hourly Rate"
        variant="outlined"
        defaultValue={conversionData.hourly_rate}
        onBlur={(event) => handleData('hourly_rate', event.target.value)}
      />
      <Button onClick={handleUpdate}>Update Data</Button>

    </Box>
    
  )
}

export default AgencyConversionSettings;
