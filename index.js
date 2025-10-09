const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/connect'); // Centralized DB connection
const movieRoutes = require('./routes/movies'); // Movie routes
const userRoutes = require('./routes/users'); // User routes

dotenv.config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
