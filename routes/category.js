const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/category");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });


// New product get route
router.get("/new", function (req, res)
{
  res.render("categories/new");
});

// Products index route
router.get("/", function (req, res)
{
  Category.find({}, function (error, allCategories)
  {
    if (error)
    {
      console.log("Error:", error);
    }
    else
    {
      res.render("categories/index", { categories: allCategories });
    }
  });
});

// Products index route
router.get("/:category", function (req, res)
{
  let category = req.params.category;
  Product.find({}).where('category').equals(category).exec(function(error, allProducts) {
    if (error) {
      console.log("Error:", error);
    } else {
      res.render("categories/show", { products: allProducts, category: category });
    }
  });
});

router.post("/", function (req, res)
{
  Category.create(req.body.category, function (err, category)
  {
    if (err)
    {
      console.log(err);
      res.redirect("/");
    }
    else
    {
      category.save();
      res.redirect("/categorieen");
    }
  });
});

module.exports = router;
