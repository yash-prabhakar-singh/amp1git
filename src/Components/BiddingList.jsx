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
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import BiddingListM from '../MobileComponent/BiddingListM';
import useMediaQuery from '@mui/material/useMediaQuery';

//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function BiddingList() {

  let [rows,setRows]= React.useState([]);

  const isMobile = useMediaQuery('(max-width:600px)');

 

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
    const responsivePaper = {
      border: "1px solid gray",
      margin: 1,
      flex: { xs: "100%", sm: "calc(50% - 20px)", md: "calc(33% - 20px)" }
    
    };

    const Mobile=()=>{return(
      <BiddingListM />
    )}

    if(isMobile)
    return(<Mobile/>);
  
    

    

  return (
    
    <Stack direction='column'  sx={{responsivePaper}} spacing={3}>
    <ScheduledTable/>
    <PlacedTable />
      </Stack>
   
    
  );
}
