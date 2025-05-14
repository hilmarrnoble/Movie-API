// server.js or app.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies'); // Example protected route

const app = express();
require('./config/passport')(passport); // ⬅️ Initialize strategies

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/movies', require('./middleware/auth'), movieRoutes); // Protect with JWT

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-api')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
