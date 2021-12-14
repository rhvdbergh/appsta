import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid"

function AgencyRegistrationForm3 () {

    return (
        <>
             <>
            <Grid>
                <TextField id="outlined-basic" label="Representative First Name*" variant="outlined" />
                <TextField id="outlined-basic" label="Representative Last Name*" variant="outlined"/>
                <TextField id="outlined-basic" label="Company Email Address" variant="outlined"/>
                <TextField id="outlined-basic" label="Company Phone Number" variant="outlined"/>
            </Grid>
        </>
        </>
    )
}

export default AgencyRegistrationForm3;