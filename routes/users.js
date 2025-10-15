// routes/users.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/me', authenticateToken, userController.getMe);

// Profile update / delete
router.put('/me', authenticateToken, userController.updateMe);
router.delete('/me', authenticateToken, userController.deleteMe);

// Favorites
router.post('/me/favorites/:movieId', authenticateToken, userController.addFavorite);
router.delete('/me/favorites/:movieId', authenticateToken, userController.removeFavorite);

module.exports = router;
