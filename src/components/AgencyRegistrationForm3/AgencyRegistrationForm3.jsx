import { TextField, FormControl, RadioGroup, Radio, FormLabel, FormControlLabel, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function AgencyRegistrationForm3 ({ setCanMoveForward }) {
    const dispatch = useDispatch();

    const agency = useSelector((store) => store.newAgency);

    const [city, setCity] = useState(null);
    const [state_province, setState_province] = useState(null);
    const [country_code, setCountry_code] = useState(null);
    const [postal_code, setPostal_code] = useState(null);
    const [onshore_only, setOnshore_only] = useState(true);
    const [onshore_offshore_mix, setOnshore_offshore_mix] = useState(false);
    const [talent_off_lead_on, setTalent_off_lead_on] = useState(false);

    // on page load, set the local state to what has been previously 
    // entered in the agency object if the new agency user is returning
    useEffect(() => {
        setCity(agency.city);
        setState_province(agency.state_province);
        setCountry_code(agency.country_code);
        setPostal_code(agency.postal_code);
        setOnshore_only(agency.onshore_only);
        setOnshore_offshore_mix(agency.onshore_offshore_mix);
        setTalent_off_lead_on(agency.talent_off_lead_on);
    }, []);

    // when any required fields change, check to see if the user can proceed
    useEffect(() => {
        isCompletedForm();
    }, [city, state_province, country_code, postal_code]);

    // validate that required form fields are filled out
    const isCompletedForm = () => {
        // only move forward if the required fields of city and postal code have non-null, non-empty content
        if (
            city !== null &&
            city !== '' &&
            postal_code !== null &&
            postal_code !== ''
        ) {
            setCanMoveForward(true);
        } else {
            setCanMoveForward(false);
        }
    };

    // add data to the redux store
    const handleData = (data, value) => {
        // check to see that the data field is not empty
        if (data !== '') {
          dispatch({
            type: 'SET_NEW_AGENCY',
            payload: { ...agency, [data]: value },
          });
        }
      };
    // function to change values of the onshore/offshore variables when
    // the radio button changes
    const handleRadioChange = (event) => {
      switch(event.target.value) {
        case 'onshore-only': {
          setOnshore_only(true);
          setOnshore_offshore_mix(false);
          setTalent_off_lead_on(false);
          }
          break;
        case 'onshore-offshore': {
          setOnshore_only(false);
          setOnshore_offshore_mix(true);
          setTalent_off_lead_on(false);
          }
          break;
        case 'onshore-lead': {
          setOnshore_only(false);
          setOnshore_offshore_mix(false);
          setTalent_off_lead_on(true);
          }
          break;
      }
    } // end of handleRadioChange
    return (
        <>
            <Grid>
                <TextField 
                  label="City*" 
                  value={city}
                  variant="outlined"
                  onChange={(event) => setCity(event.target.value)} 
                  onBlur={() => {
                    handleData('city', city);
                  }}
                />
                <TextField 
                  label="State/Province" 
                  value={state_province}
                  variant="outlined"
                  onChange={(event) => setState_province(event.target.value)} 
                  onBlur={() => {
                    handleData('state_province', state_province);
                  }}/>
                <TextField 
                  label="Country Code" 
                  value={country_code}
                  variant="outlined"
                  onChange={(event) => setCountry_code(event.target.value)} 
                  onBlur={() => {
                    handleData('country_code', country_code);
                  }}
                />
                <TextField 
                  label="Zip/Postal Code" 
                  value={postal_code}
                  variant="outlined"
                  onChange={(event) => setPostal_code(event.target.value)} 
                  onBlur={() => {
                    handleData('postal_code', postal_code);
                  }}
                />
            </Grid>
            <FormControl component="fieldset">
                <FormLabel component="legend">Staff Location</FormLabel>
                <RadioGroup
                    aria-label="staff-location"
                    defaultValue="onshore-only"
                    name="radio-buttons-group"
                    onChange={handleRadioChange}
                    onBlur={() => {
                      handleData('onshore_only', onshore_only);
                      handleData('onshore_offshore_mix', onshore_offshore_mix);
                      handleData('talent_off_lead_on', talent_off_lead_on);
                    }}
                >
                    <FormControlLabel value="onshore-only" control={<Radio />} label="Onshore Talent Only" />
                    <FormControlLabel value="onshore-offshore" control={<Radio />} label="Onshore and Offshore Talent" />
                    <FormControlLabel value="onshore-lead" control={<Radio />} label="Offshore Talent, Onshore Leadership" />
                </RadioGroup>
                </FormControl>
        </>
    )
}

export default AgencyRegistrationForm3;