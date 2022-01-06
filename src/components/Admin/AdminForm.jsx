//import MUI 
import {
    TextField,
    InputLabel,
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
    Select,
    MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';


//import from react 
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function AdminForm() {



    return (
        <>
            <h1> Add / Edit Feature </h1>

            <TextField
                label="feature name*"
            />

            <TextField
                label="Feature Story*"
            />

            <TextField
                label="Provide Description of Feature*"
            />
            <TextField
                label="Image Url*"
            />
{/* Drop Down  */}
            <Select > 
             <MenuItem> </MenuItem>
             </Select>
               


        </>
    )
}
export default AdminForm;