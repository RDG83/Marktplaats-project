const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/product");

router.get("/new", function(req, res) {
  Product.findById(req.params.product_id, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { product: foundProduct });
    }
  });
});

router.post("/", function(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      // appendCommentData(product.comments, req.user._id, req.user.username, req.body.content);
      product.comments.push({ content: req.body.content, author: { username: req.user.username, id: req.user._id } });
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
      res.render("comments/show", { product: product });
    }
  });
});

router.get("/reactie", function(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/reactie", { product: product });
    }
  });
});

module.exports = router;
