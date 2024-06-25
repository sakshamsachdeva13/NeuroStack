import React, { useState } from "react";
import { TextField, Box, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Card, CardContent, boxClasses } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import classes from "./user.module.css";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "234-567-8901" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "345-678-9012" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", phone: "456-789-0123" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
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
                <Typography variant="h6" component="div">
                  {user.name}
                </Typography>
                <Typography color="textSecondary">
                  {user.email}
                </Typography>
                <Typography color="textSecondary">
                  {user.phone}
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" onClick={() => handleSelectUser(user)} className={classes.viewDetailsButton}>
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      {selectedUser && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>User Details</DialogTitle>
          <DialogContent>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default SearchUser;
