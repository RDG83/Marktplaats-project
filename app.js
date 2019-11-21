require("dotenv").config();
const express = require("express");
const app = express();
const request = require("request");
const Product = require("./models/product");
const Bid = require("./models/bid");
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
//const middleware = require("./middleware"); //Implicitly refers to index.js

app.locals.moment = require("moment");

// Actual DB connection
mongoose.connect(process.env.DB_FULLPATH, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Set view engine to EJS
app.set("view engine", "ejs");

// Defining public folder
app.use(express.static(__dirname + "/public"));

// For using nested query string objects
app.use(express.urlencoded({ extended: true }));

// Setting up session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "montessori team rules",
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
    // cookie staat uit, anders werkt flash niet
  })
);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

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
