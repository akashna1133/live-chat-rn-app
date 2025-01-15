const express = require("express");
const router = express.Router();

// Example route for chat
router.get("/", (req, res) => {
  res.send("Chat API is working!");
});

module.exports = router;
