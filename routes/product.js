const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.router({ mergeParams: true });

router.get("/new", function(req, res) {
  res.render("new");
});
