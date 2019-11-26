const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/product");
const Message = require("../models/message");

router.get("/new", function(req, res) {
  Product.findById(req.params.product_id, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      res.render("messages/new", { product: foundProduct });
    }
  });
});

router.post("/", function(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      Message.create(req.body.message, function(err, message) {
        if (err) {
          console.log(err);
        } else {
          message.author.id = req.user._id;
          message.author.username = req.user.username;
          message.save();
          product.messages.push(message);
          product.save();
          res.redirect("/advertenties/" + req.params.product_id);
        }
      });
    }
  });
});

router.get("/tonen", function(req, res) {
  Product.findById(req.params.product_id)
    .populate("messages")
    .exec(function(err, product) {
      console.log("message index route error: " + err);
      if (err || !product) {
        console.log(err);
      } else {
        res.render("messages/index", { product: product });
      }
    });
});

router.get("/:message_id/reactie", function(req, res) {
  Message.findById(req.params.message_id, function(err, message) {
    if (err) {
      console.log(err);
    } else {
      res.render("messages/reactie", { message: message, product_id: req.params.id });
    }
  });
});

module.exports = router;
