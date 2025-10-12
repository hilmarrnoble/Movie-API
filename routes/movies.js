// routes/movies.js
const express = require('express');
const movieController = require('../controllers/movieControllers'); // ✅ correct file
const { authenticateToken } = require('../middleware/auth'); // ✅ correct export

const router = express.Router();

// GET public for client landing
router.get('/', movieController.getAllMovies);

// Example protected endpoints:
router.get('/:title', authenticateToken, movieController.getMovieByTitle);
router.post('/', authenticateToken, movieController.createMovie);
router.put('/:title', authenticateToken, movieController.updateMovie);
router.delete('/:title', authenticateToken, movieController.deleteMovie);

module.exports = router;
