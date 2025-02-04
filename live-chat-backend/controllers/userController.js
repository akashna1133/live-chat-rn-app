const bcrypt = require("bcrypt");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const users = []; // Temporary in-memory storage

exports.registerUser = async (req, res) => {
  try {
    // Validate input using Yup
    console.log('coming inside the usercontroll')
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
};

exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};