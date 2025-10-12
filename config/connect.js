// config/connect.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const raw = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!raw) {
      throw new Error('MONGODB_URI/MONGO_URI is not defined');
    }

    // Ensure a database name is present; if missing, append /movieapi
    let mongoURI = raw;
    if (/^mongodb(\+srv)?:\/\/[^/]+\/?$/.test(raw)) {
      mongoURI = raw.replace(/\/?$/, '/movieapi');
      console.warn(
        `[connect] No DB name found in URI; using ${mongoURI} (append your own in .env to silence this)`
      );
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // opt-in strictQuery to avoid deprecations on Mongoose 7+
      // (optional) mongoose.set('strictQuery', true);
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
