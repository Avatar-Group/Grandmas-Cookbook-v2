const { createSlice } = require('@reduxjs/toolkit');

const cardSlice = createSlice({
  name: 'card',

  initialState: {
    recipes: [],
  },

    reducers: {
        init: (state, param) => {
            const { payload } = param;
            const tempState = state;
            tempState.recipes = [...state.recipes, ...payload];
        },
        // add card reducer function accepts two parameters, initial sate and the incoming input
        // Operating in components/forms/ApiAddForm file
        addCard: (state, param) => {
            // destructure param as the change and assign it to variable payload
            const { payload } = param;
            // We're not suppose to direction change state, however, we can manipulate a copy of state. So we declare a new instance of state and assign it to current state.
            const tempState = state;
            // fetch('/recipe/add', 
            //     {method: 'POST', 
            //     body: JSON.stringify(payload),
            //     headers: {
            //         'Content-type': 'application/json',
            //     }})
            //     .then(res => res.json())
            //     .then(data => console.log(data));
            // Finally, we update the components of the copied state, with the new information (payload) that we can to add/change. 
            // For this example, we're taking all exisitings in the recipes array, and adding the payload to the end of array
            tempState.recipes = [...state.recipes, payload]
        },
        // coming fromrecipeCardButton folder & MoreButton file
        // accepts 2 parameters, state(tempState) and param (payload)
        updateCard: (state, param) => {
            const { payload } = param;
            const tempState = state;
            // Within the recipe key of tempState, we will map through the recipe array (all of the recipes on the stream)
            // if the recipe id at the current index matches the passed in payload, return the payload, then return recipe, which will update the recipe in state
            tempState.recipes = tempState.recipes.map((recipe) => {
                if (recipe.id === payload.id) return payload;
                return recipe;
            })
        },
        deleteCard: (state, param) => {
            const { payload } = param;
            const tempState = state;
            tempState.recipes = tempState.recipes.filter((recipe) => recipe.id !== payload.id)
        }
    }
})

const { actions, reducer } = cardSlice;
export const { init, addCard, updateCard, deleteCard } = actions;
export default reducer