const { createSlice } = require('@reduxjs/toolkit');

const fakeUser = {
  _id: '6445e4fa41d2e2a932a66379',
  googleId: '101688260153426330032',
  email: 'mjway01@gmail.com',
  postedRecipes: {},
  yumdRecipes: {},
  ewwdRecipes: {},
  __v: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: fakeUser,
  },
  reducers: {
    // init user (mongo _id)
    initUser: (state, param) => {
      const { payload } = param;
      const tempState = state;
      tempState.user._id = { ...state.user._id, ...payload };
    },
    // created recipes
    createUserRecipe: (state, param) => {
      const { payload } = param;
      const newRecipe = {};
      newRecipe[payload._id] = payload;
      const tempState = state;
      tempState.user.postedRecipes = {
        ...state.user.postedRecipes,
        ...newRecipe,
      };
    },
    // yumm'd recipes
    addYumdRecipe: (state, param) => {
      const { payload } = param;
      const newRecipe = {};
      newRecipe[payload._id] = payload;
      const tempState = state;
      tempState.user.yumdRecipes = { ...state.user.yumdRecipes, ...newRecipe };
    },
    // eww'd recipes
    addEwwdRecipe: (state, param) => {
      const { payload } = param;
      const newRecipe = {};
      newRecipe[payload._id] = payload;
      const tempState = state;
      tempState.user.ewwdRecipes = { ...state.user.ewwdRecipes, ...newRecipe };
    },
    // unyymm'd recipes
    deleteYumdRecipe: (state, param) => {
      const { payload } = param;
      const tempState = state;
      delete tempState.user.yumdRecipes[payload._id];
    },
    // uneww'd recipes
    deleteEwwdRecipe: (state, param) => {
      const { payload } = param;
      const tempState = state;
      delete tempState.user.ewwdRecipes[payload._id];
    },
    deleteUserRecipe: (state, param) => {
      const { payload } = param;
      const tempState = state;
      delete tempState.user.recipes[payload._id];
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  initUser,
  createUserRecipe,
  addYumdRecipe,
  addEwwdRecipe,
  deleteYumdRecipe,
  deleteEwwdRecipe,
  deleteUserRecipe,
} = actions;
export default reducer;
