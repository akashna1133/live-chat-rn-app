const mongoose = require("mongoose");

const privateChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
  lastMessage: { type: String, default: "" },
  lastMessageTimestamp: { type: Date, default: Date.now },
  isGroup: { type: Boolean, default: false },
});

module.exports = mongoose.model("PrivateChat", privateChatSchema);
