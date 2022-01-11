import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Box } from '@mui/material';

// component used in the OptionsCard when in admin view
function AdminOptionSelectionBlock({ feature }) {
  // set up the redux dispatch
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({ type: 'DELETE_FEATURE', payload: feature.id });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete
      </Button>
    </Box>
  );
}

export default AdminOptionSelectionBlock;
