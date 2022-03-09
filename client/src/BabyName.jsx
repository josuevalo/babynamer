import React from "react";
import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";

export default function BabyName() {
  const [state, setState] = useState({ suggestions: []});
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
  },[]);

  return (
    <main className="babynames">
      <h2>
        These are your babynames!
        {state.suggestions.map( d => <div>{d.name}{d.sex}{d.username}</div>)} 
      </h2>
    </main>
  );
}
