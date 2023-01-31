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
import useMediaQuery from '@mui/material/useMediaQuery';
import WatchlistM from '../MobileComponent/WatchlistM';

export default function WatchList() {
  const responsivePaper = {
    border: "1px solid gray",
    margin: 1,
    flex: { xs: "100%", sm: "calc(50% - 20px)", md: "calc(33% - 20px)" }
  
  };

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

      const Mobile=()=>{return(
        <WatchlistM />
      )}
  
      if(isMobile)
      return(<Mobile/>);
  
  
    return (
    
      <Stack direction='column' alignItems='flex-start' sx={{width:'100%'}} spacing={2.5}>
      <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Watchlist
        </Typography>
      <Box sx={{display: 'flex', width: '100%', flexWrap: 'wrap'}} >
      <DataGrid autoHeight sx={ responsivePaper}
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
  