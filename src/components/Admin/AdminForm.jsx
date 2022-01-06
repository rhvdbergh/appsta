//import MUI 
import {
    TextField,
    InputLabel,
    OutlinedInput,
    FormControl,
    InputAdornment,
    IconButton,
    Select,
    Stack,
    MenuItem,
    Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';


//added MUI styles for login form 
const useStyles = makeStyles(() => ({
    form: {
        marginTop: '100px',
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '400px',
        width: '300px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
    },
}));

//import from react 
import { useState } from 'react';
import { useSelector } from 'react-redux';

function AdminForm() {

    //set up MUI style 
    const { form, input } = useStyles();

    const update = (event) => {
        event.preventDefault();
    }

    //grab categories from reducer found in navBar Saga 
    const category = useSelector((store) => store.category);
    console.log('category', category);

    //Set Local State 
    const [feature_name, setFeature_name] = useState([]);
    const [feature_story, setFeature_story] = useState([]);
    const [feature_description, setFeature_description] = useState([]);
    const [image_url, setImage_url] = useState([]);

    return (
        <Stack>
            <center>
                <h1> Add / Edit Feature </h1>

                <FormControl>
                    <form className={form} onSumbit={update}>
                        <TextField
                            label="Feature Name*"
                            value={feature_name}
                            variant="outlined"
                            onChange={(event) => setFeature_name(event.target.value)}
                        />

                        <TextField
                            label="Feature Story*"
                            value={feature_story}
                            variant="outlined"
                            onChange={(event) => setFeature_story(event.target.value)}
                        />

                        <TextField
                            label="Provide Description of Feature*"
                            value={feature_description}
                            variant="outlined"
                            onChange={(event) => setFeature_description(event.target.value)}
                        />

                        <TextField
                            label="Image Url*"
                            value={image_url}
                            variant="outlined"
                            onChange={(event) => setImage_url(event.target.value)}
                        />

                        {/* Drop Down  */}
                        <Select >
                            <MenuItem> 1</MenuItem>
                            <MenuItem> 1</MenuItem>
                            <MenuItem> 1</MenuItem>
                            <MenuItem> 1</MenuItem>
                        </Select>

                        <Button type="submit" > Update Features </Button>
                    </form>
                </FormControl>
            </center>
        </Stack>
    )
}
export default AdminForm;