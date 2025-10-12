// controllers/userControllers.js
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').lean();
  res.json(users);
};

exports.getMe = async (req, res) => {
  // req.user is set by passport (see middleware/auth.js)
  res.json(req.user);
};
