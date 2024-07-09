import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from '../ResetPassword/ResetPassword.module.css'; // Correct path to the CSS file

const ResetSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Ensure this path matches the route for the login page in your router
  };

  return (
    <Box className={classes.successContainer}>
      <Box className={classes.successBox}>
        <Typography variant="h4" className={classes.successTitle}>
          Your password is successfully changed!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginRedirect}
          className={classes.loginButton}
        >
          Go to Login
        </Button>
      </Box>
    </Box>
  );
};

export default ResetSuccess;
