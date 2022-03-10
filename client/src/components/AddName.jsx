import React from "react";
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

export default function AddName() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [sexOfBaby, setSexOfBaby] = React.useState("Sex of Baby");

  const handleChange = (event) => {
    setSexOfBaby(event.target.value);
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
          />
          <div className="select-sex">
            <TextField
              id="outlined-select-sex"
              select
              label="Select"
              value={sexOfBaby}
              onChange={handleChange}
              helperText="Please select the gender of the name"
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
          <Button onClick={handleClose}>Submit!</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
