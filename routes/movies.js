// routes/movies.js
const express = require("express");
const movieController = require("../controllers/movieController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", movieController.getAllMovies);
router.get("/:title", authenticateToken, movieController.getMovieByTitle);
router.post("/", authenticateToken, movieController.createMovie);
router.put("/:title", authenticateToken, movieController.updateMovie);
router.delete("/:title", authenticateToken, movieController.deleteMovie);

module.exports = router;
