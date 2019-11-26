const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  body: String,
  images: [],
  category: String,
  price: Number,
  minprice: Number,
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Message"
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
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Product", productSchema);
