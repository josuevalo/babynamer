const db = require("../index");

const addSuggestions = (data) => {
  const { username, name, sex } = data;
  return db
    .query(`SELECT users.id FROM users WHERE username = $1`, [username])
    .then((userRes) => {
      const user_id = userRes.rows[0].id;

      db.query(
        `
    INSERT INTO suggestions(user_id, name, sex) VALUES ($1, $2, $3) RETURNING *;
  `,

        [user_id, name, sex]
      )

        .then((res) => {
          console.log("New suggestion entry inserted:", res.rows[0]);
          return res.rows;
        })
        .catch((err) => {
          console.log("DB error inserting new name suggestion: " + err.message);
        });
    });
};

module.exports = {
  addSuggestions,
};
