// Importing required dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Create an Express app instance
const app = express();

// Middleware: Use morgan to log all requests
app.use(morgan('dev'));

// Serving the documentation.html file from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to return top 10 movies in JSON format
app.get('/movies', (req, res) => {
  const topMovies = [
    { id: 1, title: 'Boondock Saints', year: 1999 },
    { id: 2, title: 'The Broken Hearts Club', year: 2000 },
    { id: 3, title: 'The Dark Knight', year: 2008 },
    { id: 4, title: 'Pulp Fiction', year: 1994 },
    { id: 5, title: 'Forrest Gump', year: 1994 },
    { id: 6, title: 'Inception', year: 2010 },
    { id: 7, title: 'Fight Club', year: 1999 },
    { id: 8, title: 'The Matrix', year: 1999 },
    { id: 9, title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { id: 10, title: 'Interstellar', year: 2014 }
  ];
  
  res.json(topMovies);
});

// Default endpoint returning a text message
app.get('/', (req, res) => {
  res.send('Welcome to the Movie API!');
});

// Error-handling middleware to log errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set the port to 8081
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
