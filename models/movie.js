const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String
  },
  Actors: {
  name: String,
  ImagePath: String,
  Featured: Boolean
  },
  releaseYear: Number
});

module.exports = mongoose.model('Movie', movieSchema);
