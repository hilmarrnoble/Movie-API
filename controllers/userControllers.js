// controllers/userControllers.js
const User = require('../models/user');
const Movie = require('../models/movie');

// GET /api/users
exports.getAllUsers = async (_req, res) => {
  const users = await User.find().select('-password').lean();
  res.json(users);
};

// GET /api/users/me
exports.getMe = async (req, res) => {
  res.json(req.user); // set by passport in middleware
};

// PUT /api/users/me
exports.updateMe = async (req, res) => {
  try {
    const u = await User.findById(req.user._id);
    if (!u) return res.status(404).json({ message: 'User not found' });

    const { name, email, birthday, password } = req.body;
    if (name !== undefined) u.name = name;
    if (email !== undefined) u.email = email;
    if (birthday !== undefined) u.birthday = birthday;
    if (password) u.password = password; // will hash in pre('save')

    await u.save();
    const sanitized = u.toJSON();
    res.json(sanitized);
  } catch (err) {
    const code = err.code === 11000 ? 409 : 400;
    res.status(code).json({ message: err.message });
  }
};

// DELETE /api/users/me
exports.deleteMe = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(204).send();
};

// POST /api/users/me/favorites/:movieId
exports.addFavorite = async (req, res) => {
  const { movieId } = req.params;
  const movie = await Movie.findById(movieId).select('_id');
  if (!movie) return res.status(404).json({ message: 'Movie not found' });

  const u = await User.findById(req.user._id);
  if (!u) return res.status(404).json({ message: 'User not found' });

  const exists = u.favoriteMovies.some(id => id.toString() === movieId);
  if (!exists) u.favoriteMovies.push(movieId);
  await u.save();

  res.json(u.toJSON());
};

// DELETE /api/users/me/favorites/:movieId
exports.removeFavorite = async (req, res) => {
  const { movieId } = req.params;
  const u = await User.findById(req.user._id);
  if (!u) return res.status(404).json({ message: 'User not found' });

  u.favoriteMovies = u.favoriteMovies.filter(id => id.toString() !== movieId);
  await u.save();

  res.json(u.toJSON());
};
