import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function AgencyRegistrationForm4() {

    return (
        <>

            <Grid>
                <TextField id="outlined-basic" label="City*" variant="outlined" />
                <TextField id="outlined-basic" label="Zip Code*" variant="outlined" />
                <FormControl component="fieldset">
                    <FormLabel component="legend">We offer dedicated customer representatives?*</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel value="True" control={<Radio />} label="Yes" />
                        <FormControlLabel value="False" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend">We offer guarantees?*</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel value="True" control={<Radio />} label="Yes" />
                        <FormControlLabel value="False" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>

    )
}

export default AgencyRegistrationForm4;