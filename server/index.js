const Express = require("express");
const App = Express();
const cors = require('cors');
const pool = require('./db/index.js')

// Middleware //

App.use(cors());
App.use(Express.json())

// Routes //


App.listen(5000, () => {
  console.log("Server is listening on port 5000 🎉 ");
});
