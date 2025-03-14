const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  finished: { type: Boolean, default: false },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);