import "./index.css";
import * as React from "react";
import Register from './components/Register'
import Login from './components/Login'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function Home({ setAuth }) {
  const [open, setOpen] = React.useState(false);
  const [returningOpen, setreturningOpen] = React.useState(false);
  const returningClickClose = () => setreturningOpen(false);
  const returningClickOpen = () => {
    setreturningOpen(true);
  };

  const [voterOpen, setVoterOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => setVoterOpen(false);
  const handleClickOpen = () => {
    setVoterOpen(true);
  };


  return (
    <main className="home">
      <h2>Welcome to babynamer!</h2>
      <h3>Do you want to:</h3>

      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Suggest and Vote
        </Button>
        <Dialog open={voterOpen} onClose={handleClickClose}>
          <DialogTitle>Voters</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Know the username of the upcoming baby? Enter it here and we'll
              take you to their page!
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
      </div>

      <br></br>

      <h3>Or Are You a</h3>

    
        <Button variant="outlined" onClick={handleOpen}>
          New Member
        </Button>
        <Register handleClose={handleClose} open={open}  setAuth={setAuth}/>
        

      <div>
        <Button variant="outlined" onClick={returningClickOpen} setAuth={setAuth}>
          Returning User
        </Button>
        <Login returningOpen={returningOpen} returningClickClose={returningClickClose}/>
      </div>
    </main>
  );
}
