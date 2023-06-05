// ------------------------------------
// ------------ Parola Kft ------------
// ---------- info@parola.hu ----------
// ------------------------------------

import React from 'react';
import { Alert, AlertTitle, Slide, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

const Notification = ({ open, setOpen, message, variant, title, onAlertClose }) => {
  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false);
      onAlertClose && onAlertClose();
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={variant === 'success' ? 3000 : 6000}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: 'right',
      }}>
      <Alert onClose={handleClose} severity={variant} style={{ width: '450px' }} variant="filled">
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

Notification.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
  title: PropTypes.string,
  onAlertClose: PropTypes.func,
};

Notification.defaultProps = {
  variant: '',
  title: '',
  onAlertClose: null,
};
