// Importing required dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// Create an Express app instance
const app = express();

// Middleware: Use morgan to log all requests
app.use(morgan('dev'));

// Middleware: Use body-parser to handle JSON requests
app.use(bodyParser.json());

// Serving the documentation.html file from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory movie array to simulate a movie database
const movies = [
  { id: 1, title: 'Boondock Saints', description: 'A group of Irish brothers take vigilante justice into their own hands.', genre: 'Action', director: 'Troy Duffy', imageUrl: 'https://example.com/boondock-saints.jpg', featured: true },
  { id: 2, title: 'The Broken Hearts Club', description: 'A group of friends navigate the ups and downs of their personal lives.', genre: 'Drama', director: 'Greg Berlanti', imageUrl: 'https://example.com/broken-hearts-club.jpg', featured: false },
  { id: 3, title: 'The Dark Knight', description: 'Batman sets out to stop the Joker, a criminal mastermind wreaking havoc on Gotham City.', genre: 'Action', director: 'Christopher Nolan', imageUrl: 'https://example.com/dark-knight.jpg', featured: true },
  { id: 4, title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer, a gangster’s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', genre: 'Crime', director: 'Quentin Tarantino', imageUrl: 'https://example.com/pulp-fiction.jpg', featured: true },
  { id: 5, title: 'Forrest Gump', description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an extraordinary life.', genre: 'Drama', director: 'Robert Zemeckis', imageUrl: 'https://example.com/forrest-gump.jpg', featured: true },
  { id: 6, title: 'Inception', description: 'A thief who enters the dreams of others to steal secrets from their subconscious is given the inverse task of planting an idea into the mind of a CEO.', genre: 'Sci-Fi', director: 'Christopher Nolan', imageUrl: 'https://example.com/inception.jpg', featured: true },
  { id: 7, title: 'Fight Club', description: 'An insomniac office worker and a soap salesman form an underground fight club that evolves into something much more.', genre: 'Drama', director: 'David Fincher', imageUrl: 'https://example.com/fight-club.jpg', featured: false },
  { id: 8, title: 'The Matrix', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', genre: 'Sci-Fi', director: 'Lana Wachowski, Lilly Wachowski', imageUrl: 'https://example.com/matrix.jpg', featured: true },
  { id: 9, title: 'The Lord of the Rings: The Return of the King', description: 'Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron\'s forces.', genre: 'Fantasy', director: 'Peter Jackson', imageUrl: 'https://example.com/lord-of-the-rings.jpg', featured: false },
  { id: 10, title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', genre: 'Sci-Fi', director: 'Christopher Nolan', imageUrl: 'https://example.com/interstellar.jpg', featured: true }
];

// Endpoint to return all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Endpoint to return movie by title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());
  
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// New endpoint to return data about a genre
app.get('/genres/:name', (req, res) => {
  const { name } = req.params;
  res.json({ genre: name, description: `Information about the ${name} genre.` });
});

// New endpoint to return data about a director
app.get('/directors/:name', (req, res) => {
  const { name } = req.params;
  res.json({ director: name, bio: `Bio for ${name}. Born: 1960, Death: 2015.` });
});

// New endpoint for user registration (simple example)
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  res.status(201).json({ message: 'User registered successfully', username, email });
});

// New endpoint to update user info
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  res.json({ message: `User info updated for user ${id}`, username });
});

// New endpoint to add a movie to favorites
app.post('/users/:id/favorites', (req, res) => {
  const { id } = req.params;
  const { movieId } = req.body;
  res.json({ message: `Movie with ID ${movieId} added to user ${id}'s favorites.` });
});

// New endpoint to remove a movie from favorites
app.delete('/users/:id/favorites', (req, res) => {
  const { id } = req.params;
  const { movieId } = req.body;
  res.json({ message: `Movie with ID ${movieId} removed from user ${id}'s favorites.` });
});

// New endpoint to deregister user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `User with ID ${id} has been removed.` });
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
