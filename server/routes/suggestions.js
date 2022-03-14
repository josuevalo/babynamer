const express = require('express');
const router  = express.Router();
const { getSuggestions } = require('../db/db-queries/suggestions-query');

router.get("/:username", (req, res) => {
  console.log("req", req)
  const username = req.params.username
  getSuggestions(username)
    .then((suggestions) => {
      res.json({ suggestions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// export router object
module.exports = router;