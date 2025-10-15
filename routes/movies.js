// routes/movies.js
const express = require('express');
const movieController = require('../controllers/movieControllers');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * All /api/movies endpoints are protected again (per Part 1).
 * Clients must send: Authorization: Bearer <JWT>
 */
router.get('/', authenticateToken, movieController.getAllMovies);
router.get('/:title', authenticateToken, movieController.getMovieByTitle);
router.post('/', authenticateToken, movieController.createMovie);
router.put('/:title', authenticateToken, movieController.updateMovie);
router.delete('/:title', authenticateToken, movieController.deleteMovie);

module.exports = router;
