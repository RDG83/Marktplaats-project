const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/login", function(req, res) {
  // passport handling here
  res.render("login");
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true
//   })
// );

router.get("/logout", function(req, res) {
  // passport handling here
  res.send("welcome to the logout route");
});

router.get("/signup", function(req, res) {
  // passport handling here
  res.render("signup");
});

router.post("/signup", function(req, res) {
  // passport handling here
  res.render("signup");
});

module.exports = router;
