import React from "react";
import axios from "axios";
import Votes from "./components/Votes";
import AddName from "./components/AddName";
import FilterBySex from "./components/FilterBySex";
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
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

export default function BabyName({ setAuth, isAuthenticated, authId }) {
  const [voter, setVoter] = useState();

  const [filteredSex, setFilteredSex] = useState("All");

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

  const selectedSex = filteredSex;

  const nameSuggestion = suggestionState.suggestions.filter(suggestion => selectedSex === "All" ? true : suggestion.sex === selectedSex).map((suggestion) => {
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
  ).format("MMMM D, YYYY");

  return (
    <main className="babynames">
      <VoterRegistration
        setAuth={setAuth}
        isAuthenticated={isAuthenticated}
        setVoter={setVoter}
      />

      <div className="profile-div">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 2 }}
              gutterBottom
              typography={{
                textDecoration: "underline rgba(0, 0, 0, 0.3) 4px",
              }}
            >
              {suggestionState.user &&
                suggestionState.user.name &&
                suggestionState.user.name.toUpperCase()}
            </Typography>
            <Typography sx={{ mb: 2 }} component="div">
              EXPECTING:{" "}
              <b>
                A{" "}
                {suggestionState.user &&
                  suggestionState.user.sex &&
                  suggestionState.user.sex.toUpperCase()}
              </b>
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              DUE DATE: <b>{babyDueDate && babyDueDate.toUpperCase()}</b>
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }} gutterBottom>
        Have a name idea for {suggestionState.user && suggestionState.user.name}
        ?
      </Typography>
      <AddName
        username={username}
        setAuth={setAuth}
        setSuggestionState={setSuggestionState}
      />
      <br />
      <hr />
      {/* <Box sx={{ minWidth: 120 }} id="sort-box">
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
      </Box> */}

      <Typography sx={{ mt: 2, mb: 2 }} component="div" color="text.secondary">
        Vote for your favourite names below!
      </Typography>
      <FilterBySex setFilteredSex={setFilteredSex} />
      <div className="name-suggestion">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="secondary mailbox folders">
            <List>{nameSuggestion}</List>
          </nav>
        </Box>
      </div>
    </main>
  );
}
