import React from "react";
import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

export default function BabyName() {
  const [state, setState] = useState({ suggestions: [] });
  useEffect(() => {
    axios
      .get("/api/suggestions") // Just to test that DB layer works
      .then((response) => {
        console.log("Suggestions: " + response.data);
        setState({
          suggestions: response.data.suggestions,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const nameSuggestion = state.suggestions.map((d) => {
    // <div>{d.name}{d.sex}{d.username}</div>
    return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={d.name} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
   ) });

  return (
    <main className="babynames">
      <h2>
        These are your babynames!
        
      </h2>

      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="secondary mailbox folders">
          <List>
          {nameSuggestion}

            {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem> */}
          </List>
        </nav>
      </Box>
    </main>
  );
}
