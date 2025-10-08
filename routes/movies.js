// routes/movies.js
import express from "express";
import * as movieController from "../controllers/movieController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route GET /api/movies
 * @desc Get all movies
 * @access Public (temporarily)
 */
router.get("/", movieController.getAllMovies);

/**
 * @route GET /api/movies/:title
 * @desc Get a single movie by title
 * @access Protected
 */
router.get("/:title", authenticateToken, movieController.getMovieByTitle);

/**
 * @route POST /api/movies
 * @desc Add a new movie
 * @access Protected
 */
router.post("/", authenticateToken, movieController.createMovie);

/**
 * @route PUT /api/movies/:title
 * @desc Update a movie by title
 * @access Protected
 */
router.put("/:title", authenticateToken, movieController.updateMovie);

/**
 * @route DELETE /api/movies/:title
 * @desc Delete a movie by title
 * @access Protected
 */
router.delete("/:title", authenticateToken, movieController.deleteMovie);

export default router;
