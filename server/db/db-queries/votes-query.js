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
          console.log("Vote for name inserted:", res.rows[0]);
          return res.rows;
        })
        .catch((err) => {
          console.log("DB error inserting new vote: " + err.message);
    });
};


const getUpVotes = (data) => {
  const { suggestionId } = data;
  return db.query(
        `
    SELECT * from votes WHERE suggestion_id = $1 AND is_up_vote = true;
  `,
        [suggestionId]
      )

        .then((res) => {
          console.log("Upvote count:", res.rows[0]);
          return res.rows;
        })
        .catch((err) => {
          console.log("DB error with upvote: " + err.message);
    });
};

const getDownVotes = (data) => {
  const { suggestionId } = data;
  return db.query(
        `
    SELECT * from votes WHERE suggestion_id = $1 AND is_up_vote = false;
  `,
        [suggestionId]
      )

        .then((res) => {
          console.log("Downvote count:", res.rows[0]);
          return res.rows;
        })
        .catch((err) => {
          console.log("DB error with downvote: " + err.message);
    });
};

module.exports = {
  addVote, getUpVotes, getDownVotes
};
