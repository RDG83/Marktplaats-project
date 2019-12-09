const express = require("express");
const router = express.Router({ mergeParams: true });
const Thread = require("../models/thread");
const middleware = require("../middleware")

var total = [];


router.get("/index", middleware.isLoggedIn, function (req, res) {
  res.render("accounts/index");
});

router.get("/berichten", middleware.isLoggedIn, function (req, res) {

  Thread.find({
    "users._id": req.user.id
  }
    , function (err, threads) {
      if (err) {
        console.log(err);
      } else {
        // res.send(JSON.stringify(threads));
        // res.send(JSON.stringify(threads));

        res.render("accounts/messages", { threads: threads });
      }
    });
});

router.get("/berichten/:thread_id", middleware.isLoggedIn, function (req, res) {
  Thread.findById(req.params.thread_id, function (err, thread) {
    if (err) {
      console.log(err);
      res.redirect("/account/berichten");
    } else {
      res.send(JSON.stringify(thread))
      // res.render("messages/thread", {});
    }
  }
  );
});

module.exports = router;
