const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/index", function(req, res) {
  res.render("accounts/index");
});

module.exports = router;
