const express = require("express");
const User = require("../models/user")
// Declare empty object
let middlewareObject = {};

// Give currentUser variable to every page
middlewareObject.currentUser = function (req, res, next) {
 res.locals.currentUser = req.user;
 res.locals.error = req.flash("error");
 res.locals.success = req.flash("success");
 res.locals.redirectUrl = "";
 next();
};

//Login check middleware
middlewareObject.isLoggedIn = function (req, res, next) {
 if (req.isAuthenticated()) {
  return next();
 }
 req.session.redirectTo = req.originalUrl;
 req.flash("error", "Voor deze handeling dient u in te loggen.");
 res.redirect("/auth/login");
};

module.exports = middlewareObject;