// Require env file
require("dotenv").config();
const express = require("express");
const app = express();
const request = require("request");
const Product = require("./models/product");
const Bid = require("./models/bid");
const methodOverride = require('method-override');
//const middleware = require("./middleware"); //Implicitly refers to index.js

// Require Mongoose
const mongoose = require("mongoose");

// Actual DB connection
mongoose.connect(process.env.DB_FULLPATH, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Set view engine to EJS
app.set("view engine", "ejs");

// Defining public folder
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// ROUTE VARIABLES
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const bidRoutes = require("./routes/bid");

// ROUTE INCLUDES
app.use(methodOverride("_method"));
app.use("/", indexRoutes);
app.use("/advertenties", productRoutes);
app.use("/categorieen", categoryRoutes);
app.use("/advertenties/:product_id/bids", bidRoutes);

// Start server
app.listen(process.env.PORT, () => console.log(`Webserver running on port ${process.env.PORT}!`));
