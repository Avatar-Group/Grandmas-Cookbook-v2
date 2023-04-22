const Recipe = require('../models/recipeModel');
// eslint-disable-next-line import/extensions
const User = require('../models/userModel');

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
recipeController.addNewRecipe = async (req, res, next) => {
  const { userId } = req.params;
  
  try {
    // make sure to also add to user's obj of recipes
    const { 
      url,
      title, 
      description, 
      directions, 
      ingredientName, 
      ingredientMeasurement,
      tastyId, 
      imagePath 
    } = req.body;

    // check if input fields are properly filled
    if (!title || !description || !directions || !ingredientName || !ingredientMeasurement) {
      res.status(404);
      return next({
        log: 'error in recipeController.addRecipe',
        message: { err: 'invalid date - missing inputs' }
      });
    }
    // search for current user
    const user = await User.findById(userId);
    // declare input for new recipe
    const newRecipe = new Recipe({
      createdBy: user._id,
      // eslint-disable-next-line object-shorthand
      url: url,
      recipeTitle: title,
      // eslint-disable-next-line object-shorthand
      description: description,
      // eslint-disable-next-line object-shorthand
      directions: directions,
      ingredients: [{
        name: ingredientName,
        measurement: ingredientMeasurement
      }],
      // eslint-disable-next-line object-shorthand
      tastyId: tastyId,
      imagePath: res.locals.awsimagePath || imagePath,
    });

    // create query to add to the database
    const recipe = await newRecipe.save();
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
recipeController.updateRecipe = async (req, res, next) => {
  const { userId, recipeId } = req.params;

  try {
    // search for current user
    const user = await User.findById(userId);

    const { 
      url, 
      title, 
      description, 
      directions, 
      ingredientName, 
      ingredientMeasurement, 
      tastyId,
      imagePath 
    } = req.body;

    const update = {
      createdBy: user._id,
      // eslint-disable-next-line object-shorthand
      url: url,
      recipeTitle: title,
      // eslint-disable-next-line object-shorthand
      description: description,
      // eslint-disable-next-line object-shorthand
      directions: directions,
      ingredients: [{
        name: ingredientName,
        measurement: ingredientMeasurement
      }],
      // eslint-disable-next-line object-shorthand
      tastyId: tastyId,
      imagePath: res.locals.awsimagePath || imagePath,
    };
  
    const updateRecipe = await Recipe.findOneAndUpdate(
      recipeId, // recipeId from state
      update, // the changes
      { new: true } // will return updated document
      );

    res.locals.updateRecipe = updateRecipe;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in recipeController.updateRecipe',
      message: { err: 'failed to update this recipe in database' }
    });
  }
};

// delete a recipe from user's profile & database
recipeController.deleteRecipe = async (req, res, next) => {
  const { userId, recipeId } = req.params;

  try {
    // query for recipe ID by userID
    const deleteRecipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      createdBy: userId,
    });

    if (deleteRecipe) {
      res.local.delete = {
        success: true,
        message: 'Recipe deleted successfully',
        data: deleteRecipe,
      };
      return next();
    } 
    return res.status(404).json({
      success: false,
      error: 'Recipe not found',
    });
  }
  catch (err) {
    return next({
      log: 'error in recipeController.deleteRecipe',
      message: { err: 'Unable to delete recipe from database' }
    })
  };
};

// upvote a recipe in database
recipeController.upVoteRecipe = async (req, res, next) => {
  const { recipeId, userId } = req.params;
  
  try {
    // query for recipe by recipe ID and increment yumdVote
    const upVoteRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $inc: { yumdVote: 1 } },
      { new: true},
    );
    
    res.locals.upVoteRecipe = upVoteRecipe;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in recipeController.upVoteRecipe',
      message: { err: 'Could not yum this recipe '},
    });
  };
};

// downvote a recipe in database
recipeController.downVoteRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  
  try {
    // query for recipe by iD and increment yumdVote
    const downVoteRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $inc: { ewwdVote: 1 } },
      { new: true},
    );
    res.locals.downVoteRecipe = downVoteRecipe;
    return next();
  }
  catch (err) {
    return next({
      log: 'error in recipeController.downVoteRecipe',
      message: { err: 'Could not eww this recipe '},
    });
  };
};


module.exports = recipeController;