const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/connect'); // Centralized DB connection
const userRoutes = require('./routes/users'); // User routes
const movieRoutes = require('./routes/movies'); // ✅ Movie routes

dotenv.config(); // Load environment variables from .env

const app = express();

// Connect to MongoDB
connectDB(); // Replaces manual mongoose.connect() call

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // To handle cross-origin requests

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes); // ✅ Add this line

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
