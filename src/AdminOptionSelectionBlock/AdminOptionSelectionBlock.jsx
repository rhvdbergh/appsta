import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Box } from '@mui/material';

function AdminOptionSelectionBlock({ feature }) {
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete
      </Button>
    </Box>
  );
}

export default AdminOptionSelectionBlock;
