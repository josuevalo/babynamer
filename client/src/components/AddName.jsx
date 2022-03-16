import React, { useState } from "react";
import "../App.css";
// import Fab from "@mui/material/Fab";
// import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const babyOptions = [
  {
    value: "Boy",
    label: "Boy",
  },
  {
    value: "Girl",
    label: "Girl",
  },
];

export default function AddName({ username, setAuth }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [inputs, setInputs] = useState({
    name: "",
    sex: "",
  });

  const { name, sex } = inputs;

  const onChange = (e) => 
  setInputs({ ...inputs, [e.target.id || e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    handleClose();
    e.preventDefault();
    try {
      const body = { name, sex, username };
      const response = await fetch("/api/add-suggestions", {
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
        console.log("Name added Sucessfully");
        // toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        console.log("Error:", parseRes);
        // toast.error(parseRes);
      }
    } catch (err) {
      console.error("Something went wrong", err.message);
    }
  };

  return (
    <main className="addName">
      {/* <Fab color="success" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab> */}
      <Button variant="outlined" onClick={handleClickOpen}>
        Suggest a Name
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add a Name!"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Please enter a Name
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name Suggestion"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
          <div className="select-sex">
            <TextField
              // id="sex"
              name="sex"
              select
              label="Select"
              value={sex}
              helperText="Please select the gender of the name"
              onChange={onChange}
            >
              {babyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitForm}>Submit!</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
