import React from "react";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Login({ voterOpen, handleClickClose }) {


  return (
    <main className="login">
      <Dialog open={voterOpen} onClose={handleClickClose}>
        <DialogTitle>Voters</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Know the username of the upcoming baby? Enter it here and we'll take
            you to their page!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="username"
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={handleClickClose}>GO!</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  );
}
