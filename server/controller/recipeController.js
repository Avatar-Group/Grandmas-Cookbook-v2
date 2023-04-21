const Recipe = require('../models/recipeModel');
const User = require('../../models/userModel');

const recipeController = {};

// get all recipes
recipeController.getAllRecipes = (req, res, next) => {
  Recipe.find({}, (err, recipes) => {
    if (err) return next(`Error in recipeController.getAllRecipes: ${JSON.stringify(err)}`);

    res.locals.allRecipes = recipes;
    return next();
  })
};

// add a recipe to database
recipeController.addRecipe = async (req, res, next) => {
  // make sure to also add to user's obj of recipes
  const { userId } = req.params;
  const { recipeTitle, description, directions, ingredientName, ingredientMeasurement, recipeImage } = req.body;

  // check if input fields are properly filled
  if (!recipeTitle || !description || !directions || !ingredients) {
    res.status(404);
    return next({
      log: 'error in recipeController.addRecipe',
      message: { err: 'invalid date - missing inputs' }
    });
  }
  // search for current user
  const user = await User.findById(userId);
  // declare input for new recipe
  const newRecipe = {
    createdBy: user._id,
    recipeTitle: recipeTitle,
    description: description,
    directions: directions,
    ingredients: [{
      name: ingredientName,
      measurement: ingredientMeasurement
    }]
  };

  // create query to add to the database
  try {
    const recipe = await Recipe.create(newRecipe);
    res.locals.newRecipe = recipe;
    return next();
  }
  catch(err) {
    return next({
      log: 'error in recipeController.addRecipe',
      message: { err: 'failed to add a new recipe to database' }
    })
  };
};

// update a recipe to database
recipeController.updateRecipe = (req, res, next) => {

};

// delete a recipe from database
recipeController.deleteRecipe = (req, res, next) => {

};

// upvote a recipe in database
recipeController.upVoteRecipe = (req, res, next) => {

};

// downvote a recipe in database
recipeController.downVoteRecipe = (req, res, next) => {

};

// add an image in database
recipeController.addImage = (req, res, next) => {

};

// update an image in database
recipeController.updateImage = (req, res, next) => {

};


module.exports = recipeController;