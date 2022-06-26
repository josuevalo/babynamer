const Pool = require('pg').Pool;
require('dotenv').config({
    path: '../.env'
  });

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
  dbParams.ssl = { rejectUnauthorized: false };
} else {
  dbParams = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    jwtSecret: process.env.JWT_SECRET
  };
}

// const devConfig = {
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     database: process.env.PG_DATABASE,
//     jwtSecret: process.env.JWT_SECRET
// }

const pool = new Pool(dbParams);

pool.connect((err,client) => {
  if (!err) {
    console.log('DB in db.index.js connected.\nClient => ', client.user);
  } else {
    console.log('Error: ', err);
  }
});

module.exports = pool;