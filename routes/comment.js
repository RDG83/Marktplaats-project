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

router.post("/", function(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if (err) {
      console.log(err);
      res.redirect("/advertenties");
    } else {
      // appendCommentData(product.comments, req.user._id, req.user.username, req.body.content);
      product.comments.push({ content: req.body.content, author: { username: req.user.username, id: req.user._id } });
      console.log(product);
      product.save();
      res.redirect("/advertenties/" + req.params.product_id);
    }
  });
});

function appendCommentData(targetObject, authorId, username, content) {
  let comment = {
    author: {
      id: { authorId },
      username: username
    },
    content: content
  };
  return (targetObject = Object.assign(targetObject, comment));
}

module.exports = router;
