"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

// Dependencies
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const nodeSassMiddleware = require("node-sass-middleware");
const cookieSession = require("cookie-session");

//middleware
//scss styling
app.use(
  "/styles",
  nodeSassMiddleware({
    src: path.join(__dirname, "/../sass"),
    dest: path.join(__dirname, "/../public/styles"),
    debug: true,
    outputStyle: "expanded"
  })
);
//view engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["Cats Rule The World"],

    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

//Connect to MongoDB, once connected, pass through to DataHelpers
MongoClient.connect(
  MONGODB_URI,
  (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }

    const DataHelpers = require("./lib/data-helpers.js")(db);

    // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
    // so it can define routes that use it to interact with the data layer.
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    const usersRoutes = require("./routes/users")(DataHelpers);

    // Mount the tweets routes at the "/tweets" path prefix:
    app.use("/tweets", tweetsRoutes);
    app.use("/users", usersRoutes);
  }
);

// serves main page
app.get("/", (req, res) => {
  let templateVars = {
    cookie: req.session
  };

  res.render("index", templateVars);
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Example app listening on port " + PORT);
});
