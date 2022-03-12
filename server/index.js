const Express = require("express");
const App = Express();
const cors = require('cors');


// Middleware //

App.use(cors());
App.use(Express.json())

// Routes //
const suggestionsRoutes = require("./routes/suggestions");
const jwtAuthRoutes = require("./routes/jwtAuth");

App.use("/api/suggestions", suggestionsRoutes);
App.use("/api/auth", jwtAuthRoutes);

App.listen(5000, () => {
  console.log("Server is listening on port 5000 🎉 ");
});
