import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Add Link from react-router-dom
import * as actions from "../../store/actions/index.action";
import Logo from "../../components/Logo/Logo";
import classes from "./login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const loginAction = (user) => dispatch(actions.login(user));
  const [errors, setErrors] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    setFormValid(Object.keys(errors).length === 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginAction(formData);
  };

  return (
    <Box className={classes.formContainer}>
      <Box className={classes.logoContainer}>
        <Logo className={classes.logo} />
      </Box>
      <Box className={classes.loginBox}>
        <Typography variant="h4" className={classes.loginTitle}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" className={classes.loginDescription}>
          Please login to continue.
        </Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
            id="outlined-basic"
            label="Username"
            name="username"
            value={username}
            onChange={onChange}
            variant="outlined"
            fullWidth
            margin="normal"
            className={classes.textField}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            variant="outlined"
            fullWidth
            margin="normal"
            className={classes.textField}
          />
          <Box className={classes.forgotPasswordContainer}>
            <Typography variant="body2" className={classes.forgotPasswordText}>
              Forgot Password?
            </Typography>
            <Link to="/reset-password" className={classes.forgotPasswordLink}>
              Click Me
            </Link>
          </Box>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.submitButton}
            disabled={!formValid}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
