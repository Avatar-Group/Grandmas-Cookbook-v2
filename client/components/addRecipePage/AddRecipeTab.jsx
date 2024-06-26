/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux'
import UrlAddForm from '../forms/urlAddForm.jsx';
import { clearKeywordResult } from '../../slices/modalSlice.js';
import APIAddForm from '../forms/ApiAddForm.jsx';
import NewRecipeForm from '../forms/NewRecipeForm.jsx';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AddRecipeTab({ setOpenAddRecipe }) {
  const [value, setValue] = React.useState(0);
  const { recipesTabToggle, setRecipesTabToggle} = React.useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(clearKeywordResult())
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Food Network or Epicurious" />
          <Tab label="Keyword Search" />
          <Tab label ="Create Recipe" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UrlAddForm setOpenAddRecipe={setOpenAddRecipe} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <APIAddForm setOpenAddRecipe={setOpenAddRecipe} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NewRecipeForm setOpenAddRecipe={setOpenAddRecipe} />
      </TabPanel>
    </Box>
  );
}
