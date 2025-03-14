const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  occupation: { type: String },
  phone: { type: String },
  address: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Profile", profileSchema);