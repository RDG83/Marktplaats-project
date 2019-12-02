const express = require("express");
const router = express.Router({ mergeParams: true });
const Message = require("../models/message");

var total = [];


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

router.get(
  "/berichten/:message_id/thread", findMessages
);


function findMessages(req, res) {
  let messages = [];
  Message.find(
    {
    }, function (err, allMessages) {
      if (err) {
        console.log(err)
      }
    }
  ).exec().then((allMessages) => {
    let dataforview = [];
    messages = allMessages;
    allMessages.forEach(element => {
      if (!element.parentId.id) {
        let thread = [element];
        let replies = zoekinarray(messages, element.id);
        thread = thread.concat(replies);
        dataforview.push(thread);
      }
    });
    console.log(dataforview);
    res.send(JSON.stringify(dataforview));
    // res.render("accounts/thread", { messages: dataforview })
  });
}

function zoekinarray(array, sleutel) {
  let subs = [];
  array.forEach(e2 => {
    if (e2.parentId.id == sleutel) {
      subs.push(e2);
      subs = subs.concat(zoekinarray(array, e2.id));
    }
  });
  return subs;
}


module.exports = router;
