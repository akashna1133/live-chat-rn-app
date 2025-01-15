const express = require("express");
const { registerUserSchema } = require("../validations/userValidation");
const { registerUser, getAllUsers } = require("../controllers/userController");
const { validate } = require("../middlewares/validate");

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.get("/", getAllUsers);

// Example route for users
router.get("/", (req, res) => {
  res.send("User API is working!");
});

module.exports = router;

