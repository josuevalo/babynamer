const express = require('express');
const router  = express.Router();
const { getSuggestions } = require('../db/db-queries/suggestions-query');

// GET users table
router.get("/", (req, res) => {
  getSuggestions()
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