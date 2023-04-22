import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreButton from './recipeCardButtons/MoreButton.jsx';
import { deleteCard } from '../slices/cardSlice';

function RecipeCard({ recipe, children, type, addHandler }) {
  const dispatch = useDispatch();

  const [deleteButton, setDeleteButton] = React.useState(true);
  const setDeleteButtonLogic = () => {
    setDeleteButton((prev) => !prev);
    // MAYBE ADD USER ID TO THIS FETCH
    fetch(`/recipe/delete/${recipe._id}`, {
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
          <Tooltip title="Yum!">
            <Button variant="contained" size="small">
              <InsertEmoticonIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Eww!">
            <Button variant="contained" size="small">
              <SentimentVeryDissatisfiedIcon />
            </Button>
          </Tooltip>
          <MoreButton recipe={recipe} />
          {/* Add logic to only show delete for user's own recipes */}
          <Tooltip title="Delete Recipe">
            <Button
              variant="contained"
              size="small"
              onClick={setDeleteButtonLogic}
            >
              <DeleteForeverIcon color="Red" />
            </Button>
          </Tooltip>
        </CardActions>
        {children}
      </Card>
    );
}

export default RecipeCard;
