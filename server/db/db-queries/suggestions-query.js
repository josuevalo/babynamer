const db = require('../index');

const getSuggestions = (username) => {
  return db.query(`
  SELECT suggestions.id as suggestion_id, suggestions.name as name, suggestions.sex as sex, users.id as user_id, users.username as username, users.due_date as date
  FROM suggestions 
  INNER JOIN users 
  ON (suggestions.user_id = users.id) 
  WHERE username = $1;`,[username])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching suggestions: ' + err.message);
    });
};

module.exports = {
  getSuggestions,
};