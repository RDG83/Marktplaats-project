const express = require("express");
const router = express.Router({ mergeParams: true });
const Thread = require("../models/thread");
const Product = require("../models/product");
const middleware = require("../middleware")

var total = [];


router.get("/index", middleware.isLoggedIn, function (req, res)
{
  Product.find({ "author._id": req.user.id }, function (error, products)
  {
    if (error)
    {
      console.log(error);
      req.flash("error", "De producten konden niet worden opgehaald.");
      res.redirect("/");
    }
    else
    {
      res.render("accounts/show", { products: products });
    }
  });
});


// Show conversations where the user is involved in
router.get("/berichten", middleware.isLoggedIn, function (req, res)
{
  Thread.find({ "users._id": req.user.id }).populate('product._id').exec(function (error, threads)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      res.render("threads/index", { threads: threads });
    }
  });
});

router.get("/berichten/:thread_id", middleware.isLoggedIn, function (req, res)
{
  Thread.findById(req.params.thread_id, function (error, thread)
  {
    if (error)
    {
      console.log(error);
      res.redirect("/account/berichten");
    }
    else
    {
      Product.findOne(thread.product._id, function (error, product)
      {
        if (error)
        {
          console.log(error);
        }
        else
        {
          res.render("threads/show", { thread: thread, product: product });
        }
      });
    }
  }
  );
});

// Post route on existing thread
router.post("/berichten/:thread_id", middleware.isLoggedIn, function (req, res)
{
  Thread.findById(req.params.thread_id, function (error, thread)
  {
    if (error)
    {
      console.log(error);
      req.flash("error", "Conversatie kan niet worden gevonden.");
      res.redirect("/account/berichten");
    }
    else
    {
      // Append current user to message
      req.body.message.author = req.user;

      // append message to existing thread
      thread.messages.push(req.body.message);

      // Save thread
      thread.save();

      // Redirect to the thread
      res.redirect("/account/berichten/" + req.params.thread_id);
    }
  });
});

module.exports = router;
