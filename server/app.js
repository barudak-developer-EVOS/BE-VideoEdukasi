const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require("./routes/accountRoutes");
const videoRoutes = require("./routes/videoRoutes");
const path = require("path");
const app = express();
const commentRoutes = require("./routes/commentRoutes");

// Parsing JSON
app.use(express.json());

// Parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use("/api/accounts", accountRoutes);
app.use("/api/videos", videoRoutes);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/comments", commentRoutes);

module.exports = app;
