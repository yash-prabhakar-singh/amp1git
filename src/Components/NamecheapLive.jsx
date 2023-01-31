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

export default function NamecheapLive() {

    let [rows,setRows]= React.useState([]);
    let [psize,setPsize]= React.useState(10);
    //let [timer,setTimer]= React.useState();
 // useEffect(()=>{api.getLive().then((response)=>{setRows(response.data)}).catch((error)=>console.log(error))},[])
  /*setInterval(() => {console.log("live");
    api.getLive().then((response)=>{setRows(response.data)}).catch((error)=>console.log(error));
  }, 60000);
  useEffect(()=>{timer(1);},[])
 function timer(i)
 {
  setTimeout((i)=>{
  console.log(i);
  i++;},1000).then((i)=>{timer(i);})
 }
 function timer() {
 let timerr= setTimeout(function myTimer(){api.sample().then((res)=>{console.log(res); timerr= setTimeout(myTimer,10000)})},10000)
 }
 */
 useEffect(() => {
  api.getLivenc().then((res)=>{console.log(res.data); setRows(res.data);}).catch((err)=>console.log(err));
	let interval = setInterval(() => {
		api.getLivenc().then((res)=>{console.log(res.data); setRows(res.data);}).catch((err)=>console.log(err));
	}, 30000);
	return () => {
		clearInterval(interval);
	};
}, []);

 

 //clearTimeout(timerr);


  const columns = [
   // { field: 'platform', headerName: 'Platform', width: 110 },
    { field: 'name', headerName: 'Domain', width: 210 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
    {
      field: 'bidCount',
      headerName: 'Bids',
      type: 'number',
      width: 70,
    },
    {
      field: 'addtime',
      headerName: 'Add Time',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 90,
      valueGetter: (params) =>{return params.row.addtime.substring(11,16)}
    },
    {
      field: 'time_left',
      headerName: 'Time Left',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 120,
      
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
            Namecheap Live
        </Typography>
<Button variant="contained" sx={{ fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} onClick={()=>{api.startLivenc().then(res=>console.log(res.data)).catch((err)=>console.log(err.data));}}>Start Live</Button>
      <Box sx={{maxHeight: 400, width: 590}} >
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
  