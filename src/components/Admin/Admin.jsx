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
    const handlePost = () => {
        dispatch({ type: 'POST_NEW_FEATURE', payload: newFeature });
    }

    //grab categories from reducer found in navBar Saga 
    const category = useSelector((store) => store.category);
    console.log('category', category);

    //Set Local State 
    const [newFeature, setNewFeature] = useState({
        feature_name: '',
        feature_story: '',
        feature_description: '',
        image_url: '',
        category_id: '',
    })
  
    //when input is filled out
    const handlePropertyChange = (event, property) => {
        setNewFeature({
            ...newFeature,
            [property]: event.target.value,
        })
    };

    //initialized dispatch 
    const dispatch = useDispatch();
    const history = useHistory();

    //get categories from Store
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


    console.log('payload of newFeature', newFeature);


    // add data to the redux store
  const handleData = (data, value) => {
    // check to see that the data field is not empty
    if (data !== '') {
      dispatch({
        type: 'POST_NEW_FEATURE',
        payload: { ...newFeature, [data]: value },
      });
    }
  };


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
                                        value={newFeature.feature_name}
                                        variant="outlined"
                                        onChange={(event) => handlePropertyChange(event, "feature_name")}
                                        onBlur={() => {
                                            handleData ('feature_name', feature_name);
                                        }}
                                    />

                                    <TextField
                                        label="Feature Story*"
                                        value={newFeature.feature_story}
                                        variant="outlined"
                                        onChange={(event) => handlePropertyChange(event, "feature_story")}
                                    />

                                    <TextField
                                        label="Provide Description of Feature*"
                                        value={newFeature.feature_description}
                                        variant="outlined"
                                        onChange={(event) => handlePropertyChange(event, "feature_description")}
                                    />

                                    <TextField
                                        label="Image Url*"
                                        value={newFeature.image_url}
                                        variant="outlined"
                                        onChange={(event) => handlePropertyChange(event, "image_url")}
                                    />

                                    {/* Drop Down  */}
                                    <Select
                                        label="category"
                                        value={newFeature.category_id}
                                        onChange={(event) => handlePropertyChange(event, 'category_id')}>

                                        {category.map((category) => {
                                            return (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.category_name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>

                                </Stack>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}> Cancel </Button>
                            <Button onClick={handlePost}> Add Feature </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </>
    )
}


export default Admin;