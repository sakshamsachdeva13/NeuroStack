import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from './ResetPassword.module.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const { newPassword, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.newPassword.trim() || formData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setErrors(errors);
    setFormValid(Object.keys(errors).length === 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Assume password reset is successful for demonstration
    navigate('/reset-success');
  };

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.resetBox}>
        <Typography variant="h4" className={classes.resetTitle}>
          Reset Password
        </Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
            id="outlined-new-password-input"
            label="New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={onChange}
            variant="outlined"
            fullWidth
            margin="normal"
            className={classes.textField}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />
          <TextField
            id="outlined-confirm-password-input"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onChange}
            variant="outlined"
            fullWidth
            margin="normal"
            className={classes.textField}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.submitButton}
            disabled={!formValid}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
