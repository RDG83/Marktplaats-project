const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });

router.get("/new", function(req, res) {
  res.render("new");
});

router.post("/", function(req, res) {
  Product.create(req.body.product, function(err, product) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      product.save();
      res.redirect("/");
    }
  });
});

module.exports = router;
