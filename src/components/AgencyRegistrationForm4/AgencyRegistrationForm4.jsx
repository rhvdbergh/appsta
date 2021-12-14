import { TextField } from "@mui/material";
import Stack from "@mui/material/Grid"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function AgencyRegistrationForm4() {

    return (
        <>

            <Stack>
                <TextField id="outlined-basic" label="Team Size*" variant="outlined" />

                <FormControl component="fieldset">

                    <FormGroup row aria-label="minority-owned">
                        <FormControlLabel value=" " control={<Checkbox />} label="Minority Owned" />
                    </FormGroup>

                    <FormGroup row aria-label="women-owned">
                        <FormControlLabel value=" " control={<Checkbox />} label="Women Owned" />
                    </FormGroup>

                    <FormGroup row aria-label="veteran-owned">
                        <FormControlLabel value=" " control={<Checkbox />} label="Veteran Owned" />
                    </FormGroup>

                </FormControl>
            </Stack>
        </>

    )
}

export default AgencyRegistrationForm4;