const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/product");

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
      product.messages.push({ content: req.body.content, author: { username: req.user.username, id: req.user._id } });
      product.save();
      res.redirect("/advertenties/" + req.params.product_id);
    }
  });
});

router.get("/tonen", function(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) {
      console.log(err);
    } else {
      res.render("messages/index", { product: product });
    }
  });
});

router.get("/:message_id/reactie", function(req, res) {
  console.log(req.params);
  Product.findById(req.params.id, function(err, product) {
    if (err) {
      console.log(err);
    } else {
      console.log(product);
      res.render("messages/reactie", { product: product });
    }
  });
});

module.exports = router;
