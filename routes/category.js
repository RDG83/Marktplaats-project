const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/category");
const router = express.Router({ mergeParams: true });


// New product get route
router.get("/new", function(req, res) {
  res.render("categories/new");
});

// Products index route
router.get("/", function(req, res)
{
  Category.find({}, function (error, allCategories)
        {
            if (error)
            {
                console.log("Error:", error);
            }
            else
            {
                res.render("products/index", { categories: allCategories });
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
