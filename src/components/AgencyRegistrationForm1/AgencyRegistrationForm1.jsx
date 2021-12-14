import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid"
import { useDispatch } from "react-redux";
function AgencyRegistrationForm1() {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    // const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleData = (data) => {
        
    }

    return (
        <>
            <Grid>
                <TextField id="outlined-basic" label="User Name*" variant="outlined" onChange={(event) => setUsername(event.target.value)} onBlur={(() => {handleData('username')})}/>
                <TextField id="outlined-basic" label="Password*" variant="outlined" onChange={(event) => setPassword(event.target.value)} onBlur={(() => {handleData(password)})}/>
                {/* <TextField id="outlined-basic" label="Re-enter Password*" variant="outlined" onChange={(event) => setPasswordConfirmation(event.target.value)} onBlur={(() => {handleData(passwordConfirmation)})}/> */}
            </Grid>
        </>
    )
}

export default AgencyRegistrationForm1;