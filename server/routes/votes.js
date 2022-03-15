const express = require('express');
const router  = express.Router();
const { addVote } = require('../db/db-queries/votes-query');

router.post("/", (req, res) => {
  const { suggestionId, voterId, isUpVote } = req.body;
  const data = {
    suggestionId,
    voterId,
  isUpVote,
  }
  addVote(data)
    .then((addVote) => {
      res.json({ addVote });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;