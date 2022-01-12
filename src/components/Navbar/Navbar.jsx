import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  Toolbar,
  CardMedia,
  List,
  Divider,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

// navbar component, appears on most screens
// accepts three button texts and associated functions
// so the navbar can be used with different buttons
// and functions passed down from its parent component
// the text is different on the BuyerDashboard,
// so a boolean prop controls this
export default function Navbar({
  btn1text,
  fxn1,
  btn2text,
  fxn2,
  btn3text,
  fxn3,
  onBuyerDashboard, // text is different on buyer dashboard
}) {
  // set up history hook to navigate
  const history = useHistory();

  // get the categories list from the Redux store
  const categories = useSelector((store) => store.category);

  // get the selected category from the redux store
  const selectedCategory = useSelector((store) => store.selectedCategory);

  // get the user object from the redux store
  const user = useSelector((store) => store.user);

  // set dispatch hook
  const dispatch = useDispatch();

  // setting a drawer width for the Navbar
  const drawerWidth = 240;

  // define a function to select a category
  const categorySelect = (category) => {
    console.log('Category clicked is:', category.category_name);
    //dispatch clicked category_id to redux store
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category.id });
  };

  // call useEffect on page load
  // to populate the categories list
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORY' });
  }, [dispatch]);

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'primary.navbar',
            color: 'text.navbar',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          {/* Contains Appsta logo */}
          <CardMedia
            component="img"
            sx={{ width: '100px', mt: '15px', mb: '15px' }}
            image={require('../../media/Appsta_Logo_Black_Outline_Large.png')}
            alt="appsta logo"
            onClick={() => history.push('/')}
          />
        </Toolbar>
        <Divider />
        {/* The category list only shows when not on the buyer dashboard */}
        {!onBuyerDashboard && (
          <List sx={{ my: 3 }}>
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => categorySelect(category)}
              >
                <ListItemText primary={category.category_name} />
              </ListItem>
            ))}
          </List>
        )}
        {/* if the category list is not displayed, add */}
        {/* extra margins to the first button for spacing */}
        {btn1text && (
          <Button
            onClick={fxn1}
            variant="contained"
            sx={{ m: 1, mt: onBuyerDashboard ? 30 : 1 }}
          >
            {btn1text}
          </Button>
        )}
        {btn2text && (
          <Button onClick={fxn2} variant="contained" sx={{ m: 1 }}>
            {btn2text}
          </Button>
        )}
        {btn3text && (
          <Button onClick={fxn3} variant="contained" sx={{ m: 1 }}>
            {btn3text}
          </Button>
        )}
        {/* if the user is logged in, a logout button appears */}
        {/* clicking this button dispatches the LOGOUT action */}
        {user.id && (
          <Button
            sx={{ m: 1 }}
            onClick={fxn3}
            variant="contained"
            onClick={() => dispatch({ type: 'LOGOUT', payload: history })}
          >
            LOGOUT
          </Button>
        )}
      </Drawer>
    </div>
  );
}
