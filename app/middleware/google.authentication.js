// app.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const db = require('../config/db');

const app = express();

// Express session middleware
app.use(
  session({
    secret: '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',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: '942463896290-mg6ttngg21455m4lp5k8mg2sm6aupfmb.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8085/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Store user data in the database
      const { id, displayName, emails } = profile;
      const email = emails[0].value;
      const Token = accessToken

      const user = {
        g_Id: id,
        vName: displayName,
        vEmail: email,
        Type: 'google',
        Token: accessToken
      };

      const query = 'INSERT INTO student SET ?';
      db.query(query, user, (err, result) => {
        if (err) throw err;
        return done(null, user);
      });
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Google OAuth route for login
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback route
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/',
  })
);

// Profile route after successful login
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Registration scuessfull`);
  } else {
    res.redirect('/');
  }
});

module.exports = app