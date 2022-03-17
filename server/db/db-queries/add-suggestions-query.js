const db = require("../index");

const addSuggestions = (data) => {
  const { username, name, sex } = data;
  return db
    .query(`SELECT users.id FROM users WHERE username = $1`, [username])
    .then((userRes) => {
      const user_id = userRes.rows[0].id;

      return db
        .query(
          `
        WITH inserted AS (
    INSERT INTO suggestions(user_id, name, sex) VALUES ($1, $2, $3) RETURNING *)
    SELECT inserted.id as suggestion_id, inserted.name as name, inserted.sex as sex, users.id as user_id, users.username as username, users.due_date as date, users.baby_sex
    FROM inserted 
    JOIN users 
    ON (inserted.user_id = $1) 
    WHERE username = $4;
  `,
          [user_id, name, sex, username]
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
