import "./index.css";
import * as React from "react";
import Button from "@mui/material/Button";
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

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [sexOfBaby, setSexOfBaby] = React.useState("EUR");

  const handleChange = (event) => {
    setSexOfBaby(event.target.value);
  };

  return (
    <main className="home">
      <h2>Welcome to babynamer!</h2>
      <h3>Are you:</h3>

      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          New Member
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
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

            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />

            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />

            <DialogContentText>Due Date</DialogContentText>
            <TextField
              margin="dense"
              id="duedate"
              label=""
              type="date"
              fullWidth
              variant="standard"
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
                  id="outlined-select-sex"
                  select
                  label="Select"
                  value={sexOfBaby}
                  onChange={handleChange}
                  helperText="Please select the sex of the baby"
                >
                  {babyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Join!</Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
}
