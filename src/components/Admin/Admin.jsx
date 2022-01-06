import {
    Select,
    Stack,
    MenuItem,
    Box,
    TextField,
    FormGroup,
    FormControlLabel,
    FormControl,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';


import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


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

function Admin() {

    //set up MUI style 
    const { form, input } = useStyles();


    //not used yet 
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
    const [category_id, setCategory_id] =useState([]);

    //initialized dispatch 
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_CATEGORY' });
    }, []);

    //copied from AgencyDashboard 
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <>
            <Box sx={{ display: 'flex', }} >
                <Box>
                    <h1> Admin Page </h1>
                    <p> Hello Admin. this is a stud ....</p>
                    <Button onClick={handleClickOpen('body')}>
                        Create New Feature
                    </Button>

                    <Dialog 
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">Add Feature</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >

                                <Stack>
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
                                    <Select 
                                        label="category"
                                        value={category_id}
                                        onChange={(event) => setCategory_id(event, 'category_id')}>

                                            {category.map((category) => {
                                                return (
                                                    <MenuItem  key={category.id} value={category.id}> 
                                                    {category.category_name}
                                                    </MenuItem>
                                                )
                                            })}
                                    </Select>

                                </Stack>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {/* <Button onClick={handleUpdate}>Add Feature </Button> */}
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </>
    )
}


export default Admin;