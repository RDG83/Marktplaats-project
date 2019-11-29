const express = require("express");
const router = express.Router({ mergeParams: true });
const Message = require("../models/message")

router.get("/index", function (req, res) {
  res.render("accounts/index");
});

router.get("/berichten", function (req, res) {
  let userId = req.user.id
  Message.find({ parentId: { $exists: false }, "author.id": userId }, function (err, allMessages) {
    if (err) {
      console.log(err)
    } else {
      res.render("accounts/messages", { allMessages: allMessages, product_id: req.params.product_id });
    }
  });
});

router.get("/berichten/:message_Id/thread", function (req, res) {
  Message.aggregate([
    // { $match: { "_id": req.params.message_Id } },
    {
      $graphLookup: {
        from: "messages",
        startWith: "$_id",
        connectFromField: "parentId",
        connectToField: "_id",
        as: "threadHierarchy"
      }
    }
  ], function (err, threadHierarchy) {
    if (err) {
      console.log(err)
    } else {
      console.log(threadHierarchy)
      res.render("accounts/thread", { messages: threadHierarchy })

    }
  })
})



module.exports = router;
