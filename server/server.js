/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const auth = require('./auth/auth')

require('dotenv').config();

const app = express();
const port = 3000;

auth(passport);


app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

// put this isLoggedIn middleware in all protected routes
const isLoggedIn = (req, res, next) =>  req.user ? next() : res.sendStatus(401);

// testing route for google oauth
app.get('/auth', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google </a>')
});

// when a get request is made to /auth/google, passport.authenticate redirects to google oauth
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// once that process is complete, google redirects to the callbackURL (/google/callback here)
// during this process, passport handles the token req/res, user req/res, etc.
// https://www.passportjs.org/concepts/oauth2/authentication/
// when all that is done, it calls the verify function in the GoogleStrategy passed to passport.use (auth.js)

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/auth/failure'
}))


app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello, ${req.user.displayName}`)
});

app.get('/auth/failure', (req, res) => {
  res.send('Authentication FAILED');
});

app.get('/logout', (req, res) => {
  console.log('in logout');
  // logs the user out
  req.logout();
  console.log('after logout')
  // removes the current session
  req.session.destroy();
  console.log('after destroy');
  res.send('Goodbye');
})

// statically serve everything in the dist folder on the route '/dist'
app.use('/dist', express.static(path.join(__dirname, '../dist/')));

// Route for all recipe related features
const recipeRouter = require('./routes/recipeRoute');
const tastyRouter = require('./routes/tastyRoute');

app.use('/tasty', tastyRouter)
app.use('/recipe', recipeRouter);

// serve index.html on the route '/'.
// The '/*' is to make sure refresh in browser works with frontend routing (https://ui.dev/react-router-cannot-get-url-refresh)
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
  );
}

/*
 * To-Do: Add a 404 page backup route
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
