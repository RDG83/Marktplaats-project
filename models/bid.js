const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  amount: Number,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Bid", bidSchema);
