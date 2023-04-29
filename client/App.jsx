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
import NavBar from './components/appBar/AppBar.jsx';
import NewRecipeForm from './components/forms/NewRecipeForm.jsx';
// import './index.css';


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
    <div className='custom-cursor'>
      
      <ThemeProvider theme={theme} className='theme'>
        <NavBar className='navBar'/>
          <div className="actionHeader">
            <Typography align="center" variant="h1" color="primary">
              Grandma's Cookbook
            </Typography>
            <Typography variant="h2" align="center" color="primary">
              Recipes
            </Typography>
          </div>
        
        <CardGrid />
      </ThemeProvider>
    </div>
  );
}

export default App;
