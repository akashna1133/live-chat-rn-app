const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  console.log('Coming inside the login')
  const { email, password } = req.body;
  const secretKey = "sample_token";
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('User password :: ',isMatch )
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('user id ::: ', user)
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey , { expiresIn: '1h' });
    console.log('User authenticated :: ',token )

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


