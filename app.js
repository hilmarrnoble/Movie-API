require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const app = express();
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET || 'default', resave: false, saveUninitialized: true }));


app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
