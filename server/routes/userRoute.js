const router = require('express').Router();
const userController = require('../controller/userController');


// get user's one recipe
router.get('/userRecipe/:id', userController.getUserOneRecipe, (req, res) => {
  console.log("end of get user's one recipe");
  res.status(200).json(res.locals.recipe);
});

// create recipe in user's posted recipe list
router.put('/userRecipe/:recipeId', (req, res, next) => {
  console.log(`testing IN BE`);
  return next()
},userController.updateUserPostedRecipes, (req, res) => {
  console.log("end of route for add recipe to user\'s recipe list");
  res.status(200).json(req.user);
});

// update user's yumdRecipe recipe
router.put(
  '/yumRecipe/:recipeId',
  userController.updateUserYumdVotes,
  (req, res) => {
    console.log("end of update user's yumd recipe");
    res.status(200).json(req.user);
  }
);

// update user's ewwddRecipe recipe
router.put(
  '/ewwRecipe/:recipeId',
  userController.updateUserEwwdVotes,
  (req, res) => {
    console.log("end of update user's ewwd recipe");
    res.status(200).json(req.user);
  }
);

// delete user's postedRecipe recipe
router.delete(
  '/postedRecipe/:recipeId',
  userController.deleteUserPostedRecipe,
  (req, res) => {
    console.log("end of delete user's posted recipe");
    res.status(200).json(req.user);
  }
);

// delete user's yumdRecipe recipe
router.delete(
  '/yumRecipe/:recipeId',
  userController.deleteUserYumdRecipe,
  (req, res) => {
    console.log("end of delete user's yumd recipe");
    res.status(200).json(req.user);
  }
);

// delete user's ewwddRecipe recipe
router.delete(
  '/ewwRecipe/:recipeId',
  userController.deleteUserEwwdRecipe,
  (req, res) => {
    console.log("end of delete user's ewwd recipe");
    res.status(200).json(req.user);
  }
);

// delete user logged in status
router.delete('/logoutUser', userController.logout, (req, res) => {
  console.log('end of user/logout route');
  res.status(200).json({ message: 'logged out' });
});

// set user googleId into state
router.get(
  '/getUserByGoogleId',
  userController.getUserByGoogleId,
  (req, res) => {
    console.log('end of /getUserByGoogleId route');
    res.status(200).json(res.locals.user);
  }
);


module.exports = router;

// get all of user's recipe
// router.get('/postedRecipes/:id', userController.getAllUsersRecipes, (req, res) => {
//   console.log('end of get user\'s recipe');
//   res.status(200).json(res.locals.postedRecipes);
// });

// // get all user's yum'd recipes
// router.get('/userRecipe/:id', userController.getAllYumdRecipes, (req, res) => {
//   console.log('end of get user\'s yummd recipes');
//   res.status(200).json(res.locals.allYumdRecipes);
// });

// // get all user's eww'd recipes
// router.get('/userRecipe/:id', userController.getAllEwwdRecipes, (req, res) => {
//   console.log('end of get user\'s ewwd recipes');
//   res.status(200).json(res.locals.allEwwdRecipes);
// });
