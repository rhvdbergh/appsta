import {
  Select,
  Stack,
  MenuItem,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Navbar from '../Navbar/Navbar';
import OptionsList from '../OptionsList/OptionsList';

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

  //grab categories from reducer found in navBar Saga
  const category = useSelector((store) => store.category);
  const features = useSelector((store) => store.features);
  console.log('category', category);

  //Set Local State
  const [newFeature, setNewFeature] = useState({
    feature_name: '',
    feature_story: '',
    feature_description: '',
    image_url: '',
    category_id: '',
  });

  //not used yet
  const handlePost = () => {
    if (
      newFeature.feature_name !== '' &&
      newFeature.feature_story !== '' &&
      newFeature.feature_description !== '' &&
      newFeature.image_url !== '' &&
      newFeature.category_id !== ''
    ) {
      dispatch({ type: 'POST_NEW_FEATURE', payload: newFeature });
      setOpen(false);
    } else {
      alert('Please fill in all fields!');
    }
  };
  //when input is filled out
  const handlePropertyChange = (event, property) => {
    setNewFeature({
      ...newFeature,
      [property]: event.target.value,
    });
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

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box>
          <Typography variant="h4" sx={{ m: 4 }}>
            Admin Page
          </Typography>
          <Button
            variant="contained"
            sx={{ mx: 4, my: 2, textSecondary: 'text.secondary' }}
            onClick={handleClickOpen('body')}
          >
            Create New Feature
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title" sx={{ textAlign: 'center' }}>
              Add Feature
            </DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{ width: 300 }}
              >
                <Stack>
                  <TextField
                    sx={{ my: 2 }}
                    label="Feature Name*"
                    value={newFeature.feature_name}
                    variant="outlined"
                    onChange={(event) =>
                      handlePropertyChange(event, 'feature_name')
                    }
                  />

                  <TextField
                    sx={{ mb: 2 }}
                    label="Feature Story*"
                    value={newFeature.feature_story}
                    multiline={true}
                    rows={3}
                    variant="outlined"
                    onChange={(event) =>
                      handlePropertyChange(event, 'feature_story')
                    }
                  />

                  <TextField
                    sx={{ mb: 2 }}
                    label="Provide Description of Feature*"
                    value={newFeature.feature_description}
                    variant="outlined"
                    onChange={(event) =>
                      handlePropertyChange(event, 'feature_description')
                    }
                  />

                  <TextField
                    sx={{ mb: 2 }}
                    label="Image Url*"
                    value={newFeature.image_url}
                    variant="outlined"
                    onChange={(event) =>
                      handlePropertyChange(event, 'image_url')
                    }
                  />

                  {/* Drop Down  */}
                  <Select
                    label="category"
                    value={newFeature.category_id}
                    onChange={(event) =>
                      handlePropertyChange(event, 'category_id')
                    }
                  >
                    <MenuItem key={-1} value={''} disabled>
                      Select Category
                    </MenuItem>
                    {category.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.category_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="error">
                {' '}
                Cancel{' '}
              </Button>
              <Button onClick={handlePost} variant="contained">
                {' '}
                Add Feature{' '}
              </Button>
            </DialogActions>
          </Dialog>
          <Box>
            <OptionsList features={features} listType="admin-features" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Admin;
