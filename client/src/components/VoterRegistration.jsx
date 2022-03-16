import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function VoterRegistration({ setAuth }) {

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });

  const { name, email } = inputs;

  const onChange = e => {
    console.log("event", e)
    setInputs({ ...inputs, [e.target.id || e.target.name]: e.target.value });
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, email };
      console.log({body})
      const response = await fetch(
        "http://localhost:5000/api/auth/voter-registration",
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


  const [open, setOpen] = React.useState(true);
  // if (setAuth(true)) {
  //   setOpen(false);
  // } else {
  //   setOpen(true);
  // }
  const handleClose = () => setOpen(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <main className="voter-registration">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>WELCOME!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please register so we can keep track your suggestions and votes for you!
            <br></br>
            If you have already registered, you can use the same form to login.
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
          <Button onClick={onSubmitForm}>Go</Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  );
}
