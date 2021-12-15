import React, { useEffect } from 'react';
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


export default function Navbar() {
  // get the categories list from the Redux store
  const categories = useSelector((store) => store.category);
  // set dispatch hook
  const dispatch = useDispatch();
  // setting a drawer width for the Navbar
  const drawerWidth = 240;
  // define a function to select a category
  const categorySelect = (category) => {
    console.log('Category clicked is:', category.category_name);
  }
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
              onClick={() => categorySelect(category)}
            >
              <ListItemText primary={category.category_name} />
            </ListItem>
          ))}
        </List>
        
      </Drawer>

  ) 
}