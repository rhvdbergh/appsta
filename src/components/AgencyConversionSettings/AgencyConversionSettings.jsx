import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

function AgencyConversionSettings({ user }) {
  // initialize the dispatch variable
  const dispatch = useDispatch();

  const conversionData = useSelector((store) => store.agencyConversion);

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

  const handleChange = (data, value) => {
    dispatch({
      type: "ADJUST_AGENCY_CONVERSION",
      payload: { ...conversionData, [data]: parseInt(value) },
    });
  };

  const handleUpdate = () => {
    dispatch({
      type: "UPDATE_AGENCY_CONVERSION",
      payload: {
        agencyID: user.agency_id,
        conversionData: conversionData,
      },
    });
  };

  useEffect(() => {
    dispatch({ type: "GET_AGENCY_CONVERSION", payload: user.agency_id });
  }, []);

  // useEffect(() => {
  //   setXsmall_hours(conversionData.xsmall_hours);
  //   setSmall_hours(conversionData.small_hours);
  //   setMedium_hours(conversionData.medium_hours);
  //   setLarge_hours(conversionData.large_hours);
  //   setXlarge_hours(conversionData.xlarge_hours);
  //   setHourly_rate(conversionData.hourly_rate);
  // }, [])

  console.log("User is: ", user);
  console.log("User ID is: ", user.agency_id);
  console.log("Conversion data is:", conversionData);
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant='h5' sx={{ my: 3 }}>
        Update Your T-Shirt Size Estimation Settings
      </Typography>
      <Box align='center' sx={{ my: 2 }}>
        <TextField
          sx={{ m: 1 }}
          label='Hours for XS T-Shirt Size'
          variant='outlined'
          value={conversionData.xsmall_hours || ""}
          onChange={(event) => {
            handleChange("xsmall_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label='Hours for S T-Shirt Size'
          variant='outlined'
          value={conversionData.small_hours || ""}
          onChange={(event) => {
            handleChange("small_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label='Hours for M T-Shirt Size'
          variant='outlined'
          value={conversionData.medium_hours || ""}
          onChange={(event) => {
            handleChange("medium_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label='Hours for L T-Shirt Size'
          variant='outlined'
          value={conversionData.large_hours || ""}
          onChange={(event) => {
            handleChange("large_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label='Hours for XL T-Shirt Size'
          variant='outlined'
          value={conversionData.xlarge_hours || ""}
          onChange={(event) => {
            handleChange("xlarge_hours", event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1 }}
          label='Hourly Rate'
          variant='outlined'
          value={conversionData.hourly_rate || ""}
          onChange={(event) => {
            handleChange("hourly_rate", event.target.value);
          }}
        />
      </Box>
      <Typography sx={{ my: 3 }}>
        <Button variant='contained' onClick={handleUpdate}>
          Update Estimation Settings
        </Button>
      </Typography>
    </Box>
  );
}

export default AgencyConversionSettings;
