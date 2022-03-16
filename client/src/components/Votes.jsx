import React, { useEffect, useState } from "react";
import "../App.css";
import Fab from "@mui/material/Fab";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { pink } from "@mui/material/colors";
import Badge from "@mui/material/Badge";

export default function Votes({ suggestion }) {

  const fetchVotes = async () => {
    try {
      const response = await fetch(`/api/votes/get-votes/${suggestion.suggestion_id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const parseRes = await response.json();

      setIncCount(Number(parseRes.upVotes))
      setDecCount(Number(parseRes.downVotes))
      console.log("response for votes", parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);


  const [incCount, setIncCount] = useState();
  const incNum = () => {
    setIncCount(incCount + 1);
  };
  const [decCount, setDecCount] = useState();
  const decNum = () => {
    setDecCount(decCount + 1);
  };

  const onSubmitForm = async (type) => {
    let isUpVote;

    if (type === "increment") {
      isUpVote = true;
      incNum();
    } else {
      isUpVote = false;
      decNum();
    }

    try {
      const body = {
        suggestionId: suggestion.suggestion_id,
        voterId: 1,
        isUpVote,
      };
      console.log({ body });
      await fetch("/api/votes/add-vote", {
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
      <Badge className="badgeNum" badgeContent={incCount} color="primary">
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
