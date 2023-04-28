// eslint-disable-next-line import/extensions
const User = require('../models/userModel');

const userController = {};

// grab all user's recipes
userController.getAllUsersRecipes = async (req, res, next) => {
  // destructuring user id
  const { userId } = req.params;

  try {
    // query user id and postedRecipes 
    const user = await User.findById(userId).populate('postedRecipes');
    console.log('This is user: ', user);

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    };

    res.locals.postedRecipes = user.postedRecipes;
    return next();
  } 
  // error handler
  catch (err) {
    return next({
      log: 'error occured in userController.getAllUsersRecipes',
      status: 500,
      message: { err: 'failed to get all users recipes from database' }
    })
  };
};

userController.getUserOneRecipe = async (req, res, next) => {
  // destructuring user id & recipe title
  const { userId, recipeTitle } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log('User doesn\'t exist');
    }
    const userRecipes = user.postedRecipes;
    const recipe = userRecipes.get(recipeTitle);

    if (!recipe) {
      console.log('Recipe does not exist.');
    } 
    
    res.locals.recipe = recipe;
    return next();
  }
  catch (err) {
    return next({
      log: 'error occured in userController.getUserOneRecipe',
      status: 500,
      message: { err: 'failed to get user\'s recipe from database' }
    })
  }
};

// grab all user's yumd recipes
userController.getAllYumdRecipes = async (req, res, next) => {
  // destructuring user id
  const { userId } = req.params;

  try {
    // query user id and yumdRecipes 
    const user = await User.findById(userId).populate('yumdRecipes');
    console.log('This is user: ', user);

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    };

    res.locals.allYumdRecipes = user.yumdRecipes;
    return next();
  } 
  // error handler
  catch (err) {
    return next({
      log: 'error occured in userController.getAllYumdRecipes',
      status: 500,
      message: { err: 'failed to get all users recipes from database' }
    })
  };
};

// grab all user's ewwd recipes
userController.getAllEwwdRecipes = async (req, res, next) => {
  // destructuring user id
  const { userId } = req.params;

  try {
    // query user id and ewwdRecipes 
    const user = await User.findById(userId).populate('ewwdRecipes');
    console.log('This is user: ', user);

    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    };

    res.locals.allEwwdRecipes = user.ewwdRecipes;
    return next();
  } 
  // error handler
  catch (err) {
    return next({
      log: 'error occured in userController.getAllUsersRecipes',
      status: 500,
      message: { err: 'failed to get all users recipes from database' }
    })
  };
};

// update user's yumdRecipes an user's yumdVotes
userController.updateUserYumdVotes = async (req, res, next) => {
  const { userId, recipeId } = req.params;

  try {
    const user = await User.findById(userId);
    const recipe = user.postedRecipes.get(recipeId)

    // add recipe to yumdRecipe field
    user.yumdRecipes.set(recipeId, recipeId);

    // increment user yumd vote 
    user.userYumdVotes += 1;

    await user.save();

    req.user = user;
    return next();
  }
  catch (err) {
    return next({
      log: 'error with updating yumd votes for user\'s recipe',
      message: { err: 'Unable to yum a recipe' },
    });
  };
};

// update user's ewwddRecipes an user's yumdVotes
userController.updateUserEwwdVotes = async (req, res, next) => {
  const { userId, recipeId } = req.params;

  try {
    const user = await User.findById(userId);
    const recipe = user.postedRecipes.get(recipeId)

    // add recipe to ewwdRecipe field
    user.ewwdRecipes.set(recipeId, recipeId);

    // increment user ewwd vote 
    user.userEwwdVotes += 1;

    await user.save();

    req.user = user;
    return next();
  }
  catch (err) {
    return next({
      log: 'error with updating ewwd votes for user\'s recipe',
      message: { err: 'Unable to eww a recipe' },
    });
  };
};

userController.isLoggedIn = async (req, res, next) => {
  try {
    if (req.user) return next();
    // maybe redirect to /login or something?
    return res.sendStatus(401);
  } catch (err) {
      return next({
        log: 'error with user verification, check userController.isLoggedIn',
        message: { err: 'User not verified'}
      })
  }
}

userController.logout = async (req, res, next) => {
  console.log('in userController.logout');
  console.log('req.user before logout', req.user)
  try {
    req.logout((err) => {
      if (err) throw Error(err);
      // console.log('user is logged out!');
      // return next()
    })
    console.log('req.user after logout', req.user)
    return next();
  } catch (err) {
    return next({
      log: 'error with user logout, check userController.logout',
      message: { err: 'User did not log out' }
    })
  }
}

userController.getUserByGoogleId = async (req, res, next) => {
  console.log('in getUserByGoogleId')
  console.log('req.user in getUserByGoogleId', req.user);
  try {
    if (!req.user) res.redirect('/');
    const googleId = req.user.id;
    // query db for use whose googleId matches googleId
    const user = await User.findOne({ googleId });
    if (!user) throw new Error();
    console.log('found the user based on google id', user);
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: 'error with finding user by google id, check userController.getUserByGoogleId',
      message: { err: 'Could not find user by google id' }
    })
  }
}


module.exports = userController;