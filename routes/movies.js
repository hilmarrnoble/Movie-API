const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieControllers');
const authenticateToken = require('../middleware/auth');

router.get('/', movieController.getAllMovies);
router.get('/title/:title', movieController.getMovieByTitle);
router.get('/genres/:name', movieController.getGenreDescription);
router.get('/directors/:name', movieController.getDirector);
router.post('/', authenticateToken, movieController.createMovie);

module.exports = router;

