import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function Register({ setAuth, returningOpen, returningClickClose }) {
  return (
    <main className="login">
      <Dialog open={returningOpen} onClose={returningClickClose}>
        <DialogTitle>Returning User</DialogTitle>
        <DialogContent>
          <DialogContentText>Login</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="returningPassword"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button onClick={returningClickClose}>Cancel</Button>
            <Button onClick={returningClickClose}>GO!</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  );
}
