const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bid", bidSchema);
