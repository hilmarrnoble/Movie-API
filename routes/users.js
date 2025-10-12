// routes/users.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const userController = require('../controllers/userControllers');

const router = express.Router();

// Useful endpoints; keep auth/login on /auth
router.get('/', authenticateToken, userController.getAllUsers);
router.get('/me', authenticateToken, userController.getMe);

module.exports = router;
