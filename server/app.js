const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require("./routes/accountRoutes");
const videoRoutes = require("./routes/videoRoutes");
const commentRoutes = require("./routes/commentRoutes");
const path = require("path");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");

app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded form data
app.use(bodyParser.json()); // Parsing JSON

// Routes
app.use("/api/accounts", accountRoutes); // Middleware for account routes
app.use("/api/videos", videoRoutes); // Middleware for video routes
app.use("/api/comments", commentRoutes); // Middleware for comment routes
app.use("/uploads", express.static(path.join(__dirname, "./uploads"))); // Middleware for serving static files

// swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
