import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { hideExpirationAlert } from '../../store/reducers/alert/alert.action';

const LogoutDialog = ({ open = false }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  
  const dialogTitle = "Session has expired";
  const dialogText = "Your session has expired. Please log in again.";

  const closeExpiration = () => dispatch(hideExpirationAlert());

  return (
    <Dialog
      open={open}
      onClose={closeExpiration}
      sx={{
        borderRadius: '15px'
      }}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogText}</DialogContent>
      <DialogActions>
        <Button
          onClick={closeExpiration}
          sx={{
            color: theme.palette.primary.main
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LogoutDialog;