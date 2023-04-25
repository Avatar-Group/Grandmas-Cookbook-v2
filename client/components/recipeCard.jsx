import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Stack } from '@mui/material';
import MoreButton from './recipeCardButtons/MoreButton.jsx';
import { deleteCard, updateCard } from '../slices/cardSlice';
import {
  addYumdRecipe,
  addEwwdRecipe,
  deleteUserRecipe,
} from '../slices/userSlice';

function RecipeCard({ recipe, children, type, addHandler }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const setDeleteButtonLogic = () => {
    fetch(`/recipe/delete/${recipe._id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          dispatch(deleteCard(recipe));
          dispatch(deleteUserRecipe(recipe));
          return;
        }
        throw new Error(res.status);
      })
      .catch((err) => console.log(`Error code: ${err}`));
  };

  const voteRecipe = (voteType) => {
    fetch(`/recipe/${voteType}Recipe/${recipe._id}`, {
      method: 'PATCH',
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.status);
      })
      .then((data) => {
        dispatch(updateCard(data));
        if (voteType === 'yum') dispatch(addYumdRecipe(recipe));
        else dispatch(addEwwdRecipe(recipe));
      })
      .catch((err) => console.log(`Error code: ${err}`));
  };

  return (
    <Card
      sx={{
        minWidth: 400,
        border: 'none',
        background: '#DDBEA9',
      }}
    >
      <CardMedia
        component="img"
        alt="recipe image"
        sx={{ width: '258px', height: '256px', alignItems: 'flex-end' }}
        // height="140"
        image={recipe.imagePath}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Yum!">
            <Button
              disabled={
                Object.hasOwn(user.yumdRecipes, recipe._id) ||
                Object.hasOwn(user.ewwdRecipes, recipe._id)
              }
              variant="contained"
              size="small"
              onClick={() => voteRecipe('yum')}
              sx={{ minWidth: '25px' }}
            >
              <InsertEmoticonIcon sx={{ marginRight: '.5rem' }} />
              <Typography>{recipe.yumdVote}</Typography>
            </Button>
          </Tooltip>
          <Tooltip title="Eww!">
            <Button
              disabled={
                Object.hasOwn(user.ewwdRecipes, recipe._id) ||
                Object.hasOwn(user.yumdRecipes, recipe._id)
              }
              variant="contained"
              size="small"
              onClick={() => voteRecipe('eww')}
              sx={{ minWidth: '25px' }}
            >
              <SentimentVeryDissatisfiedIcon sx={{ marginRight: '.5rem' }} />
              <Typography>{recipe.ewwdVote}</Typography>
            </Button>
          </Tooltip>
          <MoreButton recipe={recipe} />
          {user.postedRecipes[recipe._id] && (
            <Tooltip title="Delete Recipe">
              <Button
                variant="contained"
                size="small"
                onClick={setDeleteButtonLogic}
                sx={{ minWidth: '25px' }}
              >
                <DeleteForeverIcon sx={{ color: 'red' }} />
              </Button>
            </Tooltip>
          )}
        </Stack>
      </CardActions>
      {children}
    </Card>
  );
}

export default RecipeCard;
