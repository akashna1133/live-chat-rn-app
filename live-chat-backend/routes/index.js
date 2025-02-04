const express = require("express");
const authRoutes = require("./authRoutes");
const chatRoutes = require("./chatRoutes");
const userRoutes = require("./userRoutes");
const socketConnectRoutes = require("./socketRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/users", userRoutes);
router.use('/socket', socketConnectRoutes);

module.exports = router;
