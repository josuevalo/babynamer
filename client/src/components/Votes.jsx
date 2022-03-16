import React, { useState } from "react";
import "../App.css";
import Fab from "@mui/material/Fab";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { pink } from "@mui/material/colors";
import Badge from "@mui/material/Badge";

export default function Votes({ suggestion }) {

let upVote = 0
let downVote = 5

  const [incCount, setIncCount] = useState(upVote);
  const incNum = () => {
    setIncCount(incCount + 1);
  };
  const [decCount, setDecCount] = useState(downVote);
  const decNum = () => {
    setDecCount(decCount + 1);
  };

  const onSubmitForm = async (type) => {
    let isUpVote;

    if (type === "increment") {
      isUpVote = true;
      incNum()
      console.log("SET UP VOTE INCREMENT", type);
    } else {
      console.log("SET UP VOTE DECREMENT", type);
      isUpVote = false;
      decNum()
    }

    try {
      const body = {
        suggestionId: suggestion.suggestion_id,
        voterId: 1,
        isUpVote,
      };
      console.log({ body });
      await fetch("http://localhost:5000/api/add-votes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <main className="votes">
      <Badge
        className="badgeNum"
        badgeContent={incCount}
        color="primary"
      >
        <Fab
          // onClick={incNum}
          name="increment"
          onClick={() => onSubmitForm("increment")}
          size="small"
          aria-label="like"
        >
          <ThumbUpAltIcon color="primary" />
        </Fab>
      </Badge>
      <Badge
        className="badgeNum"
        badgeContent={decCount}
        color="primary"
        sx={{ color: pink[500] }}
      >
        <Fab
          name="decrement"
          onClick={() => onSubmitForm("decrement")}
          // onClick={decNum}
          size="small"
          aria-label="like"
        >
          <ThumbDownAltIcon sx={{ color: pink[500] }} />
        </Fab>
      </Badge>
    </main>
  );
}
