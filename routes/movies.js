const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authenticateToken = require('../middleware/auth');

router.get('/', movieController.getAllMovies);
router.post('/', authenticateToken, movieController.createMovie);

module.exports = router;
