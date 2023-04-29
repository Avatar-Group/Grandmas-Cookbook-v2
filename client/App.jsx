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
      main: '#8B4513',
    },
    secondary: {
      main: '#FFEBCD',
    },
    ternary: {
      main: '#FFFFE0',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          'background': '#FFEBCD',
        }
      }
    }}
});

function App() {
  return (
    <div className='custom-cursor'>
      
      <ThemeProvider theme={theme} >
        <NavBar className='navBar'/>
        
        <CardGrid />
      </ThemeProvider>
    </div>
  );
}

export default App;
