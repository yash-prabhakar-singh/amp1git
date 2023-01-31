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
import { DataGrid } from '@mui/x-data-grid';
import api from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function CloseoutList() {

  
  const [psize,setPsize]=React.useState(5);
  const [rows, setRows] = React.useState([]);
  //const [cbid, setCbid] = React.useState([]);

React.useEffect(()=>{api.getscheduledcloseouts().then((response)=>{setRows(response.data);}).catch((Error)=>console.log(Error))},[]);

const columns = [
{ field: 'platform', headerName: 'Platform', width: 100 },
{ field: 'domain', headerName: 'Domain', width: 210 },
{ field: 'auctype', headerName: 'Auction Type', width: 120 },
{
  field: 'ourPrice',
  headerName: 'Our Price',
  type: 'number',
  width: 110,
},
{
  field: 'currPrice',
  headerName: 'Current Price',
  type: 'number',
  width: 110,
},
{
  field: 'timeLeft',
  headerName: 'Time Left',
  //description: 'This column has a value getter and is not sortable.',
  //sortable: false,
  type: 'date-time',
  width: 110,
  //valueGetter: (params) =>{return params.row.endTimeist.substring(0,16)},
}

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
    
    <Stack direction='column'  sx={{width:'100%'}} spacing={3}>
    <Stack direction='column' alignItems='flex-start' spacing={2.5}>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Scheduled Closeouts
        </Typography>

    {/*<TableContainer component={Paper}>
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{fontWeight: 'bold'}}>
            <TableRow sx={{fontWeight: 'bold'}}>
              <TableCell sx={{fontWeight: 'bold'}}>Platform</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Domain</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Auction Type</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Our Max Bid</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Current Bid</TableCell>
              
              <TableCell sx={{fontWeight: 'bold'}} align="right">Auction End Time (IST)</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Bid Buffer</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => (
              <TableRow
                key={row.domain}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               
                <TableCell align="left">{row.platform}</TableCell>
                <TableCell align="right">{row.domain}</TableCell>
                <TableCell align="right">{row.auctiontype}</TableCell>
                <TableCell align="right">{row.bidAmount}</TableCell>
                <TableCell align="right">{row.currbid}</TableCell>
                <TableCell align="right">{row.endTimeist.substring(0,16)}</TableCell>
                <TableCell align="right">4 mins</TableCell>
               // <TableCell align="right">{fn(row)}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </TableContainer>*/}
            <Box sx={{maxHeight: 500, width:800}} >
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
      </Stack>
   
    
  );
}
