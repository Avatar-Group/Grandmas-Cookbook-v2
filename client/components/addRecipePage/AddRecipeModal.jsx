import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import AddRecipeTab from './AddRecipeTab.jsx';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#CB997E',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddRecipeModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: 'scroll' }}
    >
      <Box sx={boxStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Recipes
        </Typography>
        <AddRecipeTab />
        <Button color="warning" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
