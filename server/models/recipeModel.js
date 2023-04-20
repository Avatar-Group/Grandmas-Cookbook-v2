// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title : {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  directions: [{
    type: String,
    required: true
  }],
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    measurement: {
      type: String,
      required: true
    }
  }],
  yumdVote: {
    type: Number,
    default: 0
  },
  ewwdVote: {
    type: Number,
    default: 0
  },
  recipeImage: {
    data: Buffer,
    contentType: String,
  }
});

const Recipe = mongoose.model('recipe', recipeSchema);
module.exports = Recipe;