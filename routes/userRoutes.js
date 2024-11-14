const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { userId, username, password } = req.body;  // Added password to the user model
    const user = new User({ userId, username, password });  // Save password too
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user by username and password
      const user = await User.findOne({ username, password });
  
      if (user) {
        res.json({ success: true, userId: user._id });
      } else {
        res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;