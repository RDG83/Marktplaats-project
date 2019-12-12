const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const municipalityController = require("../controllers/municipalityController");
const middleware = require("../middleware")

// Declare filesystem
let fs = require('fs');

const storage = multer.diskStorage
  ({
    destination: function (req, file, cb)
    {
      cb(null, "public/uploads/products");
    },
    filename: function (req, file, cb)
    {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });

// Require Sharp image resize module
const sharp = require('sharp');

// New product get route
router.get("/new", middleware.isLoggedIn, function (req, res)
{
  let municipalities = municipalityController.getAll();
  res.render("products/new", { municipalities: municipalities });
});

// Products index route
router.get("/", function (req, res)
{
  // Array for municipalities given
  let municipalities = [];

  // Search form submission subroute
  if (req.query.search)
  {
    // filter user input
    const regex = new RegExp(escapeRegex(req.query.search), "gi");

    // if a municipality was also given except the All entry, the query needs to
    if (req.query.municipalities && !req.query.municipalities.includes("all"))
    {
      // Add all selected municipalities in an array to feed as AND clause for the search query
      req.query.municipalities.forEach(function (municipality)
      {
        // Push individual municipality to array in object structure
        municipalities.push({ municipality });
      });

      // Find products where the and clause corresponds with the give municipalities
      Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }], $and: [{ $or: municipalities }] }, function (error, foundProducts)
      {
        if (error || !foundProducts)
        {
          console.log("Error:", error);
          req.flash("error", "Er is een fout opgetreden bij het uitvoeren van de zoekopdracht.");
          res.redirect("/advertenties");
        }
        else
        {
          res.render("products/index", { products: foundProducts });
        }
      });
    }
    // Else if no municipality was selected, or the All-option was selected, query should be without AND operator
    else
    {
      Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }] }, function (error, foundProducts)
      {
        if (error || !foundProducts)
        {
          console.log("Error:", error);
          req.flash("error", "Er is een fout opgetreden bij het uitvoeren van de zoekopdracht.");
          res.redirect("/advertenties");
        }
        else
        {
          res.render("products/index", { products: foundProducts });
        }
      });
    }
  }
  // If no search requests was done
  else
  {
    // get all products and sort by premium
    Product.find({}).sort({ premium: 'desc' }).exec(function (error, allProducts)
    {
      if (error || !allProducts)
      {
        console.log("Error:", error);
        req.flash("error", "Er is een fout opgetreden bij het uitvoeren van de zoekopdracht.");
        res.redirect("/advertenties");
      }
      else
      {
        res.render("products/index", { products: allProducts });
      }
    });
  }
});

// Post route of a product, with multer upload middleware
router.post("/", middleware.isLoggedIn, upload.array("productImages", 5), function (req, res)
{

  // Append lat and long to product JSON
  appendLocationData(req.body.product, req.body.latitude, req.body.longitude);
  Product.create(req.body.product, function (error, product)
  {
    if (error || !product)
    {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het aanmaken van de advertentie.");
      res.redirect("/advertenties");
    }
    else
    {
      // Save filename to product entry in database
      req.files.forEach(function (file)
      {
        // Resize incoming image
        sharp(file.path).resize(200).toBuffer(function (err, buffer)
        {
          if (err) return next(err)
          const image = buffer.toString('base64');
          fs.writeFile(file.path, image, { encoding: 'base64' }, function (error)
          {
            if (error)
            {
              console.log(error);
            }
          });
          // This will replace your original image with compressed once.
        });
        product.images.push(file.filename);
      });

      product.author._id = req.user._id;
      product.author.username = req.user.username;
      // Callback function so redirection to id is possible
      product.save(function (error, product)
      {
        // If error
        if (error || !product)
        {
          console.log(error);
          req.flash("error", "Fout bij het aanmaken van de advertentie.");
          res.redirect("/advertenties");
        }
        else
        {
          req.flash("success", "Uw advertentie is met succes aangemaakt.");
          res.redirect("/advertenties/" + product.id);
        }
      });
    }
  });
});

// Poging tot DRY
function appendLocationData(targetObject, latitude, longitude)
{
  // Manually process the lat and long data, to insert into the product structure
  let location =
  {
    "location":
    {
      "coordinates": [latitude, longitude]
    }
  };
  return targetObject = Object.assign(targetObject, location);
}

// Product show route
router.get("/:product_id", function (req, res)
{
  Product.findById(req.params.product_id)
    .populate("bids")
    .exec(function (err, foundProduct)
    {
      if (err || !foundProduct)
      {
        console.log(err);
        req.flash("error", "Er is een fout opgetreden bij het ophalen van de advertentie.");
        res.redirect("/advertenties");
      } else
      {
        res.render("products/show", { product: foundProduct });
        //res.send(foundProduct.location.coordinates);
      }
    });
});

// EDIT FORM GET ROUTE
router.post("/:product_id/stripe", function (req, res)
{
  app.locals.productId = req.body.productId;
  res.render("products/payment");
});

// EDIT FORM GET ROUTE
router.get("/:product_id/stripe", function (req, res)
{
  // Render page and pass productId to payment page
  res.render("products/payment", { productId: req.params.product_id });
  // res.send(req.params.product_id);
});

// EDIT FORM GET ROUTE
router.get("/:product_id/edit", middleware.isLoggedIn, function (req, res)
{
  Product.findById(req.params.product_id, function (error, foundProduct)
  {
    if (error || !foundProduct)
    {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het ophalen van de advertentie.");
      res.redirect("/advertenties");
    }
    else
    {
      // Only if every fail condition is already tackled, get the municipality list
      let municipalities = municipalityController.getAll();
      res.render("products/edit", { product: foundProduct, municipalities: municipalities });
    }
  });
});


// After payment route
router.get("/:product_id/stripe/complete", (req, res) =>
{
  Product.findById(req.params.product_id, function (error, foundProduct)
  {
    if (error || !foundProduct)
    {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het wijzigen van de advertentie.");
      res.redirect("/advertenties/" + req.params.product_id);
    }
    else
    {
      console.log(foundProduct);
      if (foundProduct.premium)
      {
        req.flash("success", "Opwaarderen van advertentie is in behandeling");
        res.redirect("/advertenties/" + req.params.product_id);
      }
      else
      {
        req.flash("error", "Advertentie kon niet worden opgewaardeerd");
        res.redirect("/advertenties/" + req.params.product_id);
      }
    }
  });
});

// EDIT PUT ROUTE
router.put("/:product_id", middleware.isLoggedIn, function (req, res)
{
  // Append lat and long to product JSON
  appendLocationData(req.body.product, req.body.latitude, req.body.longitude);

  // try to find the product by id and update it
  Product.findByIdAndUpdate(req.params.product_id, req.body.product, function (error, updatedProduct)
  {
    if (error || !updatedProduct)
    {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het wijzigen van de advertentie.");
      res.redirect("/advertenties/" + req.params.product_id);
    } else
    {
      // For debugging purposes
      console.log(req.body.product);
      // Redirect back to the advertisement page
      req.flash("success", "Advertentie succesvol bijgewerkt.");
      res.redirect("/advertenties/" + req.params.product_id);
    }
  });
});

// Product delete route
router.delete("/:id", middleware.isLoggedIn, function (req, res)
{
  Product.findByIdAndRemove(req.params.id, function (err)
  {
    if (err)
    {
      console.log(err);
      req.flash("error", "Er is een fout opgetreden bij het verwijderen van de advertentie.");
      res.redirect("/advertenties");
    } else
    {
      req.flash("success", "Uw advertentie is met succes verwijderd");
      res.redirect("/advertenties");
    }
  });
});

// ALERT!!! PAGINATION ROUTE

// GET - Shop Product Page | - Displaying demanded product page with page numbers
router.get('/p/:page', async (req, res, next) => {
  // Declaring variable
  const resPerPage = 6; // results per page
  const page = req.params.page || 1; // Page 
  try {

    if (req.query.search) {

      // Declaring query based/search variables

      const searchQuery = req.query.search,

        regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Find Demanded Products - Skipping page values, limit results per page
      const foundProducts = await Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }] })
        .skip((resPerPage * page) - resPerPage)
        .limit(resPerPage);
      // Count how many products were found
      const numOfProducts = await Product.countDocuments({ $or: [{ title: regex }, { category: regex }, { body: regex }] });
      // Renders The Page
      res.render("products/pages", {
        products: foundProducts,
        currentPage: page,
        pages: Math.ceil(numOfProducts / resPerPage),
        searchVal: searchQuery,
        numOfResults: numOfProducts,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
});

// To remove special and potentially unsafe characters
function escapeRegex(text)
{
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
