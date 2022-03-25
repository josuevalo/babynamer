import React, { useEffect, useState } from "react";
import "../App.css";
import Fab from "@mui/material/Fab";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { pink } from "@mui/material/colors";
import Badge from "@mui/material/Badge";

export default function Votes({ suggestion, voter }) {

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


  const [incCount, setIncCount] = useState(0);
  const incNum = () => {
    setIncCount(incCount + 1);
  };
  const [decCount, setDecCount] = useState(0);
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
          name="increment"
          onClick={() => onSubmitForm("increment")}
          size="small"
          aria-label="like"
        >
          <FavoriteIcon sx={{ color: pink[500] }}  />
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
          size="small"
          aria-label="like"
        >
          <HeartBrokenIcon  />
        </Fab>
      </Badge>
    </main>
  );
}
