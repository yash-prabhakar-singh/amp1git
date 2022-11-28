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
import { Box, Button, Card, CardActionArea, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './ScheduledTable';
import RTable from './RTable';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Preferences() {

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
   
    <Stack direction='column'  sx={{width:'70vw'}} spacing={4}>
    <Box>
        <Typography  fontWeight='bold' color='text.primary' align='left'>Settings</Typography>
        <Box  marginTop={2} width='40vw'>
            <Stack spacing={1.5}>
            <Typography  fontWeight='bold' color='text.secondary' align='left'>Preferences :</Typography>
            <Card disableGutters sx={{backgroundColor:"", borderRadius:'16px', paddingLeft:1}}>
                <Stack spacing={1.5} paddingTop={1} paddingBottom={1}>
                 <Typography  fontWeight='bold' color='grey' align='left'>Display Preferences :</Typography>
                 <FormControl>
      <FormLabel  id="demo-row-radio-buttons-group-label" sx={{fontSize:'16',fontWeight:'bold', alignSelf:'flex-start'}}>Domains Per Page</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={50} control={<Radio />} label="50" />
        <FormControlLabel value={100} control={<Radio />} label="100" />
        <FormControlLabel value={250} control={<Radio />} label="250" />
        <FormControlLabel value={500} control={<Radio />} label="500" />
        
      </RadioGroup>
    </FormControl>
    <FormControl>
      <FormLabel  id="demo-row-radio-buttons-group-label" sx={{fontSize:'16',fontWeight:'bold', alignSelf:'flex-start'}}>Future Time Display</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={50} control={<Radio />} label="Exact Timestamp" />
        <FormControlLabel value={100} control={<Radio />} label="Relative Time" />
        
      </RadioGroup>
    </FormControl>
                </Stack>
            </Card>
            </Stack>
             </Box>
    </Box>
      </Stack>
   
    
  );
}
