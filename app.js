// Require env file
require("dotenv").config();
const express = require("express");
const app = express();
const request = require("request");
const Product = require("./models/product");
const bodyParser = require("body-parser");
//const middleware = require("./middleware"); //Implicitly refers to index.js

// Require Mongoose
const mongoose = require("mongoose");

// Actual DB connection
mongoose.connect(process.env.DB_FULLPATH, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");

// Defining public folder
app.use(express.static(__dirname + "/public"));

// ROUTE VARIABLES
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/product");

// ROUTE INCLUDES
app.use("/", indexRoutes);
app.use("/advertenties", productRoutes);

// Start server
app.listen(process.env.PORT, () => console.log(`Webserver running on port ${process.env.PORT}!`));
