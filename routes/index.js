const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });

// MAIN ROUTE TO HOME
router.get("/", function(req, res) {
  res.redirect("/categorieen/");
});

module.exports = router;
