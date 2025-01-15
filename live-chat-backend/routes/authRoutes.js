const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const yup = require("yup");

const router = express.Router();

// Validation schema using Yup
const registerValidationSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

// Register route
router.post("/register", async (req, res) => {
  try {
    // Validate input using Yup
    await registerValidationSchema.validate(req.body, { abortEarly: false });

    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    // Handle validation or server errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
