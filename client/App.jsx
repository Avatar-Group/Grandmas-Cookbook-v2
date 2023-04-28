import React, { useState } from 'react';
import { Typography, AppBar, Container, Toolbar, MuiPaper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardGrid from './containers/cardGrid.jsx';
import NavBar from './components/appBar/AppBar.jsx'

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
    <div>
      <ThemeProvider theme={theme}>
        <header>
          <NavBar />
          {/* <Typography align="center" variant="h1" color="primary">
            Grandma's Cookbook
          </Typography> */}
          <div className="actionHeader">
            <Typography variant="h2" align="center" color="primary">
              Recipes
            </Typography>
          </div>
        </header>
        <CardGrid />
      </ThemeProvider>
      <div className='testing-section'>
        <h1>START TEST SECTION</h1>
    
      </div>
    </div>
    
  );
}

export default App;
