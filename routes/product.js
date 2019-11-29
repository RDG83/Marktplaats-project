const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const municipalityController = require("../controllers/municipalityController");
const storage = multer.diskStorage
  ({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/products");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });
// Require Sharp image resize module
//const sharp = require('sharp');

// New product get route
router.get("/new", function (req, res) {
  let municipalities = municipalityController.getAll();
  res.render("products/new", { municipalities: municipalities });
});

// Products index route
router.get("/", function (req, res) {
  // Array for municipalities given
  let municipalities = [];

  // Search form submission subroute
  if (req.query.search) {
    // filter user input
    const regex = new RegExp(escapeRegex(req.query.search), "gi");

    // if a municipality was also given except the All entry, the query needs to
    if (req.query.municipalities && !req.query.municipalities.includes("all")) {
      // Add all selected municipalities in an array to feed as AND clause for the search query
      req.query.municipalities.forEach(function (municipality) {
        // Push individual municipality to array in object structure
        municipalities.push({ municipality });
      });

      // Find products where the and clause corresponds with the give municipalities
      Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }], $and: [{ $or: municipalities }] }, function (error, foundProducts) {
        if (error || !foundProducts) {
          console.log("Error:", error);
          req.flash("error", "Er is een fout opgetreden bij het uitvoeren van de zoekopdracht.");
          res.redirect("/advertenties");
        }
        else {
          res.render("products/index", { products: foundProducts });
        }
      });
    }
    // Else if no municipality was selected, or the All-option was selected, query should be without AND operator
    else {
      Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }] }, function (error, foundProducts) {
        if (error || !foundProducts) {
          console.log("Error:", error);
          req.flash("error", "Er is een fout opgetreden bij het uitvoeren van de zoekopdracht.");
          res.redirect("/advertenties");
        }
        else {
          res.render("products/index", { products: foundProducts });
        }
      });
    }
  }
  // If no search requests was done
  else {
    // get all products
    Product.find({}, function (error, allProducts) {
      if (error || !allProducts) {
        console.log("Error:", error);
        req.flash("error", "Er is een fout opgetreden bij het uitvoeren van de zoekopdracht.");
        res.redirect("/advertenties");
      }
      else {
        res.render("products/index", { products: allProducts });
      }
    });
  }
});

// Post route of a product, with multer upload middleware
router.post("/", upload.array("productImages", 5), function (req, res) {

  // Append lat and long to product JSON
  appendLocationData(req.body.product, req.body.latitude, req.body.longitude);
  Product.create(req.body.product, function (error, product) {
    if (error || !product) {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het aanmaken van de advertentie.");
      res.redirect("/advertenties");
    } else {
      // Save filename to product entry in database
      req.files.forEach(function (file) {
        product.images.push(file.filename);
      });
      product.author.id = req.user._id;
      product.author.username = req.user.username;
      // Callback function so redirection to id is possible
      product.save(function (error, product) {
        // If error
        if (error || !product) {
          console.log(error);
          req.flash("error", "Fout bij het aanmaken van de advertentie.");
          res.redirect("/advertenties");
        }
        else {
          req.flash("success", "Uw advertentie is met succes aangemaakt.");
          res.redirect("/advertenties/" + product.id);
        }
      });
    }
  });
});

// Poging tot DRY
function appendLocationData(targetObject, latitude, longitude) {
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
router.get("/:product_id", function (req, res) {
  Product.findById(req.params.product_id)
    .populate("bids")
    .exec(function (err, foundProduct) {
      if (err || !foundProduct) {
        console.log(err);
        req.flash("error", "Er is een fout opgetreden bij het ophalen van de advertentie.");
        res.redirect("/advertenties");
      } else {
        res.render("products/show", { product: foundProduct });
        //res.send(foundProduct.location.coordinates);
      }
    });
});

// EDIT FORM GET ROUTE
router.get("/:product_id/edit", function (req, res) {
  Product.findById(req.params.product_id, function (error, foundProduct) {
    if (error || !foundProduct) {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het ophalen van de advertentie.");
      res.redirect("/advertenties");
    }
    else {
      // Only if every fail condition is already tackled, get the municipality list
      let municipalities = municipalityController.getAll();
      res.render("products/edit", { product: foundProduct, municipalities: municipalities });
    }
  });
});

// EDIT PUT ROUTE
router.put("/:product_id", function (req, res) {
  // Append lat and long to product JSON
  appendLocationData(req.body.product, req.body.latitude, req.body.longitude);

  // try to find the product by id and update it
  Product.findByIdAndUpdate(req.params.product_id, req.body.product, function (error, updatedProduct) {
    if (error || !updatedProduct) {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het wijzigen van de advertentie.");
      res.redirect("/advertenties/" + req.params.product_id);
    } else {
      // For debugging purposes
      console.log(req.body.product);
      // Redirect back to the advertisement page
      req.flash("success", "Advertentie succesvol bijgewerkt.");
      res.redirect("/advertenties/" + req.params.product_id);
    }
  });
});

// Product delete route
router.delete("/:id", function (req, res) {
  Product.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
      req.flash("error", "Er is een fout opgetreden bij het verwijderen van de advertentie.");
      res.redirect("/advertenties");
    } else {
      req.flash("success", "Uw advertentie is met succes verwijderd");
      res.redirect("/advertenties");
    }
  });
});

// To remove special and potentially unsafe characters
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
