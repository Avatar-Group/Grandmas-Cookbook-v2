// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  postedRecipes: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  yumdRecipe: [{
    type: mongoose.Schema.Types.ObejectId,
    ref: 'Recipe'
  }],
  ewwdRecipe: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;