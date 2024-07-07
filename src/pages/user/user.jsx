import React, { useState } from "react";
import { TextField, Box, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Card, CardContent, Checkbox, FormControlLabel, FormControl } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import classes from "./user.module.css";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const mockUsers = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "123-456-7890" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phone: "234-567-8901" },
    { id: 3, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", phone: "345-678-9012" },
    { id: 4, firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com", phone: "456-789-0123" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = mockUsers.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
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
    setOpen(false); // Close the dialog after saving
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
                <Typography variant="h6" component="div" onClick={() => handleSelectUser(user)} style={{ cursor: "pointer" }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography color="textSecondary">
                  {user.email}
                </Typography>
                <Typography color="textSecondary">
                  {user.phone}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle><strong>Accessibility List</strong></DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6" component="div">
              <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>
            </Typography>
            <Box sx={{ maxHeight: '30vh', overflowY: 'auto', padding: '16px' }}>
              <FormControl component="fieldset">
                {Array.from({ length: 10 }).map((_, index) => ( // example: generate 20 checkboxes
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={`Checkbox Item ${index + 1}`}
                    value={`checkbox${index + 1}`}
                    checked={selectedCheckboxes.includes(`checkbox${index + 1}`)}
                    onChange={handleCheckboxChange}
                    sx={{ mb: 1 }} // Add margin between checkboxes
                  />
                ))}
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default SearchUser;
