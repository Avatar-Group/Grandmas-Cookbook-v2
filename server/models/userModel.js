// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// https://mongoosejs.com/docs/schematypes.html#maps

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email'],
  },
  password: {
    type: String,
  },
  postedRecipes: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  yumdRecipes: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  ewwdRecipes: {
    type: Map,
    of: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
