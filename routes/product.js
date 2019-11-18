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
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }] }, function(error, allProducts) {
      if (error) {
        console.log("Error:", error);
      } else {
        res.render("products/index", { products: allProducts });
      }
    });
  } else {
    Product.find({}, function(error, allProducts) {
      if (error) {
        console.log("Error:", error);
      } else {
        res.render("products/index", { products: allProducts });
      }
    });
  }
});

// Product post route
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

// Product show route
router.get("/:product_id", function(req, res) {
  Product.findById(req.params.product_id, function(err, foundProduct) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      res.render("products/show", { product: foundProduct });
    }
  });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
