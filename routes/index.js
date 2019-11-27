const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/product");

// MAIN ROUTE TO HOME
router.get("/", function(req, res) {
  Product.find({}, function(error, allProducts) {
    if (error) {
      console.log(error);
    } else {
      let catSet = new Set();
      allProducts.forEach(function(product) {
        catSet.add(product.category);
      });
      res.render("home", { product: catSet });
    }
  });
});

module.exports = router;
