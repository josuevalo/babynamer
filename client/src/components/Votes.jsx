import React, { useEffect, useState } from "react";
import "../App.css";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { blue, red } from "@mui/material/colors";
import Badge from "@mui/material/Badge";

export default function Votes({ suggestion, voter, updateSuggestion }) {
  const fetchVotes = async () => {
    try {
      const response = await fetch(
        `/api/votes/get-votes/${suggestion.suggestion_id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const parseRes = await response.json();

      const upvotes = Number(parseRes.upVotes.length);
      const downvotes = Number(parseRes.downVotes.length)
      setIncCount(upvotes);
      setDecCount(downvotes);

      // suggestion.upvotes = upvotes;
      // suggestion.downvotes = downvotes;
      // updateSuggestion(suggestion);

      console.log("response for votes", parseRes);
      console.log("VOTERRR", voter);
      const findVoterInUpVotes = parseRes.upVotes.find(
        ({ voter_id }) => voter_id === voter
      );
      const findVoterInDownVotes = parseRes.downVotes.find(
        ({ voter_id }) => voter_id === voter
      );
      console.log("uppppp", findVoterInUpVotes);
      console.log("dowwwwnnn", findVoterInDownVotes);
      const hasVoted = findVoterInUpVotes || findVoterInDownVotes;
      setIsDisabled(hasVoted);
      // Check if user has voted for that suggestion, if so, change icon colour //
      if (findVoterInUpVotes) {
        setLiked({ color: red[500] });
      } else if (findVoterInDownVotes) {
        setDisliked({ color: blue[900] });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Once the voter is checked, do not allow to vote for same suggestion again
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (voter) {
      fetchVotes();
    }
  }, [voter]);

  const [incCount, setIncCount] = useState(0);
  const incNum = () => {
    setIncCount(incCount + 1);
    // suggestion.upvotes = incCount + 1;
    // updateSuggestion(suggestion);
  };
  const [decCount, setDecCount] = useState(0);
  const decNum = () => {
    setDecCount(decCount + 1);
    // suggestion.downvotes = decCount + 1;
    // updateSuggestion(suggestion);
  };

  const [liked, setLiked] = useState();
  const [disliked, setDisliked] = useState();
  const onSubmitForm = async (type) => {
    setIsDisabled(true);
    let isUpVote;
    // Change colour of icon when user votes //
    if (type === "increment") {
      isUpVote = true;
      incNum();
      setLiked({ color: red[500] });
    } else {
      isUpVote = false;
      decNum();
      setDisliked({ color: blue[900] });
    }

    try {
      const body = {
        suggestionId: suggestion.suggestion_id,
        voterId: voter,
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
          disabled={isDisabled}
          name="increment"
          onClick={() => onSubmitForm("increment")}
          size="small"
          aria-label="like"
        >
          <FavoriteIcon sx={liked} />
        </Fab>
      </Badge>
      <Badge className="badgeNum" badgeContent={decCount} color="primary">
        <Fab
          disabled={isDisabled}
          name="decrement"
          onClick={() => onSubmitForm("decrement")}
          size="small"
          aria-label="like"
        >
          <HeartBrokenIcon sx={disliked} />
        </Fab>
      </Badge>
    </main>
  );
}
