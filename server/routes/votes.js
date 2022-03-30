const express = require("express");
const router = express.Router();
const {
  addVote,
  getUpVotes,
  getDownVotes,
} = require("../db/db-queries/votes-query");

router.post("/add-vote", (req, res) => {
  const { suggestionId, voterId, isUpVote } = req.body;
  const data = {
    suggestionId,
    voterId,
    isUpVote,
  };
  addVote(data)
    .then((addVote) => {
      res.json({ addVote });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/get-votes/:suggestion_id", (req, res) => {
  const suggestionId = req.params.suggestion_id;
  const data = {
    suggestionId,
  };

  Promise.all([getUpVotes(data), getDownVotes(data)])
    .then(([upVotes, downVotes]) => {
      console.log("up", upVotes);
      console.log("down", downVotes);
      return res.json({
        upVotes: upVotes,
        downVotes: downVotes,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
