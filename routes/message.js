const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/product");
const Thread = require("../models/thread");
require('mongoose').mongo.ObjectID;

router.get("/new", function (req, res) {
  Product.findById(req.params.product_id, function (err, foundProduct) {
    if (err) {
      console.log(err);
    } else {
      res.render("messages/new", { product: foundProduct });
    }
  });
});

router.post("/", isLoggedIn, function (req, res) {
  let message = req.body.message;
  Product.findById(req.params.product_id, function (err, product) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      console.log("prod id: " + typeof product._id)
      console.log("params: " + typeof req.params.product_id)
      Thread.find({ "users._id": req.user._id }, function (error, thread) {
        // Thread.find({ $and: [{ "users._id": req.user._id }, { "product._id": req.params.product_id }] }, function (error, thread) {
        if (error) {
          console.log(error)
        } else if (thread.product._id.equals(product._id)) {
          res.send(JSON.stringify(thread));
        }
        else {
          // hier komt code voor aanmaken bericht in bestaande thread
          //thread.messages.push(message);
          //thread.save();
          Thread.create(req.body.message, function (err, thread) {
            if (err) {
              console.log(err);
            } else {
              if (req.user) {
                // Assign current user to participant of users array
                Object.assign(message, req.user);
                // Assign owner of the product to the array as well
                thread.users.push(product.author);
                thread.users.push(req.user);
                // Reference the newly created thread to the Product threads array
                product.threads.push(thread.id);
                product.save();
                // reference to product in thread
                thread.product.id = req.params.product_id;
                // Assign posted message to thread
                thread.messages.push(message);
                thread.save();
              }
            }
          });
          res.redirect("/advertenties/" + req.params.product_id);
        }
      });
    }
  });
});

// router.get("/tonen", function (req, res) {
//   Product.findById(req.params.product_id)
//     .populate("messages")
//     .exec(function (err, product) {
//       if (err || !product) {
//         console.log(err);
//       } else {
//         res.render("messages/index", { product: product, product_id: req.params.product_id });
//       }
//     });
// });



// router.get("/:message_id/reactie", function (req, res) {
//   Message.findById(req.params.message_id, function (err, message) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("messages/reactie", { message: message, product_id: req.params.product_id });
//     }
//   });
// });

router.post("/:message_id", function (req, res) {
  Product.findById(req.params.product_id, function (err, product) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      Message.create(req.body.message, function (err, message) {
        if (err) {
          console.log(err);
        } else {
          message.author.id = req.user._id;
          message.author.username = req.user.username;
          message.parentId.id = req.params.message_id
          message.save();
          product.messages.push(message);
          product.save();
          res.redirect("/advertenties/" + req.params.product_id);
        }
      });
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
}

module.exports = router;