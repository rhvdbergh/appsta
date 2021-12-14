import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid"
import {useState} from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
function AgencyRegistrationForm1() {

    const dispatch = useDispatch();

    const agency = useSelector(store => store.newAgency)

    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    // const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleData = (data, value) => {
        dispatch({ type: 'SET_NEW_AGENCY', payload: {...agency, [data]: value}})
    }

    console.log('this is agency', agency)
    return (
        <>
            <Grid>
                <TextField id="outlined-basic" label="User Name*" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)} onBlur={(() => {handleData('username', username)})}/>
                <TextField id="outlined-basic" label="Password*" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} onBlur={(() => {handleData('password', password)})}/>
                {/* <TextField id="outlined-basic" label="Re-enter Password*" variant="outlined" onChange={(event) => setPasswordConfirmation(event.target.value)} onBlur={(() => {handleData(passwordConfirmation)})}/> */}
            </Grid>
        </>
    )
}

export default AgencyRegistrationForm1;