// eslint-disable-next-line import/extensions
const User = require('../models/userModel');

const userController = {};

userController.getUserOneRecipe = async (req, res, next) => {
  // destructuring user id & recipe title
  const { userId, recipeTitle } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User doesn't exist");
    }
    const userRecipes = user.postedRecipes;
    const recipe = userRecipes.get(recipeTitle);

    if (!recipe) {
      console.log('Recipe does not exist.');
    }
    res.locals.recipe = recipe;
    return next();
  } catch (err) {
    return next({
      log: 'error occured in userController.getUserOneRecipe',
      status: 500,
      message: { err: "failed to get user's recipe from database" },
    });
  }
};

// update user's yumdRecipes
userController.updateUserYumdVotes = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const user = await User.findOne({ googleId: req.user.id });
    // add recipe to yumdRecipe field
    user.yumdRecipes.set(recipeId, recipeId);
    await user.save();
    req.user = user;
    return next();
  } catch (err) {
    return next({
      log: err,
      message: { err: 'Unable to yum a recipe' },
    });
  }
};

// update user's ewwddRecipes
userController.updateUserEwwdVotes = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const user = await User.findOne({ googleId: req.user.id });
    // add recipe to ewwdRecipe field
    user.ewwdRecipes.set(recipeId, recipeId);
    await user.save();
    req.user = user;
    return next();
  } catch (err) {
    return next({
      log: err,
      message: { err: 'Unable to eww a recipe' },
    });
  }
};

// delete recipe from user's postedRecipes
userController.deleteUserPostedRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const user = await User.findOne({ googleId: req.user.id });
    user.postedRecipes.delete(recipeId);
    await user.save();
    req.user = user;
    return next();
  } catch (err) {
    return next({
      log: err,
      message: { err: 'Unable to delete a recipe' },
    });
  }
};
// update user's posted recipes
userController.updateUserPostedRecipes = async (req, res, next) => {
  
  const { recipeId } = req.params;
  try {
    console.log(`inside of updateUserpostedRecipe, recipeId: ${recipeId}`);
    console.log(`inside of updateUserpostedRecipe, current user: ${req.user.id}`);
    const user = await User.findOne({ googleId: req.user.id });

    // add recipe to user's profile
    user.postedRecipes.set(recipeId, recipeId);

    await user.save();

    req.user = user;
    return next();
  } catch (err) {
    return next({
      log: "Error adding recipe to user's profile",
      message: { err: 'Unable to add recipe' },
    });
  }
};

// delete recipe from user's yumdRecipes
userController.deleteUserYumdRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const user = await User.findOne({ googleId: req.user.id });
    user.yumdRecipes.delete(recipeId);
    await user.save();
    req.user = user;
    return next();
  } catch (err) {
    return next({
      log: err,
      message: { err: 'Unable to delete a yumd recipe' },
    });
  }
};

// delete recipe from user's ewwdRecipes
userController.deleteUserEwwdRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const user = await User.findOne({ googleId: req.user.id });
    user.ewwdRecipes.delete(recipeId);
    await user.save();
    req.user = user;
    return next();
  } catch (err) {
    return next({
      log: err,
      message: { err: 'Unable to delete an ewwd recipe' },
    });
  }
};

userController.isLoggedIn = async (req, res, next) => {
  try {
    if (req.user) return next();
    // maybe redirect to /login or something?
    return res.sendStatus(401);
  } catch (err) {
    return next({
      log: 'error with user verification, check userController.isLoggedIn',
      message: { err: 'User not verified' },
    });
  }
};

userController.logout = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) throw Error(err);
      // console.log('user is logged out!');
      // return next()
    });
    return next();
  } catch (err) {
    return next({
      log: 'error with user logout, check userController.logout',
      message: { err: 'User did not log out' },
    });
  }
};

// a user must be logged in for this route to work, or else server will respond with a 504 error
userController.getUserByGoogleId = async (req, res, next) => {
  try {
    if (!req.user) res.redirect('/');
    const googleId = req.user.id;
    // console.log(`This is current googleId: ${googleId}`);
    // query db for use whose googleId matches googleId
    const user = await User.findOne({ googleId });
    // ERROR IS IN HERE
    if (!user) throw new Error();
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: 'error with finding user by google id, check userController.getUserByGoogleId',
      message: { err: 'Could not find user by google id' },
    });
  }
};



module.exports = userController;

// grab all user's recipes
// userController.getAllUsersRecipes = async (req, res, next) => {
//   // destructuring user id
//   const { userId } = req.params;

//   try {
//     // query user id and postedRecipes
//     const user = await User.findById(userId).populate('postedRecipes');
//     console.log('This is user: ', user);

//     if (!user) {
//       return res.status(404).json({ err: 'User not found' });
//     }

//     res.locals.postedRecipes = user.postedRecipes;
//     return next();
//   } catch (err) {
//     // error handler
//     return next({
//       log: 'error occured in userController.getAllUsersRecipes',
//       status: 500,
//       message: { err: 'failed to get all users recipes from database' },
//     });
//   }
// };

// // grab all user's yumd recipes
// userController.getAllYumdRecipes = async (req, res, next) => {
//   // destructuring user id
//   const { userId } = req.params;

//   try {
//     // query user id and yumdRecipes
//     const user = await User.findById(userId).populate('yumdRecipes');
//     console.log('This is user: ', user);

//     if (!user) {
//       return res.status(404).json({ err: 'User not found' });
//     }

//     res.locals.allYumdRecipes = user.yumdRecipes;
//     return next();
//   } catch (err) {
//     // error handler
//     return next({
//       log: 'error occured in userController.getAllYumdRecipes',
//       status: 500,
//       message: { err: 'failed to get all users recipes from database' },
//     });
//   }
// };

// // grab all user's ewwd recipes
// userController.getAllEwwdRecipes = async (req, res, next) => {
//   // destructuring user id
//   const { userId } = req.params;

//   try {
//     // query user id and ewwdRecipes
//     const user = await User.findById(userId).populate('ewwdRecipes');
//     console.log('This is user: ', user);

//     if (!user) {
//       return res.status(404).json({ err: 'User not found' });
//     }

//     res.locals.allEwwdRecipes = user.ewwdRecipes;
//     return next();
//   } catch (err) {
//     // error handler
//     return next({
//       log: 'error occured in userController.getAllUsersRecipes',
//       status: 500,
//       message: { err: 'failed to get all users recipes from database' },
//     });
//   }
// };
