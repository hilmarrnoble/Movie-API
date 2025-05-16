// models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String,
    birthYear: Number
  },
  Actors: {
    name: String,
    ImagePath: String,
    Featured: Boolean
  },
  releaseYear: Number
});

module.exports = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
