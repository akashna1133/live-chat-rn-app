const { v4: uuidv4 } = require("uuid");

const users = []; // Temporary in-memory storage

exports.registerUser = (req, res) => {
  const { username, email } = req.body;
  const user = { id: uuidv4(), username, email };
  users.push(user);
  res.status(201).json({ message: "User registered successfully", user });
};

exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};