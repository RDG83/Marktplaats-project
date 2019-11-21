const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const Product = require("../models/product");
const Bid = require("../models/bid");
const moment = require("moment");

router.post("/", function(req, res) {
  Product.findById(req.params.product_id, function(err, foundProduct) {
    if (err) {
      console.log(err);
    } else if (req.body.bid.amount < foundProduct.minprice) {
      req.flash("error", "Uw bod is te laag, probeer een hoger bod");
      res.redirect("/advertenties/" + req.params.product_id);
    } else {
      Bid.create(req.body.bid, function(err, bid) {
        if (err) {
          console.log(err);
        } else {
          foundProduct.bids.push(bid);
          foundProduct.save();
          res.redirect("/advertenties/" + req.params.product_id);
        }
      });
    }
  });
});

module.exports = router;
