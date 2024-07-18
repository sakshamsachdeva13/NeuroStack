import React, { useState, useCallback, useEffect } from "react";
import {
  TextField,
  Box,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormControl,
  Skeleton,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./user.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index.action";

// <<<<<<< HEAD
// const DoctorSearchDailog = () => {
const SearchUser = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openCaseDialog, setOpenCaseDialog] = useState(false);
  const [caseSearchQuery, setCaseSearchQuery] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
// <<<<<<< HEAD
//   const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const usersList = useSelector((state) => state.admin.usersList);
  const userConfig = useSelector((state) => state.admin.userConfig);
  const patientsList = useSelector((state) => state.admin.patientData);

  const getUserConfig = useCallback(
    (configQuery) => dispatch(actions.getUserConfig(configQuery)),
    [dispatch]
  );
  const getAllUserList = useCallback(
    () => dispatch(actions.getAlluserList()),
    [dispatch]
  );
  const getPatientList = useCallback(
    () => dispatch(actions.getPatientData()),
    [dispatch]
  );
  const updateConfig = useCallback(
    (updatedConfig) => dispatch(actions.updateUserConfig(updatedConfig)),
    [dispatch]
  );

  useEffect(() => {
    getAllUserList();
    getPatientList();
  }, [getAllUserList, getPatientList]);

  const mockUsers = [
    {
      _id: 1,
      firstName: "Dr.John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
    {
      _id: 2,
      firstName: "Dr.Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "234-567-8901",
    },
    {
      _id: 3,
      firstName: "Dr.Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      phone: "345-678-9012",
    },
    {
      _id: 4,
      firstName: "Dr.Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      phone: "456-789-0123",
    },
  ];

  const mockCases = [
    { id: 1, caseNumber: "CASE1234" },
    { id: 2, caseNumber: "CASE5678" },
    { id: 3, caseNumber: "CASE9101" },
    { id: 4, caseNumber: "CASE1121" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCaseSearch = (e) => {
    setCaseSearchQuery(e.target.value);
  };

    // Filter cases whenever the search query changes
  //   useEffect(() => {
  //     setFilteredCases(
  //       mockCases.filter((c) =>
  //         c.caseNumber.toLowerCase().includes(caseSearchQuery.toLowerCase())
  //       )
  //     );
  //   }, [caseSearchQuery]);

  // const filteredUsers = mockUsers.filter((user) =>
  //   user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   user.email.toLowerCase().includes(searchQuery.toLowerCase())

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const filteredCases = mockCases.filter((c) =>
  //   c.caseNumber.toLowerCase().includes(caseSearchQuery.toLowerCase())
  // );

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
    console.log("this is userSelection");
  };

  const handleSelectCase = (caseNumber) => {
    getUserConfig({ doctor_id: selectedUser._id, patient_id: caseNumber });

    setSelectedCase(caseNumber);
    setLoading(true);
    setOpenCaseDialog(true);

    console.log("this is case selection");
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setSelectedUser(null);
    setCaseSearchQuery("");
    setOpenCaseDialog(false); // Close the case dialog when the user dialog is closed
  };

  const handleCloseCaseDialog = () => {
    setOpenCaseDialog(false);
    setSelectedCase(null);
    setCaseSearchQuery("");
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    }
  };

  const handleSave = () => {
    console.log("Selected checkboxes:", selectedCheckboxes);
    console.log(selectedCase, selectedUser);
    const userConfig = {
      patient_id: selectedCase,
      doctor_id: selectedUser._id,
      config: selectedCheckboxes,
    };

    updateConfig(userConfig);
    setOpenCaseDialog(false);
    setOpenUserDialog(false); // Close the dialogs after saving
  };

  return (
    <Box mt={10} px={2} className={classes.searchUserContainer}>
      <Box className={classes.searchBar}>
        <SearchIcon />
        <TextField
          label="Search User"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          margin="normal"
          variant="outlined"
          className={classes.searchField}
        />
      </Box>
      <List>
        {filteredUsers.map((user) => (
          <ListItem key={user.id} className={classes.userCardContainer}>
            <Card className={classes.userCard}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  onClick={() => handleSelectUser(user)}
                  style={{ cursor: "pointer" }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color="textSecondary">{user.email}</Typography>
                <Typography color="textSecondary">{user.phone}</Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {selectedUser && (
        <>
          <Dialog
            open={openUserDialog}
            onClose={handleCloseUserDialog}
            maxWidth="xs"
            PaperProps={{
              style: {
                width: "300px",
                maxWidth: "300px", // Custom width
                position: "absolute",
                left: "calc(50% - 310px)", // Adjust the left position
                top: "50%",
                transform: "translateY(-50%)",
              },
            }}
          >
            <DialogTitle>
              <strong>Search Patient Case Number</strong>
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                label="Search Case Number"
                value={caseSearchQuery}
                onChange={handleCaseSearch}
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.searchField}
              />
              <List>
                {filteredCases.map((c) => (
                  <ListItem
                    key={c.id}
                    button
                    onClick={() => handleSelectCase(c.id)}
                  >
                    <Typography variant="body1">{c.caseNumber}</Typography>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUserDialog}>Close</Button>
            </DialogActions>
          </Dialog>

          {selectedCase && (
            <Dialog
              open={openCaseDialog}
              onClose={handleCloseCaseDialog}
              maxWidth="xs"
              PaperProps={{
                style: {
                  width: "300px",
                  maxWidth: "300px", // Custom width
                  position: "absolute",
                  left: "calc(50% + 10px)", // Adjust the left position
                  top: "50%",
                  transform: "translateY(-50%)",
                },
              }}
            >
              <DialogTitle>
                <strong>Accessibility List</strong>
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="h6" component="div">
                  <strong>{selectedCase}</strong>
                </Typography>
                {/* <Box sx={{ maxHeight: '30vh', overflowY: 'auto', padding: '16px' }}>
                  <FormControl component="fieldset">
                       {["Doctor's Notes", "Patient's History", "Patient's Files"].map((label, index) => (
                      <FormControlLabel
                        key={index}
                        control={<Checkbox />}
                        label={label}
                        value={`checkbox${index + 1}`}
                        checked={selectedCheckboxes.includes(`checkbox${index + 1}`)}
                        onChange={handleCheckboxChange}
                        sx={{ mb: 1 }} 
                      />
                    ))}
                  </FormControl>
                </Box> */}
                {loading ? (
                  <Stack spacing={1}>
                    <Skeleton variant="rectangular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="retangular" width={210} height={60} />
                  </Stack>
                ) : (
                  <Box
                    sx={{
                      maxHeight: "30vh",
                      overflowY: "auto",
                      padding: "16px",
                    }}
                  >
                    <FormControl component="fieldset">
                      {Array.from({ length: 10 }).map(
                        (
                          _,
                          index // example: generate 10 checkboxes
                        ) => (
                          <FormControlLabel
                            key={index}
                            control={<Checkbox />}
                            label={`Checkbox Item ${index + 1}`}
                            value={`checkbox${index + 1}`}
                            checked={selectedCheckboxes.includes(
                              `checkbox${index + 1}`
                            )}
                            onChange={handleCheckboxChange}
                            sx={{ mb: 1 }} // Add margin between checkboxes
                          />
                        )
                      )}
                    </FormControl>
                  </Box>
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button onClick={handleCloseCaseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </Box>
  );
};

export default DoctorSearchDailog;
