import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  Container,
  Toolbar,
  MuiPaper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardGrid from './containers/cardGrid.jsx';
import NewRecipeForm from './components/forms/NewRecipeForm.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFE8D6',
    },
    secondary: {
      main: '#DDBEA9',
    },
    ternary: {
      main: '#CB997E',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#DDBEA9',
        },
      },
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <header>
          <Typography align="center" variant="h1" color="primary">
            {"Grandma's Cookbook"}
          </Typography>
          <div className="actionHeader">
            <Typography variant="h2" align="center" color="primary">
              Recipes
            </Typography>
          </div>
        </header>
        <CardGrid />
      </ThemeProvider>
      <div className="testing-section">
        <h1>START TEST SECTION</h1>
        <h3>HELLOOOO</h3>
        <NewRecipeForm />
      </div>
    </div>
  );
}

export default App;
