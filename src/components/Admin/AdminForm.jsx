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
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function AdminForm() {


//grab categories from reducer found in navBar Saga 
const category = useSelector ((store) => store.category);

console.log('category', category);


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
             <MenuItem> 1</MenuItem>
             <MenuItem> 1</MenuItem>
             <MenuItem> 1</MenuItem>
             <MenuItem> 1</MenuItem>

             </Select>
               


        </>
    )
}
export default AdminForm;