import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid"
function AgencyRegistrationForm1() {

    return (
        <>
            <Grid>
                <TextField id="outlined-basic" label="User Name*" variant="outlined" />
                <TextField id="outlined-basic" label="Password*" variant="outlined" />
                <TextField id="outlined-basic" label="Re-enter Password*" variant="outlined" />
            </Grid>
        </>
    )
}

export default AgencyRegistrationForm1;