// Require env file
require('dotenv').config();
const express = require("express");
const app = express();
const request = require("request");
//const middleware = require("./middleware"); //Implicitly refers to index.js

// Set view engine to EJS
app.set("view engine", "ejs");
// Defining public folder
app.use(express.static(__dirname + '/public'));

// ROUTE VARIABLES
const indexRoutes = require("./routes/index");

// ROUTE INCLUDES
app.use("/", indexRoutes);

// Start server
app.listen(process.env.PORT, () => console.log(`Webserver running on port ${process.env.PORT}!`));