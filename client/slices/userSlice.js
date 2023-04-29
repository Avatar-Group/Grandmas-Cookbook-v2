const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  loggedIn: false,
  _id: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  initialState,
  reducers: {
    // init user (mongo _id)
    initUser: (state, param) => {
      const { payload } = param;
      const tempState = state;
      return { ...tempState, ...payload };
    },
    // user logged in
    userLoggedIn: (state, param) => {
      const { payload } = param;
      const tempState = state;
      tempState.loggedIn = payload;
    },
    logoutUser: () => initialState,
    logoutUser: () => initialState,
    // created recipes
    createUserRecipe: (state, param) => {
      const { payload } = param;
      const newRecipe = {};
      newRecipe[payload._id] = payload._id;
      const tempState = state;
      tempState.postedRecipes = {
        ...state.postedRecipes,
        ...newRecipe,
      };
    },
    // yumm'd recipes
    addYumdRecipe: (state, param) => {
      const { payload } = param;
      const newRecipe = {};
      newRecipe[payload._id] = payload._id;
      const tempState = state;
      tempState.yumdRecipes = { ...state.yumdRecipes, ...newRecipe };
    },
    // eww'd recipes
    addEwwdRecipe: (state, param) => {
      const { payload } = param;
      const newRecipe = {};
      newRecipe[payload._id] = payload._id;
      const tempState = state;
      tempState.ewwdRecipes = { ...state.ewwdRecipes, ...newRecipe };
    },
    // unyymm'd recipes
    deleteYumdRecipe: (state, param) => {
      const { payload } = param;
      const tempState = state;
      delete tempState.yumdRecipes[payload._id];
    },
    // uneww'd recipes
    deleteEwwdRecipe: (state, param) => {
      const { payload } = param;
      const tempState = state;
      delete tempState.ewwdRecipes[payload._id];
    },
    deleteUserRecipe: (state, param) => {
      const { payload } = param;
      const tempState = state;
      delete tempState.recipes[payload._id];
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  initUser,
  userLoggedIn,
  logoutUser,
  createUserRecipe,
  addYumdRecipe,
  addEwwdRecipe,
  deleteYumdRecipe,
  deleteEwwdRecipe,
  deleteUserRecipe,
} = actions;

export default reducer;
