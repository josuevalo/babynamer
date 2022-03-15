const db = require("../index");

const addVote = (data) => {
  const { suggestionId, voterId, isUpVote } = data;
  return db.query(
        `
    INSERT INTO votes(suggestion_id, voter_id, is_up_vote) VALUES ($1, $2, $3) RETURNING *;
  `,

        [suggestionId, voterId, isUpVote]
      )

        .then((res) => {
          console.log("New suggestion entry inserted:", res.rows[0]);
          return res.rows;
        })
        .catch((err) => {
          console.log("DB error inserting new vote: " + err.message);
    });
};

module.exports = {
  addVote,
};
