// routes/auth.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

const router = express.Router();

const sign = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'changeme_in_prod', {
    expiresIn: '1d',
  });

// POST /auth/register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
    body('birthday').notEmpty().withMessage('Birthday is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, birthday } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, birthday });
    await user.save();

    const token = sign(user);
    res.status(201).json({ token, user: user.toJSON() });
  }
);

// POST /auth/login
router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) return res.status(400).json({ message: info?.message || 'Login failed' });
      const token = sign(user);
      res.json({ token });
    })(req, res, next);
  }
);

module.exports = router;
