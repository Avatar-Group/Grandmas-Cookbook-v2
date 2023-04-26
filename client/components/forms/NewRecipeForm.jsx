import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createUserRecipe } from '../../slices/userSlice';
import { addCard } from '../../slices/cardSlice';

function NewRecipeForm() {
  const dispatch = useDispatch();
  // const userId = useSelector(state => state.user._id);

  const handleSubmit = () => {
    const newRecipe = {
      createdBy: '6445e4fa41d2e2a932a66379',
      title: document.getElementById('recipe-title').value,
      directions: document.getElementById('recipe-directions').value,
      ingredientList: document.getElementById('recipe-ingredients').value,
    };

    // console.log('here is the new recipe ------> ', newRecipe);

    fetch('/recipe/add', {
      method: 'POST',
      body: JSON.stringify(newRecipe),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.status);
      })
      .then((data) => {
        dispatch(addCard(data));
      })
      .catch(() => {
        console.error('Error in post request for user recipe');
    });

    fetch('/users/userRecipe/:id', {
      method: 'POST',
      body: JSON.stringify(newRecipe),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.status);
      })
      .then((data) => {
        dispatch(createUserRecipe(data));
      })
      .catch(() => {
        console.error('Error in post request for user recipe');
      });
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '70ch' },
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
            width: {sm: 300, md: 600},
            md: 2,
            boxShadow: 7
          }}
          id="recipe-title"
          label="Recipe Title"
          variant="outlined"
        />
        <TextField
          sx={{
            width: {sm: 300, md: 600},
            md: 2,
            boxShadow: 7
          }}
          id="recipe-ingredients"
          label="Recipe Ingredients"
          multiline
          rows={4}
          variant="outlined"
        />
        <TextField
          sx={{
            width: {sm: 300, md: 600},
            md: 2,
            boxShadow: 7
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
            borderRadius: 5
          }}
          onClick={handleSubmit}
          >Submit</Button>
      {/* </div> */}
    </Box>
  );
}

export default NewRecipeForm;
