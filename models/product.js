const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  body: String,
  images: [],
  category: String,
  price: Number,
  minprice: Number,
  bids: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Bid"
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);
