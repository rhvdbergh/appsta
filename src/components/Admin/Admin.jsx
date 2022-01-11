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
  FormControl,
  InputLabel,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import custom components
import Navbar from '../Navbar/Navbar';
import OptionsList from '../OptionsList/OptionsList';

// this component is the main Admin view
function Admin() {
  //grab categories and features from reducer found in navBar Saga
  const category = useSelector((store) => store.category);
  const features = useSelector((store) => store.features);

  // set local state to capture a feature
  const [newFeature, setNewFeature] = useState({
    feature_name: '',
    feature_story: '',
    feature_description: '',
    image_url: '',
    category_id: '',
  });

  // adds a feature after validation
  const handlePost = () => {
    if (
      newFeature.feature_name !== '' &&
      newFeature.feature_story !== '' &&
      newFeature.feature_description !== '' &&
      newFeature.image_url !== '' &&
      newFeature.category_id !== ''
    ) {
      // validation has passed, so add this feature to the db
      dispatch({ type: 'POST_NEW_FEATURE', payload: newFeature });
      // close the dialog modal
      setOpen(false);
    } else {
      alert('Please fill in all fields!');
    }
  };
  // when input is filled out, set the state of the reducer
  // property expects a string of the property to set on the reducer
  const handlePropertyChange = (event, property) => {
    setNewFeature({
      ...newFeature,
      [property]: event.target.value,
    });
  };

  // initialize redux dispatch
  const dispatch = useDispatch();

  //get categories from Store
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORY' });
  }, []);

  //copied from AgencyDashboard
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  // handle open of dialog modal
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  // handle close of dialog modal
  const handleClose = () => {
    setOpen(false);
  };

  // handle the focus of the dialog
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
                  <FormControl>
                    <InputLabel id="select-category">
                      Select Category
                    </InputLabel>
                    <Select
                      label="category"
                      value={newFeature.category_id}
                      placeholder="Select Category"
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
                  </FormControl>
                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ m: 1 }}
                onClick={handleClose}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button sx={{ m: 1 }} onClick={handlePost} variant="contained">
                Add Feature
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
