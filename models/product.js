const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  body: String,
  images: [],
  category: String,
  price: Number,
  minprice: Number,
  threads: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Thread"
    }
  ],
  bids: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Bid"
    }
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"]
      //required: true
    },
    coordinates: {
      type: [Number]
      //required: true
    }
  },
  author: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  municipality: String
});

module.exports = mongoose.model("Product", productSchema);
