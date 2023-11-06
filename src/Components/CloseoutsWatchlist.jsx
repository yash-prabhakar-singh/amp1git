//import { createTheme } from "@mui/material";
import Sidebar from './Sidebar';
import { Box, Button, Card, CardActionArea, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import * as React from 'react';
import { useEffect } from 'react';
import { getwatchlistCloseout, removeCloseoutWatchlist } from './api';
import { DataGrid } from '@mui/x-data-grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Delete } from '@mui/icons-material';


export default function Watchlistcloseouts() {

  let[idds, setIdds]= React.useState([]);
    let [rows,setRows]= React.useState([]);
    let [psize,setPsize]= React.useState(50);
  useEffect(()=>{getwatchlistCloseout().then((response)=>{setRows(response.data);console.log(response.data)}).catch((error)=>console.log(error))},[])
  const columns = [
    { field: 'domain', headerName: 'Domain', width: 210 },
    {
      field: 'timeLeft',
      headerName: 'Time Left',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 110,
      
    },
    {
      field: 'currPrice',
      headerName: 'Current Price',
      type: 'number',
      width: 110,
    },
    
   
    {
      field: 'gdv',
      headerName: 'GDV',
      type: 'number',
      width: 110,
    },
    { field: 'auctype', headerName: 'Auction Type', width: 150 },
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
    
      <Stack direction='row' justifyContent='center' sx={{width:'100%'}}>
      <Stack direction='column' alignItems='flex-start'  spacing={2.5}>
        <Stack direction='row' spacing={1}>
      <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            CloseOuts' Watchlist
        </Typography>
        {(idds.length!=0)&&<IconButton size='small' color='primary' sx={{ padding:0}} onClick={()=>{removeCloseoutWatchlist(idds)}}><Delete fontSize='small'/></IconButton>}
        </Stack>
      <Box sx={{width: 742}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rows}
        columns={columns}
        pageSize={psize}
        initialState={{
          sorting: {
            sortModel: [{ field: 'endTimeist', sort: 'asc' }],
          },
        }}
        onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
          BaseCheckbox: CheckboxWrapper
        }}
        checkboxSelection
        onSelectionModelChange={(itm) => {console.log(idds); itm= setIdds(itm); }}

      /></Box>
        </Stack>
        </Stack>
      
    );
  }
  
  function CheckboxWrapper(props) {
    return (
      <Checkbox
        icon={<StarBorderIcon />}
        checkedIcon={<StarIcon />}
        {...props}
      />
    )
  }