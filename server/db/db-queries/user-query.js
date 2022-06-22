const db = require('../index');

const getUser = (username) => {
  return db.query(`
  SELECT baby_sex as sex, due_date as date, email, name, username, id
  FROM users
  WHERE username = $1;`,[username])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log('DB error fetching users: ' + err.message);
    });
};

module.exports = {
  getUser,
};