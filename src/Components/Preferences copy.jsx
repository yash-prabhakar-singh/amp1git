import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import { Grid } from '@material-ui/core';
//import AuthService from '../AuthService';
//import apiservice from '../apiservice';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Box, Button, Card, CardActionArea, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './DTable';
import RTable from './RTable';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Sample() {

  let [rows,setRows]= React.useState([]);

 

  const theme = createTheme({
  
    typography: {
      fontFamily: [
        'Nunito',
        'Train One',
        'Roboto',
        
        
        'sans-serif',
        'cursive'
      ].join(",")
    
    }
    }
    );

    

  return (
    <ThemeProvider theme={theme}><Box sx={{backgroundColor:'white', height:'100vh'}}>
      <CssBaseline/>
    <Stack direction='row' paddingTop={7} justifyContent='center' spacing={2} sx={{}}>
<Sidebar/>
    <Stack direction='column' paddingTop={2} sx={{width:'60vw'}} spacing={4}>
    
      </Stack>
    </Stack>
    </Box>
    </ThemeProvider>
    
  );
}
