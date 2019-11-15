const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });

// New product get route
router.get("/new", function(req, res) {
  res.render("products/new");
});

// Products index route
router.get("/", function(req, res) {
  Product.find({}, function(error, allProducts) {
    if (error) {
      console.log("Error:", error);
    } else {
      res.render("products/index", { products: allProducts });
    }
  });
});

router.post("/", function(req, res) {
  Product.create(req.body.product, function(err, product) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      product.save();
      res.redirect("/advertenties");
    }
  });
});

module.exports = router;