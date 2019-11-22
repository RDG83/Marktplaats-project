const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/login", function(req, res) {
  // passport handling here
  res.send("welcome to the login route");
});

router.get("/logout", function(req, res) {
  // passport handling here
  res.send("welcome to the logout route");
});

router.get("/signup", function(req, res) {
  // passport handling here
  res.send("welcome to the signup route");
});

module.exports = router;
