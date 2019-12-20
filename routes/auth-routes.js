const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const passport = require("passport");

router.get("/login", function (req, res) {
  // passport handling here
  res.render("accounts/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/advertenties",
    failureRedirect: "/auth/login",
    failureFlash: true
  })
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/advertenties");
});

router.get("/signup", function (req, res) {
  res.render("accounts/signup");
});

router.post("/signup", function (req, res) {
  const { username, email, password, password2 } = req.body;
  let errors = [];
  // check of alle velden zijn ingevuld
  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Vul alle velden in" });
  }
  // check of passwords hetzelfde zijn
  if (password !== password2) {
    errors.push({ msg: "Wachtwoorden komen niet overeen" });
  }
  // check of password lang genoeg is
  if (password.length < 6) {
    errors.push({ msg: "Wachtwoord is onvoldoende lang" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      username,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(function (user) {
      if (user) {
        errors.push({ msg: "E-mailadres is al in gebruik" });
        res.render("signup", {
          errors,
          username,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          username,
          password,
          email
        });
        User.register(newUser, req.body.password, function (err, user) {
          if (err) {
            console.log("post route error:" + err);
            return res.render("accounts/signup");
          } else {
            passport.authenticate("local")(req, res, function () {
              res.redirect("/advertenties");
            });
          }
        });
      }
    });
  }
});

module.exports = router;
