import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoreButton from './recipeCardButtons/MoreButton.jsx';
import { deleteCard } from '../slices/cardSlice';

function RecipeCard({ recipe, children, type, addHandler }) {
  const dispatch = useDispatch();

  const [deleteButton, setDeleteButton] = React.useState(true);
  const setDeleteButtonLogic = () => {
    setDeleteButton((prev) => !prev);
    fetch(`/recipe/delete/${recipe.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) return dispatch(deleteCard(recipe));
        throw new Error(res.status);
      })
      .catch((err) => console.log(`Error code: ${err}`));
  };

  if (deleteButton)
    return (
      <Card
        sx={{ maxWidth: 600 }}
        style={{ border: 'none', background: '#DDBEA9' }}
      >
        <CardMedia
          component="img"
          alt="recipe image"
          sx={{ width: '258px', height: '256px', alignItems: 'flex-end' }}
          // height="140"
          image={recipe.imagePath}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.title}
          </Typography>
        </CardContent>
        <CardActions>
          {type === 'addForm' ? (
            <Button color="success" onClick={addHandler(recipe)}>
              Add
            </Button>
          ) : null}
          <MoreButton recipe={recipe} />
          {/* Add logic to only show delete for user's own recipes */}
          <Button color="error" size="small" onClick={setDeleteButtonLogic}>
            Delete
          </Button>
        </CardActions>
        {children}
      </Card>
    );
}

export default RecipeCard;
