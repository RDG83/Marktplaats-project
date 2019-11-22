const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { Type: String, required: true },
  email: { Type: String, required: true },
  password: { Type: String, required: true },
  date: { Type: String, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
