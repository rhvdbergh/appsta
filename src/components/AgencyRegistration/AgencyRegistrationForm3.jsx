import {
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  Grid,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function AgencyRegistrationForm3({ setCanMoveForward }) {
  const dispatch = useDispatch();

  const agency = useSelector((store) => store.newAgency);

  const [city, setCity] = useState(null);
  const [state_province, setState_province] = useState(null);
  const [country_code, setCountry_code] = useState(null);
  const [postal_code, setPostal_code] = useState(null);
  const [staffing_location, setStaffing_location] = useState(
    "Onshore Talent Only"
  );

  // on page load, set the local state to what has been previously
  // entered in the agency object if the new agency user is returning
  useEffect(() => {
    setCity(agency.city);
    setState_province(agency.state_province);
    setCountry_code(agency.country_code);
    setPostal_code(agency.postal_code);
    setStaffing_location(agency.staffing_location);
  }, []);

  // when any required fields change, check to see if the user can proceed
  useEffect(() => {
    isCompletedForm();
  }, [city, state_province, country_code, postal_code, staffing_location]);

  // validate that required form fields are filled out
  const isCompletedForm = () => {
    // only move forward if the required fields of city and postal code have non-null, non-empty content
    if (
      city !== null &&
      city !== "" &&
      postal_code !== null &&
      postal_code !== "" &&
      staffing_location !== null &&
      staffing_location !== ""
    ) {
      setCanMoveForward(true);
    } else {
      setCanMoveForward(false);
    }
  };

  // add data to the redux store
  const handleData = (data, value) => {
    // check to see that the data field is not empty
    if (data !== "") {
      dispatch({
        type: "SET_NEW_AGENCY",
        payload: { ...agency, [data]: value },
      });
    }
  };
  // function to change values of the staffing location variables when
  // the radio button changes
  // const handleRadioChange = (event) => {
  //   switch(event.target.value) {
  //     case 'onshore-only': {
  //       setOnshore_only(true);
  //       setOnshore_offshore_mix(false);
  //       setTalent_off_lead_on(false);
  //       }
  //       break;
  //     case 'onshore-offshore': {
  //       setOnshore_only(false);
  //       setOnshore_offshore_mix(true);
  //       setTalent_off_lead_on(false);
  //       }
  //       break;
  //     case 'onshore-lead': {
  //       setOnshore_only(false);
  //       setOnshore_offshore_mix(false);
  //       setTalent_off_lead_on(true);
  //       }
  //       break;
  //   }
  // } // end of handleRadioChange
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ width: "60%", maxWidth: "350px", m: 2 }}
          label="City*"
          value={city}
          variant="outlined"
          onChange={(event) => setCity(event.target.value)}
          onBlur={() => {
            handleData("city", city);
          }}
        />
        <TextField
          sx={{ width: "60%", maxWidth: "350px", m: 2 }}
          label="State/Province"
          value={state_province}
          variant="outlined"
          onChange={(event) => setState_province(event.target.value)}
          onBlur={() => {
            handleData("state_province", state_province);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          sx={{ width: "60%", maxWidth: "350px", m: 2 }}
          label="Country Code"
          value={country_code}
          variant="outlined"
          onChange={(event) => setCountry_code(event.target.value)}
          onBlur={() => {
            handleData("country_code", country_code);
          }}
        />
        <TextField
          sx={{ width: "60%", maxWidth: "350px", m: 2 }}
          label="Zip/Postal Code*"
          value={postal_code}
          variant="outlined"
          onChange={(event) => setPostal_code(event.target.value)}
          onBlur={() => {
            handleData("postal_code", postal_code);
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: "5vh" }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Staff Location*</FormLabel>
          <RadioGroup
            aria-label="staffing-location"
            name="radio-buttons-group"
            value={staffing_location}
            onChange={(event) => setStaffing_location(event.target.value)}
            onBlur={() => {
              handleData("staffing_location", staffing_location);
            }}
          >
            <FormControlLabel
              value="Onshore Talent Only"
              control={<Radio />}
              label="Onshore Talent Only"
            />
            <FormControlLabel
              value="Onshore and Offshore Talent"
              control={<Radio />}
              label="Onshore and Offshore Talent"
            />
            <FormControlLabel
              value="Offshore Talent, Onshore Leadership"
              control={<Radio />}
              label="Offshore Talent, Onshore Leadership"
            />
            <FormControlLabel
              value="All Staff Offshore"
              control={<Radio />}
              label="All Staff Offshore"
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ width: "60%", maxWidth: "350px" }}></Box>
      </Box>
    </Grid>
  );
}

export default AgencyRegistrationForm3;
