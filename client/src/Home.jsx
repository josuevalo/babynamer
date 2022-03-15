import "./index.css";
import * as React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import GoToUsername from "./components/GoToUsername";
import Button from "@mui/material/Button";

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
        <GoToUsername
          voterOpen={voterOpen}
          handleClickClose={handleClickClose}
        />
      </div>
      <br></br>
      <h3>Or Are You a</h3>

      <Button variant="outlined" onClick={handleOpen}>
        New Member
      </Button>
      <Register handleClose={handleClose} open={open} setAuth={setAuth} />

      <div>
        <Button
          variant="outlined"
          onClick={returningClickOpen}
          setAuth={setAuth}
        >
          Returning User
        </Button>
        <Login
          returningOpen={returningOpen}
          returningClickClose={returningClickClose}
        />
      </div>
    </main>
  );
}
