// db/seed.js
const mongoose = require('mongoose');
const connectDB = require('../config/connect');
const Movie = require('../models/movie');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hashSync(password, 10);

async function seed() {
  await connectDB();
  await mongoose.connection.dropDatabase();

  const movies = await Movie.insertMany([
    {
      title: 'Inception',
      description: 'A mind-bending thriller about dream invasion.',
      genre: { name: 'Sci-Fi', description: 'Science Fiction movies' },
      director: { name: 'Christopher Nolan', birthYear: 1970 },
      releaseYear: 2010
    },
    {
      title: 'Interstellar',
      description: 'A space exploration movie through wormholes.',
      genre: { name: 'Sci-Fi', description: 'Science Fiction movies' },
      director: { name: 'Christopher Nolan', birthYear: 1970 },
      releaseYear: 2014
    },
    {
      title: 'The Dark Knight',
      description: 'Batman battles the Joker in Gotham.',
      genre: { name: 'Action', description: 'Action-packed superhero films' },
      director: { name: 'Christopher Nolan', birthYear: 1970 },
      releaseYear: 2008
    },
    {
      title: 'The Godfather',
      description: 'A mafia family saga.',
      genre: { name: 'Crime', description: 'Crime and mob drama' },
      director: { name: 'Francis Ford Coppola', birthYear: 1939 },
      releaseYear: 1972
    },
    {
      title: 'Pulp Fiction',
      description: 'Intersecting stories of crime in LA.',
      genre: { name: 'Crime', description: 'Crime and drama' },
      director: { name: 'Quentin Tarantino', birthYear: 1963 },
      releaseYear: 1994
    },
    {
      title: 'Gladiator',
      description: 'A Roman general seeks revenge.',
      genre: { name: 'Historical', description: 'Historical epics' },
      director: { name: 'Ridley Scott', birthYear: 1937 },
      releaseYear: 2000
    },
    {
      title: 'Parasite',
      description: 'A poor family infiltrates a rich household.',
      genre: { name: 'Thriller', description: 'Thrillers with social commentary' },
      director: { name: 'Bong Joon-ho', birthYear: 1969 },
      releaseYear: 2019
    },
    {
      title: 'Spirited Away',
      description: 'A girl enters a magical spirit world.',
      genre: { name: 'Fantasy', description: 'Animated fantasy' },
      director: { name: 'Hayao Miyazaki', birthYear: 1941 },
      releaseYear: 2001
    },
    {
      title: 'The Matrix',
      description: 'A hacker discovers reality is a simulation.',
      genre: { name: 'Sci-Fi', description: 'Cyberpunk and philosophical sci-fi' },
      director: { name: 'Lana Wachowski', birthYear: 1965 },
      releaseYear: 1999
    },
    {
      title: 'Whiplash',
      description: 'A jazz drummer pushed to the limit.',
      genre: { name: 'Drama', description: 'Intense character-driven drama' },
      director: { name: 'Damien Chazelle', birthYear: 1985 },
      releaseYear: 2014
    }
  ]);

  const users = await User.insertMany([
    {
      name: 'John Doe',
      username: 'jdoe',
      password: hashPassword('password1'),
      email: 'jdoe@example.com',
      birthday: new Date('1990-01-01'),
      favoriteMovies: [movies[0]._id, movies[1]._id]
    },
    {
      name: 'Alice Smith',
      username: 'asmith',
      password: hashPassword('password2'),
      email: 'asmith@example.com',
      birthday: new Date('1985-05-15'),
      favoriteMovies: [movies[3]._id, movies[4]._id]
    },
    {
      name: 'Bruce Wayne',
      username: 'bwayne',
      password: hashPassword('password3'),
      email: 'bwayne@example.com',
      birthday: new Date('1975-07-30'),
      favoriteMovies: [movies[2]._id]
    },
    {
      name: 'Clark Kent',
      username: 'ckent',
      password: hashPassword('password4'),
      email: 'ckent@example.com',
      birthday: new Date('1980-12-25'),
      favoriteMovies: [movies[5]._id, movies[6]._id]
    },
    {
      name: 'Diana Parker',
      username: 'dparker',
      password: hashPassword('password5'),
      email: 'dparker@example.com',
      birthday: new Date('1995-03-10'),
      favoriteMovies: [movies[7]._id, movies[8]._id, movies[9]._id]
    }
  ]);

  console.log('✅ Database seeded successfully!');
  mongoose.connection.close();
}

seed().catch(err => console.error('❌ Seeding error:', err));
