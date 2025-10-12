// config/passport.js
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // ✅ correct path & case

module.exports = (passport) => {
  // Local (email/password) for login
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Incorrect email.' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // JWT for protected endpoints
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'changeme_in_prod',
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.id).select('-password');
          if (user) return done(null, user);
          return done(null, false);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
