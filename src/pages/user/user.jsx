import React, { useState } from "react";
import { TextField, Box, List, ListItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    // Fetch users from the database
    const response = await fetch(`/api/users?search=${e.target.value}`);
    const data = await response.json();
    setUsers(data);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box mt={10} px={2}>
      <TextField
        label="Search User"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
      />
      <List>
        {users.map((user) => (
          <ListItem button onClick={() => handleSelectUser(user)} key={user.id}>
            {user.name}
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
