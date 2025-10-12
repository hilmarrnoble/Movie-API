// controllers/movieControllers.js
const Movie = require('../models/movie');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().lean();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    const code = err.code === 11000 ? 409 : 400;
    res.status(code).json({ message: err.message });
  }
};

exports.getMovieByTitle = async (req, res) => {
  try {
    const movie = await Movie.findOne({ title: req.params.title });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGenreDescription = async (req, res) => {
  try {
    const movie = await Movie.findOne({ 'genre.name': req.params.name });
    if (!movie) return res.status(404).json({ message: 'Genre not found' });
    res.json({ name: movie.genre.name, description: movie.genre.description });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDirector = async (req, res) => {
  try {
    const movie = await Movie.findOne({ 'director.name': req.params.name });
    if (!movie) return res.status(404).json({ message: 'Director not found' });
    res.json(movie.director);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Missing in your router expectations:
exports.updateMovie = async (req, res) => {
  try {
    const updated = await Movie.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Movie not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findOneAndDelete({ title: req.params.title });
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
