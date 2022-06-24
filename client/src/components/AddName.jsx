import React, { useState } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
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
];

export default function AddName({ username, setAuth, setSuggestionState }) {
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
      setSuggestionState((prev) => {
        console.log("prev", prev)
        console.log("response--->", parseRes.addSuggestions[0])
                  return { ...prev, suggestions: [...prev.suggestions, parseRes.addSuggestions[0]] }
                })

    } catch (err) {
      console.error("Something went wrong", err.message);
    }
  };

  return (
    <main className="addName">
      <Button variant="contained" onClick={handleClickOpen} sx={{ bgcolor: "cadetblue" }}>
        Suggest a Name
      </Button>
      <Dialog
        open={open}

        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add a Name!"}</DialogTitle>
        <DialogContent>
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
