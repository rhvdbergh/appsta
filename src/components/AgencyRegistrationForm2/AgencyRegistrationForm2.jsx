import { TextField, Stack } from "@mui/material";
import Grid from "@mui/material/Grid"

function AgencyRegistrationForm2() {

    return (
        <>

            {/* <Grid> */}
            <Stack>
                <TextField label="Agency Name*" variant="outlined" />
                <TextField
                    multiline={true}
                    rows={3}
                    sx={{width: .3, height: 100 }}
                    placeholder='Tell the customers about your company'
                    type="text"
                // value
                />
                <TextField label="Logo URL" variant="outlined"
                />
                <TextField label="Contact First Name*" variant="outlined"
                />
                <TextField label="Contact Last Name*" variant="outlined"
                />
                <TextField label="Phone Number" variant="outlined"
                />

            </Stack>
                
            {/* </Grid> */}
        </>

    )
}

export default AgencyRegistrationForm2;