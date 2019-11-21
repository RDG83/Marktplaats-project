const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });
const multer = require('multer');
const storage = multer.diskStorage
  ({
    destination: function (req, file, cb)
    {
      cb(null, 'public/uploads/products');
    },
    filename: function (req, file, cb)
    {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });
// Require Sharp image resize module
//const sharp = require('sharp');

// New product get route
router.get("/new", function (req, res)
{
  res.render("products/new");
});

// Products index route
router.get("/", function (req, res)
{
  if (req.query.search)
  {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }] }, function (error, allProducts)
    {
      if (error)
      {
        console.log("Error:", error);
      } else
      {
        res.render("products/index", { products: allProducts });
      }
    });
  } else
  {
    Product.find({}, function (error, allProducts)
    {
      if (error)
      {
        console.log("Error:", error);
      } else
      {
        res.render("products/index", { products: allProducts });
      }
    });
  }
});

// Post route of a product, with multer upload middleware
router.post("/", upload.array('productImages', 5), function (req, res)
{
  Product.create(req.body.product, function (error, product)
  {
    if (error)
    {
      console.log(error);
      res.redirect("/advertenties");
    } else
    {
      // Save file metadata to product entry in database
      req.files.forEach(function (file)
      {
        product.images.push(file.filename);
      });

      product.save();

    }
  });
  res.redirect("/advertenties");
});


// Multer testing route
router.post("/imageupload", upload.array('productImages', 3), function (req, res)
{
  console.log(req.files);
});

// Product show route
router.get("/:product_id", function (req, res)
{
  Product.findById(req.params.product_id)
    .populate("bids")
    .exec(function (err, foundProduct)
    {
      if (err)
      {
        console.log(err);
        res.redirect("/advertenties");
      } else
      {
        res.render("products/show", { product: foundProduct });
      }
    });
});

// EDIT FORM GET ROUTE
router.get("/:product_id/edit", function (req, res)
{
  Product.findById(req.params.product_id, function (error, foundProduct)
  {
    if (error)
    {
      console.log(error);
      res.redirect("/advertenties");
    } else
    {
      res.render("products/edit", { product: foundProduct });
    }
  });
});

// EDIT PUT ROUTE
router.put("/:product_id", function (req, res)
{
  // try to find the product by id and update it
  Product.findByIdAndUpdate(req.params.product_id, req.body.product, function (error, updatedProduct)
  {
    if (error)
    {
      console.log(error);
      // req.flash("error", "Er is een fout opgetreden bij het wijzigen van de advertentie.");
      res.redirect("/advertenties/" + req.params.product_id);
    }
    else
    {
      // For debugging purposes
      console.log(req.body.product);
      // Redirect back to the advertisement page
      res.redirect("/advertenties/" + req.params.product_id);
    }
  });
});


function escapeRegex(text)
{
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Product delete route
router.delete("/:id", function (req, res)
{
  Product.findByIdAndRemove(req.params.id, function (err)
  {
    if (err)
    {
      console.log(err);
      res.redirect("/advertenties");
    }
    else
    {
      res.redirect("/advertenties");
    }
  });
});


module.exports = router;