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
import RTable from './RTable';
import { DataGrid } from '@mui/x-data-grid';
import api from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function CloseoutsReport() {

  const columns = [
    { field: 'platform', headerName: 'Platform', width: 100 },
    { field: 'domain', headerName: 'Domain', width: 210 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'currPrice',
      headerName: 'Sniped price',
      type: 'number',
      width: 110,
    },
    {
      field: 'ourPrice',
      headerName: 'Our Price',
      type: 'number',
      width: 110,
    },
    {
      field: 'endTimeist',
      headerName: 'Auction Date',
      description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type:'date-time',
      width: 200,
      valueGetter: (params) =>
        {return params.row.endTimeist.substring(0,16)},
    }
  ];
  
      let fn=(row)=>{if(row.bidPlaced)
          return "Yes";
          else
          return "No";}
  
          const [psize, setPsize] = React.useState(10);
  
      const [rows, setRows] = React.useState([]);
 

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

    React.useEffect(()=>{api.getcompletedcloseouts().then((response)=>{setRows(response.data); console.log(response.data)}).catch((Error)=>console.log(Error))},[]);


  return (
   
    <Stack direction='column'  sx={{width:'100%'}} spacing={3}>
     <Box>
      <Stack direction='column' alignItems='flex-start' spacing={2.5}>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
            Closeouts' Report
        </Typography>
      <Box sx={{maxHeight: 400, width: 850}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rows}
        columns={columns}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[5,10,15,25,50]}
        disableSelectionOnClick
        //checkboxSelection
        //onSelectionModelChange={itm => console.log(itm)}
      /></Box>
      </Stack>
      </Box>
      </Stack>
    
  );
}
