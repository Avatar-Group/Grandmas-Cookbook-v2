/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const googleAuth = require('./auth/google')
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();
const port = 3000;

googleAuth(passport);

const isDev = process.env.NODE_ENV === 'development'
const baseurl = isDev ? 'http://localhost:8080/' : '/';
const successRedirect = `${baseurl}`;
const failureRedirect = `${baseurl}login`;

app.use(cors());
app.use(express.json());

// app.use(session({ 
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   maxAge: 100000000
// }))
// app.use(passport.initialize());
// app.use(passport.session());


// // put this isLoggedIn middleware in all protected routes
// const isLoggedIn = (req, res, next) =>  req.user ? next() : res.sendStatus(401);

// // testing route for google oauth
// app.get('/auth', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>')
// });

// // when a get request is made to /auth/google, passport.authenticate redirects to google oauth
// app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// // once that process is complete, google redirects to the callbackURL (/google/callback here)
// // during this process, passport handles the token req/res, user req/res, etc.
// // https://www.passportjs.org/concepts/oauth2/authentication/
// // when all that is done, it calls the verify function in the GoogleStrategy passed to passport.use (auth.js)

// app.get('/google/callback', passport.authenticate('google', {
//   successRedirect,
//   failureRedirect
// }))

// app.get('/google/callback', passport.authenticate('google'), (req, res) => {
//   console.log(req.user);
//   res.status(200).json(req.user.id);
// })

// statically serve everything in the dist folder on the route '/dist'
app.use('/dist', express.static(path.join(__dirname, '../dist/')));

// Route for all recipe related features
const tastyRouter = require('./routes/tastyRoute');
const recipeRouter = require('./routes/mongoRecipeRoute');
const userRouter = require('./routes/userRoute');

app.use('/tasty', tastyRouter);
app.use('/recipe', recipeRouter);
app.use('/users', userRouter);

// serve index.html on the route '/'.
// The '/*' is to make sure refresh in browser works with frontend routing (https://ui.dev/react-router-cannot-get-url-refresh)
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) =>
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
  );
}

// statically serve style files, images
app.use('/imgs', express.static(path.join(__dirname, '../client/images')));
app.use('/style',express.static(path.join(__dirname, '../client/scss')));

/*
 * To-Do: Add a 404 page backup route - MUST BE MOUNTED LAST 
 */
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../notFound.html'));
});

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


module.exports = baseurl;