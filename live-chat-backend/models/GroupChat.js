const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  lastMessage: { type: String, default: "" },
  lastMessageTimestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GroupChat", groupChatSchema);
