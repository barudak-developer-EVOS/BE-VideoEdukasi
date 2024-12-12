const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

app.use(bodyParser.json());
app.use("/api/accounts", accountRoutes);

module.exports = app;
