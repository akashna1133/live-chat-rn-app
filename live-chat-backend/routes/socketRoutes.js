// routes/socketConnect.js
const express = require('express');
const jwt = require('jsonwebtoken');
const UserConnection = require('../models/userConnection');
const { auth } = require('../middlewares/auth');
const router = express.Router();

// Create new token and store in UserConnection
router.post('/createconnect', auth, async (req, res) => {
  const { userId } = req.user;  // Get user info from JWT

  try {
    // Generate a new token
    const token = jwt.sign({ userId }, 'chatApp', { expiresIn: '1h' });

    // Save connection info in UserConnection table
    const connection = new UserConnection({
      userId,
      connectionId: req.socket.id,  // For example, you can pass this from socket connection
      token,
      isOnline: true,
    });

    await connection.save();

    res.status(200).json({ message: 'Token created and stored successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
