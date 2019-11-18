const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  bid: Number,
  timestamps: true
});

module.exports = mongoose.model("Bid", bidSchema);
