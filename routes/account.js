const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/index", function(req, res) {
  res.render("accounts/index");
});

router.get("/berichten", function(req, res) {
  res.render("/accounts/comments");
});

module.exports = router;
