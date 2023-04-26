const router = require('express').Router();
const userController = require('../controller/userController');
const baseurl = require('../server');

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

router.get('/logout', userController.logout, (req, res) => {
  console.log('end of user/logout route');
  res.status(200).redirect(baseurl);
});

module.exports = router;

// get all of user's recipe
// router.get('/postedRecipes/:id', userController.getAllUsersRecipes, (req, res) => {
//   console.log('end of get user\'s recipe');
//   res.status(200).json(res.locals.postedRecipes);
// });

// // get user's one recipe
// router.get('/userRecipe/:id', userController.getUserOneRecipe, (req, res) => {
//   console.log('end of get user\'s one recipe');
//   res.status(200).json(res.locals.recipe);
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
