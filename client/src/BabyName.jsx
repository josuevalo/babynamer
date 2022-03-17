import React from "react";
import axios from "axios";
import Votes from "./components/Votes";
import AddName from "./components/AddName";
import VoterRegistration from "./components/VoterRegistration";
import "./index.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function BabyName({ setAuth, isAuthenticated }) {

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
          <Votes suggestion={suggestion} />
        </ListItem>
        <Divider />
      </>
    );
  });


 const babyDueDate =  dayjs(`${suggestionState.suggestions[0] && suggestionState.suggestions[0].date}`).format('dddd, MMMM DD, YYYY')

  return (
    <main className="babynames">
      <VoterRegistration setAuth={setAuth} isAuthenticated={isAuthenticated} />
      <h2>
        These are the name suggestions for{" "}
        {suggestionState.suggestions[0] && suggestionState.suggestions[0].username}'s baby{" "}
      </h2>
      <h3>Profile</h3>
      <h4>{suggestionState.suggestions[0] && suggestionState.suggestions[0].baby_sex}</h4>
      <h4>{babyDueDate}</h4>
      
      <h3> Have a suggestion? </h3>
      <AddName username={username} setAuth={setAuth} setSuggestionState={setSuggestionState} />
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List>{nameSuggestion}</List>
        </nav>
      </Box>
    </main>
  );
}
