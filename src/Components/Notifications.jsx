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
import { Box, Button, Card, CardActionArea, CssBaseline, Divider, FormControl, FormControlLabel, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './ScheduledTable';
import RTable from './RTable';
import { useEffect } from 'react';
import api from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Notifications() {

  let [rows,setRows]= React.useState([]);

 useEffect(()=>{api.getnotifs().then((response)=>{setRows(response.data)}).catch(err=>console.log(err))},[]);
 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
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
   
    <Stack direction='column' alignItems='flex-start' sx={{width:'100%'}} spacing={2.5}>
    <Typography  fontWeight='bold' color='primary.main' align='left'>Notifications</Typography>
    <Box>
      
      <List sx={{
        width: '100%',
        //maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        '& ul': { padding: 0 },
      }} disablePadding>
        { rows.map((row)=>(
          <React.Fragment>
        <ListItem disableGutters>
          <ListItemText secondary={row.message}/>
           
          
        </ListItem>
        <Divider  component="li" />
        </React.Fragment>
))}
        </List>
        
    </Box>
      </Stack>
    
  );
}
