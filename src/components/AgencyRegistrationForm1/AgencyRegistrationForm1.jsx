import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid"
import { useDispatch } from "react-redux";
function AgencyRegistrationForm1() {

  

    const handleData = () => {
        // dispatch({ type: 'SET '})
    }

    return (
        <>
            <Grid>
                <TextField id="outlined-basic" label="User Name*" variant="outlined" onBlur={handleData}/>
                <TextField id="outlined-basic" label="Password*" variant="outlined" />
                <TextField id="outlined-basic" label="Re-enter Password*" variant="outlined" />
            </Grid>
        </>
    )
}

export default AgencyRegistrationForm1;