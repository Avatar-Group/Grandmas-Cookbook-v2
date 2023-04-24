/* eslint-disable import/no-extraneous-dependencies */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
const User = require('../models/userModel')


// https://www.youtube.com/watch?v=Q0a0594tOrc

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    // console.log('serializeUser', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // console.log('deserializeUser', user);
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
  (async (request, accessToken, refreshToken, profile, done) => {
    try {
      console.log('verified!')
      console.log('here is the profile:', profile);
      const user = await User.findOne({ googleId: profile.id , email: profile._json.email });
      const newUser = { googleId: profile.id, email: profile._json.email }
      console.log('here is the new user', newUser);
      if (!user) await User.create(newUser)
      done(null, profile);
    } catch (err) {
      console.error(err);
      done(err);
    }
  })

  ))
};
