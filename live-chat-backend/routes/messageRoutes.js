const express = require("express");
const { sendMessageSchema } = require("../validations/messageValidation");
const { sendMessage, getMessages } = require("../controllers/messageController");
const { validate } = require("../middlewares/validate");

const router = express.Router();

router.post("/", validate(sendMessageSchema), sendMessage);
router.get("/", getMessages);

module.exports = router;
