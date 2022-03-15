import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function VoterRegistration({ setAuth, handleClose, open }) {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    date: "",
    sex: "",
  });

  const { username, email, password, date, sex } = inputs;

  const onChange = e => {
    console.log("event", e)
    setInputs({ ...inputs, [e.target.id || e.target.name]: e.target.value });
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { username, email, password, due_date: date, baby_sex: sex };
      console.log({body})
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
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
        handleClose()
        console.log("Registration Successful!")
        // toast.success("Register Successfully");
      } else {
        setAuth(false);
        console.log("Error with Registration", parseRes)
        // toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <main className="register">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please register so we can keep track your suggestions and votes for you!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={onChange}
          />

          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitForm}>Join!</Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  );
}
