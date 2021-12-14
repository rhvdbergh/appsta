import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid"

function AgencyRegistrationForm2() {

    return (
        <>

            <Grid>
                <TextField id="outlined-basic" label="Agency Name*" variant="outlined" />
                <TextField
                    multiline={true}
                    rows={3}
                    sx={{width: .3, height: 100 }}
                    placeholder='Tell the customers about your company'
                    type="text"
                // value
                />
                <TextField id="outlined-basic" label="Logo URL" variant="outlined"
                />
            </Grid>
        </>

    )
}

export default AgencyRegistrationForm2;