const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require("./routes/accountRoutes");
const videoRoutes = require("./routes/videoRoutes");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use("/api/accounts", accountRoutes);
app.use("/api/videos", videoRoutes);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

module.exports = app;
