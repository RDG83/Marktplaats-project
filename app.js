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
const Product = require("./models/product")
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
const stripe = require('stripe')('sk_test_6CDfvsSFxdjfBxhZ0s0KFrwB00pp6dgEOh');

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

// ALERT!!! PAGINATION ROUTE

// GET - Shop Product Page | - Displaying demanded product page with page numbers
app.get('/producten/:page', async (req, res, next) => {
  // Declaring variable
  const resPerPage = 6; // results per page
  const page = req.params.page || 1; // Page 
  try {

    if (req.query.search) {

      // Declaring query based/search variables

      const searchQuery = req.query.search,

        regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Find Demanded Products - Skipping page values, limit results per page
      const foundProducts = await Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }] })
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
      // Count how many products were found
      const numOfProducts = await Product.count({ $or: [{ title: regex }, { category: regex }, { body: regex }] });
      // Renders The Page
      res.render("products/pages", {
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(numOfProducts / resPerPage),
        searchVal: searchQuery,
        numOfResults: numOfProducts,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



// Start server
app.listen(process.env.PORT, () => console.log(`Webserver running on port ${process.env.PORT}!`));
