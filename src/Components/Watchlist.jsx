//import { createTheme } from "@mui/material";
import Sidebar from './Sidebar';
import { Box, Button, Card, CardActionArea, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import * as React from 'react';
import { useEffect } from 'react';
import api from './api';
import { DataGrid } from '@mui/x-data-grid';

export default function WatchList() {

    let [rows,setRows]= React.useState([]);
    let [psize,setPsize]= React.useState(10);
  useEffect(()=>{api.getwatchlist().then((response)=>{setRows(response.data)}).catch((error)=>console.log(error))},[])
  const columns = [
    { field: 'platform', headerName: 'Platform', width: 100 },
    { field: 'domain', headerName: 'Domain', width: 210 },
    { field: 'auctiontype', headerName: 'Auction Type', width: 110 },
    {
      field: 'currbid',
      headerName: 'Current Bid',
      type: 'number',
      width: 110,
    },
    {
      field: 'bidders',
      headerName: 'Bidders',
      type: 'number',
      width: 110,
    },
    {
      field: 'time_left',
      headerName: 'Time Left',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 110,
      
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 60,
      //valueGetter: ()=>{return '4 mins'}
    },
    {
      field: 'estibot',
      headerName: 'Estibot',
      type: 'number',
      width: 110,
      //valueGetter: ()=>{return '4 mins'}
    },
   
  ];
  
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
      <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Watchlist
        </Typography>

      <Box sx={{maxHeight: 400, width: 925}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rows}
        columns={columns}
        pageSize={psize}
        initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
        onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
        rowsPerPageOptions={[5,10,15,25,50]}
        disableSelectionOnClick
       
      /></Box>
        </Stack>
     
      
    );
  }
  