const Recipe = require('../models/recipeModel');
// eslint-disable-next-line import/extensions
const User = require('../models/userModel');

const recipeController = {};

// get all recipes
recipeController.getAllRecipes = async (req, res, next) => {
  try {
    console.log(`inside of get all recipes controller`);
    const getRecipes = await Recipe.find({});
    res.locals.allRecipes = getRecipes;
    return next();
  } catch (err) {
    return next({
      message: { err: 'error in get all recipes' },
    });
  }
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
      ingredientList,
      tastyId,
      imagePath,
    } = req.body;

    // console.log('Title:', req.body.recipeTitle)
    // console.log('Description', req.body.description)
    // console.log('Directions:', req.body.directions)
    // console.log("Ingredient Name:", req.body.ingredients[0].name)
    // console.log('IngredientMeasurement', req.body.ingredients[0].measurement)
    // check if input fields are properly filled
    if (!title || !directions || !ingredientList) {
      res.status(404);
      return next({
        log: 'error in recipeController.addRecipe',
        message: { err: 'invalid recipe submission - missing inputs' },
      });
    }

    // search for current user
    // WAITING FOR MICHAEL TO DO THE OAUTH
    // const user = await User.findById(userId);

    // declare input for new recipe
    const newRecipe = {
      // createdBy: user._id
      url,
      title,
      description,
      directions,
      ingredientList,
      tastyId,
      imagePath: res.locals.awsimagePath || imagePath,
    };

    // create query to add to the database
    const recipe = await Recipe.create(newRecipe);

    res.locals.newRecipe = recipe;

    return next();
  } catch (err) {
    console.log(err);
    return next({
      log: 'error in recipeController.addRecipe',
      message: { err: 'failed to add a new recipe to database' },
    });
  }
};

// update a recipe to database
recipeController.updateRecipe = async (req, res, next) => {
  const { userId, recipeId } = req.params;

  try {
    // search for current user
    // const user = await User.findById(userId);

    const {
      url,
      title,
      description,
      directions,
      ingredientList,
      tastyId,
      imagePath,
    } = req.body;

    const update = {
      url,
      title,
      description,
      directions,
      ingredientList,
      tastyId,
      imagePath: res.locals.awsimagePath || imagePath,
    };

    const updateRecipe = await Recipe.findByIdAndUpdate(
      recipeId, // recipeId from state
      update, // the changes
      { new: true } // will return updated document
    );

    res.locals.updateRecipe = updateRecipe;
    return next();
  } catch (err) {
    return next({
      log: 'error in recipeController.updateRecipe',
      message: { err: 'failed to update this recipe in database' },
    });
  }
};

// delete a recipe from user's profile & database
recipeController.deleteRecipe = async (req, res, next) => {
  const { recipeId, userId } = req.params;

  try {
    // query for recipe ID by userID
    const deleteRecipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      createdBy: userId,
    });

    if (deleteRecipe) {
      res.locals.delete = {
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
  } catch (err) {
    return next({
      log: 'error in recipeController.deleteRecipe',
      message: { err: 'Unable to delete recipe from database' },
    });
  }
};

// upvote a recipe in database
recipeController.upVoteRecipe = async (req, res, next) => {
  const { recipeId, userId } = req.params;

  try {
    // query for recipe by recipe ID and increment yumdVote
    const upVoteRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $inc: { yumdVote: 1 } },
      { new: true }
    );

    res.locals.upVoteRecipe = upVoteRecipe;
    return next();
  } catch (err) {
    return next({
      log: 'error in recipeController.upVoteRecipe',
      message: { err: 'Could not yum this recipe ' },
    });
  }
};

// downvote a recipe in database
recipeController.downVoteRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    // query for recipe by iD and increment yumdVote
    const downVoteRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $inc: { ewwdVote: 1 } },
      { new: true }
    );
    res.locals.downVoteRecipe = downVoteRecipe;
    return next();
  } catch (err) {
    return next({
      log: 'error in recipeController.downVoteRecipe',
      message: { err: 'Could not eww this recipe ' },
    });
  }
};

module.exports = recipeController;
