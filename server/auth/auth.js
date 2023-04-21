/* eslint-disable import/no-extraneous-dependencies */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
// const User = require('../models/userModel')


// https://www.youtube.com/watch?v=Q0a0594tOrc

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback: true,
  },
  // this is the verify function of the strategy, which hanldes
  // the profile information gathered during oauth
  ((request, accessToken, refreshToken, profile, done) => {
    console.log('verified!')
    console.log('here is the profile:', profile);
    // User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
    done(null, profile);
  })

  ))
};
