import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

const babyOptions = [
  {
    value: "Boy",
    label: "Boy",
  },
  {
    value: "Girl",
    label: "Girl",
  },
  {
    value: "Surprise",
    label: "Surprise",
  },
];

export default function Register({ setAuth, handleClose, open }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    date: "",
    sex: "",
  });

  const { username, name,  email, password, date, sex } = inputs;

  const onChange = (e) => {
    console.log("event", e);
    setInputs({ ...inputs, [e.target.id || e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, name, email, password, due_date: date, baby_sex: sex };
      console.log({ body });
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        handleClose();
        navigate(`/${username}`);
        console.log("Registration Successful!");
        // toast.success("Register Successfully");
      } else {
        setAuth(false);
        console.log("Error with Registration", parseRes);
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
            Please register so we can keep track of the name suggestions for
            you!
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

<TextField
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

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={onChange}
          />

          <DialogContentText>Due Date</DialogContentText>
          <TextField
            margin="dense"
            id="date"
            label=""
            type="date"
            fullWidth
            variant="standard"
            onChange={onChange}
          />

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                select
                name="sex"
                label="Select"
                value={sex}
                onChange={onChange}
                helperText="Please select the sex of the baby"
              >
                {babyOptions.map((option) => (
                  <MenuItem name="sex" key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitForm}>Join!</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
