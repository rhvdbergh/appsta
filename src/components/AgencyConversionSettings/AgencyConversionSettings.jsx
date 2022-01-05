import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';



function AgencyConversionSettings(user) {
  // initialize the dispatch variable
  const dispatch = useDispatch();

  // grab the conversion data from the store
  const conversionData = useSelector((store) => store.agencyConversion);
  
  
  
  useEffect(() => {
    dispatch({ type: 'GET_CONVERSION_DATA' });
  }, []);
  
  return (
    <Box>
      <Typography type="h6">Agency Conversion Settings</Typography>


    </Box>
    
  )
}

export default AgencyConversionSettings;
