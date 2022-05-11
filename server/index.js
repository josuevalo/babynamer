const Express = require("express");
const App = Express();
const cors = require('cors');


// Middleware //

App.use(cors());
App.use(Express.json())

// Routes //
const suggestionsRoutes = require("./routes/suggestions");
const userRoutes = require("./routes/user");
const addSuggestionsRoutes = require("./routes/addSuggestion")
const votesRoutes = require("./routes/votes")
const jwtAuthRoutes = require("./routes/jwtAuth");

App.use("/api/user", userRoutes);
App.use("/api/suggestions", suggestionsRoutes);
App.use("/api/add-suggestions", addSuggestionsRoutes);
App.use("/api/votes", votesRoutes);
App.use("/api/auth", jwtAuthRoutes);

App.listen(5000, () => {
  console.log("Server is listening on port 5000 🎉 ");
});





