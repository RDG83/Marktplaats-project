const express = require("express");
const router = express.Router({ mergeParams: true });

// OUTE TO PAYMENT FORM
router.get("/", function(req, res)
{
    res.render("payment/test");
});

router.post("/", function(req, res)
{
    res.send("Is ontvang'n!");
});

module.exports = router;