import { TextField, FormControl, RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid"

function AgencyRegistrationForm3 () {

    return (
        <>
             <>
            <Grid>
                <TextField label="City*" variant="outlined" />
                <TextField label="State/Province" variant="outlined"/>
                <TextField label="Country Code" variant="outlined"/>
                <TextField label="Zip/Postal Code*" variant="outlined"/>
            </Grid>
            <FormControl component="fieldset">
                <FormLabel component="legend">Staff Location</FormLabel>
                <RadioGroup
                    aria-label="staff-location"
                    defaultValue="onshore-only"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="onshore-only" control={<Radio />} label="Onshore Only" />
                    <FormControlLabel value="onshore-offshore" control={<Radio />} label="Onshore and Offshore" />
                    <FormControlLabel value="onshore-lead" control={<Radio />} label="Offshore Talent, Onshore Leadership" />
                </RadioGroup>
                </FormControl>
        </>
        </>
    )
}

export default AgencyRegistrationForm3;