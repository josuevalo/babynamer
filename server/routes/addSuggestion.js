const express = require('express');
const router  = express.Router();
const { addSuggestions } = require('../db/db-queries/add-suggestions-query');

router.post("/", (req, res) => {
  const { username, name, sex } = req.body;
  const data = {
    username,
    name,
    sex,
  }
  addSuggestions(data)
    .then((addSuggestions) => {
      console.log("add suggestions", addSuggestions)
      return res.json({ addSuggestions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;