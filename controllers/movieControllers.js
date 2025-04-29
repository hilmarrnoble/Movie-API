const Movie = require('../models/movie.js');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  const savedMovie = await newMovie.save();
  res.status(201).json(savedMovie);
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
