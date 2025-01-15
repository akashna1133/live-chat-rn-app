const express = require("express");
const authRoutes = require("./authRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/users", userRoutes);

module.exports = router;
