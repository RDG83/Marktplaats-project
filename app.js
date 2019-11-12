// Require env file
require('dotenv').config();
const express = require("express");
const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");

// ROUTE VARIABLES
const indexRoutes = require("./routes/index");

// ROUTE INCLUDES
app.use("/", indexRoutes);

// Start server
app.listen(process.env.PORT, () => console.log(`Webserver running on port ${process.env.PORT}!`));