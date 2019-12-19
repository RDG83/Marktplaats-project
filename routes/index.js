const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/product");
const municipalityController = require("../controllers/municipalityController");

// MAIN ROUTE TO HOME
router.get("/", function (req, res) {
  let municipalities = municipalityController.getAll();

  // Set of unique categories
  let catSet = new Set();

  Product.find({}, function (error, allProducts) {
    if (error) {
      console.log(error);
    }
    else {
      allProducts.forEach(function (product) {
        catSet.add(product.category);
      });
    }
    res.render("home", { product: catSet, municipalities: municipalities });
  });
});


module.exports = router;