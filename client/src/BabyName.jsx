import React from "react";
import axios from "axios";
import Votes from "./components/Votes";
import AddName from "./components/AddName";
import VoterRegistration from "./components/VoterRegistration";
import "./index.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function BabyName({ setAuth, isAuthenticated }) {
  const [voter, setVoter] = useState();

  const [suggestionState, setSuggestionState] = useState({ suggestions: [] });

  const { username } = useParams();
  useEffect(() => {
    axios
      .get(`/api/suggestions/${username}`)
      .then((response) => {
        console.log("Suggestions: ", response.data);
        setSuggestionState({
          suggestions: response.data.suggestions,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const nameSuggestion = suggestionState.suggestions.map((suggestion) => {
    return (
      <>
        <ListItem>
          <ListItemText primary={suggestion.name} />
          <Votes suggestion={suggestion} voter={voter} />
        </ListItem>
        <Divider />
      </>
    );
  });

  const babyDueDate = dayjs(
    `${suggestionState.suggestions[0] && suggestionState.suggestions[0].date}`
  ).format("dddd, MMMM DD, YYYY");

  return (
    <main className="babynames">
      <VoterRegistration
        setAuth={setAuth}
        isAuthenticated={isAuthenticated}
        setVoter={setVoter}
      />
      <h2>
        These are the name suggestions for{" "}
        {suggestionState.suggestions[0] &&
          suggestionState.suggestions[0].username}
        's baby{" "}
      </h2>

      <div className="profile-div">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Profile
        </Typography>
            <Typography variant="h5" component="div">
            Expecting: A{" "}
              {suggestionState.suggestions[0] &&
                suggestionState.suggestions[0].baby_sex}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Due Date: {babyDueDate}
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>

      <h3> Have a suggestion? </h3>
      <AddName
        username={username}
        setAuth={setAuth}
        setSuggestionState={setSuggestionState}
      />
      <div className="name-suggestion">
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="secondary mailbox folders">
            <List>{nameSuggestion}</List>
          </nav>
        </Box>
      </div>
    </main>
  );
}
