const mongoose = require("mongoose");

const userConnectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  connectionId: { type: String, required: true },
  isOnline: { type: Boolean, default: true },
  lastSeen: { type: Date, default: null },
  deviceInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserConnection", userConnectionSchema);
