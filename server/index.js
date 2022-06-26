const Express = require("express");
const App = Express();
const cors = require('cors');
const BodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT | 5000;

if (process.env.NODE_ENV === "production") {
  App.use(Express.static(path.resolve(__dirname, '../client/build')));
} else {
  App.use(Express.static('public'));
}

// Middleware //

App.use(cors());
App.use(Express.json())

// Express Configuration
App.use(BodyParser.urlencoded({
  extended: false
}));
App.use(BodyParser.json());

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

App.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

App.listen(port, () => {
  console.log(`Server is listening on port ${port} 🎉 `);
});





