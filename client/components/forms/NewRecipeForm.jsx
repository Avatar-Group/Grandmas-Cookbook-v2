import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createUserRecipe } from '../../slices/userSlice';
import { addCard } from '../../slices/cardSlice';

function NewRecipeForm() {
  // access the recipes array state 
  const { card } = useSelector((state) => state); 
  const latestRecipe = card.recipes[card.recipes.length - 1];
  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();
  // const userId = useSelector(state => state.user._id);

  const handleSubmit = async () => {
    const newRecipe = {
      // user id
      createdBy: user._id,
      title: document.getElementById('recipe-title').value,
      directions: document.getElementById('recipe-directions').value,
      ingredientList: document.getElementById('recipe-ingredients').value,
    };

    // console.log('here is the new recipe ------> ', newRecipe);
    try {
      const addRecipe = await fetch('/recipe/add', {
        method: 'POST',
        body: JSON.stringify(newRecipe),
        headers: {
          'Content-type': 'application/json',
        },
      })
        const recipe = await addRecipe.json();
        dispatch(addCard(recipe));

        const addToUser = await fetch(`/user/userRecipe/${recipe._id}`, { method: 'PUT' })
        dispatch(createUserRecipe(recipe))
    }
    catch(err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '70ch' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      noValidate
      autoComplete="off"
    >
      {/* <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center' }}> */}
      <TextField
        sx={{
          width: { sm: 300, md: 600 },
          md: 2,
          boxShadow: 7,
        }}
        id="recipe-title"
        label="Recipe Title"
        variant="outlined"
      />
      <TextField
        sx={{
          width: { sm: 300, md: 600 },
          md: 2,
          boxShadow: 7,
        }}
        id="recipe-ingredients"
        label="Recipe Ingredients"
        multiline
        rows={4}
        variant="outlined"
      />
      <TextField
        sx={{
          width: { sm: 300, md: 600 },
          md: 2,
          boxShadow: 7,
        }}
        id="recipe-directions"
        label="Recipe Directions"
        multiline
        rows={4}
        variant="outlined"
      />
      <Button
        sx={{
          boxShadow: 7,
          borderRadius: 5,
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {/* </div> */}
    </Box>
  );
}

export default NewRecipeForm;
