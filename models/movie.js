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
  actors: [  // ✅ plural, array of actor objects for flexibility
    {
      name: String,
      imagePath: String,
      featured: Boolean
    }
  ],
  releaseYear: Number,
  imageURL: String, // ✅ optional image for poster art
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);

