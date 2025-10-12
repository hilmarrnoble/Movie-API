// index.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const connectDB = require('./config/connect');

dotenv.config();

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // optionally: cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' })
app.use(morgan('dev'));

// Passport
require('./config/passport')(passport);
app.use(passport.initialize());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));

// Swagger docs
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Errors
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
