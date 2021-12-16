import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

export default function Navbar({
  btn1text,
  fxn1,
  btn2text,
  fxn2,
  btn3text,
  fxn3,
}) {
  // get the categories list from the Redux store
  const categories = useSelector((store) => store.category);
  // get the selected category from the redux store
  const selectedCategory = useSelector((store) => store.selectedCategory);
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

  // call useEffect to populate the categories list
  useEffect(() => {
    dispatch({ type: 'FETCH_CATEGORY' });
  }, [dispatch]);

  console.log('Category list is:', categories);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
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
      {btn1text && (
        <Button onClick={fxn1} variant="contained">
          {btn1text}
        </Button>
      )}
      {btn2text && (
        <Button onClick={fxn2} variant="contained">
          {btn2text}
        </Button>
      )}
      {btn3text && (
        <Button onClick={fxn3} variant="contained">
          {btn3text}
        </Button>
      )}
    </Drawer>
  );
}
