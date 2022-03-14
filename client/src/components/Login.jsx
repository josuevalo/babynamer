import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function Login({ setAuth, returningOpen, returningClickClose }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const { username, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.id]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        returningClickClose()
        console.log("Logged in Sucessfully")
        // toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        console.log("Error:", parseRes)
        // toast.error(parseRes);
      }
    } catch (err) {
      console.error("Something went wrong", err.message);
    }
  };
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
            onChange={onChange}
          />

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <DialogActions>
            <Button onClick={returningClickClose}>Cancel</Button>
            <Button onClick={onSubmitForm}>GO!</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  );
}
