require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// Seeding the database
const seed = require("./seed/seed");
//seed.flushAndSeed();


//const middleware = require("./middleware"); //Implicitly refers to index.js

//Include Moment package
app.locals.moment = require("moment");

// Set Moment to dutch locale
app.locals.moment.locale("nl");

// Actual DB connection
mongoose.connect(process.env.DB_FULLPATH, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.set("useCreateIndex", true);

// Set view engine to EJS
app.set("view engine", "ejs");

app.use(express.json());

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

// Setting up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// Stripe Payment requirement with secret key
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// ROUTE VARIABLES
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const bidRoutes = require("./routes/bid");
const stripeRoutes = require("./routes/stripe");
const authRoutes = require("./routes/auth-routes");
const accountRoutes = require("./routes/account");
const messageRoutes = require("./routes/message");

// ROUTE INCLUDES
app.use(methodOverride("_method"));
app.use("/", indexRoutes);
app.use("/advertenties", productRoutes);
app.use("/categorieen", categoryRoutes);
app.use("/advertenties/:product_id/bids", bidRoutes);
app.use("/stripe", stripeRoutes);
app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/advertenties/:product_id/messages", messageRoutes);

// Start server
app.listen(process.env.PORT, () => console.log(`Webserver running on port ${process.env.PORT}!`));
