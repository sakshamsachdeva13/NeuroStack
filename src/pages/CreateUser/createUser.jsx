import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField, Box, Grid, Button, FormControl, InputLabel, Select, MenuItem, Typography} from "@mui/material";
import * as actions from "../../store/actions/index.action";
import classes from "./createUser.module.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const signupAction = (user) => dispatch(actions.signup(user));
  const [errors, setErrors] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
    email: "",
    phone: ""
  });

  const { first_name, last_name, employee_id, email, phone, selectedOption } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "last_name" || name === "first_name") {
      const cleanedValue = value.replace(/[^A-Za-z]/gi, '');
      setFormData({ ...formData, [name]: cleanedValue });
    } else if (name === "phone") {
      const cleanedValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: cleanedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = {};
    setErrors(errors);
    setFormValid(Object.keys(errors).length === 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signupAction(formData);
  };

  return (
    <div className={classes.container}>
      <Box className={classes.formContainer}>
        <form onSubmit={onSubmit} method='POST' className={classes.loginBox}>
          <Typography variant="h4" className={classes.loginTitle}>
            Create User
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-first-name"
                label="First Name"
                name="first_name"
                value={first_name}
                onChange={onChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-last-name"
                label="Last Name"
                name="last_name"
                value={last_name}
                onChange={onChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-email"
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
                type="email"
                fullWidth
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-phone"
                label="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
                type="tel"
                fullWidth
                className={classes.textField}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="outlined-employee-id"
                label="Employee ID"
                name="employee_id"
                value={employee_id}
                onChange={onChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  height: '100%', 
                  
                  // Ensures the button matches the height of the TextField
                }}
                className={classes.submitButton}
              >
                Generate ID
              </Button>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth className={classes.textField}>
                <InputLabel id="choose_department">Choose Department</InputLabel>
                <Select
                  id="choose_department"
                  name="selectedOption"
                  value={selectedOption}
                  onChange={onChange}
                  label="Choose Department"
                >
                  <MenuItem value="radiologist">Radiologist</MenuItem>
                  <MenuItem value="neurologist">Neurologist</MenuItem>
                  <MenuItem value="neurosurgeon">Neurosurgeon</MenuItem>
                  <MenuItem value="therapist">Therapist</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" type="submit" fullWidth className={classes.submitButton}>
                Save And Send Credentials
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ my: 0 }}>
              {/* Add margin to create space */}
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
