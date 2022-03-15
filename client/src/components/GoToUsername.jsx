import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function GoToUsername({ voterOpen, handleClickClose }) {
  const [inputs, setInputs] = useState({
    username: "",
  });

  const { username } = inputs;

  const onChange = e =>
  setInputs({ ...inputs, [e.target.id]: e.target.value });

  const navigate = useNavigate();

const onSubmitForm = (e) => {
  e.preventDefault();
  handleClickClose()
  navigate(`/${username}`);
}

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
            onChange={onChange}
          />
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={onSubmitForm}>GO!</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  );
}
