const express = require('express');
const router  = express.Router();
const { getUser } = require('../db/db-queries/user-query');

router.get("/:username", (req, res) => {
  // console.log("req", req)
  const username = req.params.username
  getUser(username)
    .then((user) => {
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;