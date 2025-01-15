const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "PrivateChat", required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String },
  mediaUrl: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
