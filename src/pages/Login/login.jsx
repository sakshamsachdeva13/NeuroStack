import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Box, Grid, FormControl, Button } from "@mui/material";
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
      errors.username = "username is required";
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
    <Box
      my={20}
      mx={45}
      sx={{
        width: 800,
        height: 400,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#082630ff",
        "&:hover": {
          bgcolor: "#082630ff",
        },
      }}
    >
      <div className={classes.logoContainer}>
        <Logo />
      </div>

      <form onSubmit={onSubmit} method='POST' className={classes.inputContainer}>
        <TextField
          //   required
          id="outlined-basic"
          label="username or id"
          name="username"
          value={username}
          onChange={onChange}
          sx={{
            input: {
              color: "white",
              border: "white",
              fontWeight: "600",
            },
          }}
        />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          color="primary"
          sx={{
            input: {
              color: "white",
              border: "white",
              fontWeight: "600",
            },
          }}
        />

        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Login;
