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

module.exports = router;
