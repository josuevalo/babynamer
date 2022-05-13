import React from "react";
import { useParams } from "react-router-dom";
import useCopy from "use-copy";
import "./App.css";
import Button from "@mui/material/Button";

export default function Profile({ setAuth, isAuthenticated }) {
  const { username } = useParams();
  // During development, the URL is local host, but will need to be update once URL is hosted //
  const [copied, copy, setCopied] = useCopy(
    `http://localhost:3000/${username}`
  );

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <main className="profile">
      <h1>Welcome to your profile!</h1>
      <Button variant="outlined">Edit Profile</Button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Button variant="outlined">
        {copied ? "Copied to clipboard!" : <a onClick={copyText}>Copy text</a>}
      </Button>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </main>
  );
}
