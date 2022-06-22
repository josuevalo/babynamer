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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BabyName({ setAuth, isAuthenticated, authId }) {
  const [voter, setVoter] = useState();

  const [suggestionState, setSuggestionState] = useState({
    suggestions: [],
    user: {},
  });

  const { username } = useParams();

  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
    if (event.target.value === "Most Popular") {
// Use useEffect to build out logic to have dependancies of sort/setSort and suggestionsState //
    } else {

    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setVoter(authId);
    }
  }, [isAuthenticated, authId]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/suggestions/${username}`),
      axios.get(`/api/user/${username}`),
    ])
      .then((response) => {
        console.log("Suggestions: ", response.data);
        console.log("RESPONSE", response);
        setSuggestionState({
          suggestions: response[0].data.suggestions,
          user: response[1].data.user,
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
    `${suggestionState.user && suggestionState.user.date}`
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
        {suggestionState.user && suggestionState.user.name}
        's baby{" "}
      </h2>

      <div className="profile-div">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Profile
            </Typography>
            <Typography variant="h5" component="div">
              Expecting: A {suggestionState.user && suggestionState.user.sex}
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



      <Box 
      sx={{ minWidth: 120 }}
      id="sort-box"
      >
         <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value={10}>Most Popular</MenuItem>
            <MenuItem value={20}>Least Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>



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
