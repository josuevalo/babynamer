import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useCopy from "use-copy";
import "./App.css";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Profile({ setAuth, isAuthenticated }) {
  const [userState, setUserState] = useState({ user: {} });

  useEffect(() => {
    axios
      .get(`/api/user/${username}`)
      .then((response) => {
        console.log("Suggestions: ", response.data);
        console.log("RESPONSE", response);
        setUserState({
          user: response.data.user,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const { username } = useParams();
  // During development, the URL is local host, but will need to be updated once URL is hosted //
  const [copied, copy, setCopied] = useCopy(
    `http://localhost:3000/${username}`
  );

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const babyDueDate = dayjs(`${userState.user && userState.user.date}`).format(
    "dddd, MMMM DD, YYYY"
  );

  return (
    <main className="profile">
      <h1>PROFILE</h1>
      <h2>
       {userState.user && userState.user.username} 
      </h2>

      <div className="profile-div">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            ></Typography>
            <Typography variant="h5" component="div">
              Expecting: A {userState.user && userState.user.sex}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Due Date: {babyDueDate}
              <br />
              <br></br>
              <br></br>
              <Button variant="outlined">
                {copied ? (
                  "Copied to clipboard!"
                ) : (
                  <a onClick={copyText}>Share link</a>
                )}
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Button variant="outlined">Edit Profile</Button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </main>
  );
}
