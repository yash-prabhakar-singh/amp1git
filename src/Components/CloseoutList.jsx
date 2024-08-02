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
import api, { getscheduledcloseouts } from './api';
import { useMemo , useEffect, useRef } from 'react';
import { MaterialReactTable,useMaterialReactTable } from 'material-react-table';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



// export default function CloseoutList() {

  
//   const [psize,setPsize]=React.useState(50);
//   const [rows, setRows] = React.useState([]);
//   //const [cbid, setCbid] = React.useState([]);

// React.useEffect(()=>{getscheduledcloseouts().then((response)=>{setRows(response.data);}).catch((Error)=>console.log(Error))},[]);

// const columns = [
// { field: 'platform', headerName: 'Platform', width: 100 },
// { field: 'domain', headerName: 'Domain', width: 210 },
// { field: 'auctype', headerName: 'Auction Type', width: 120 },
// {
//   field: 'ourPrice',
//   headerName: 'Our Price',
//   type: 'number',
//   width: 110,
// },
// {
//   field: 'currPrice',
//   headerName: 'Current Price',
//   type: 'number',
//   width: 110,
// },
// {
//   field: 'timeLeft',
//   headerName: 'Time Left',
//   //description: 'This column has a value getter and is not sortable.',
//   //sortable: false,
//   type: 'date-time',
//   width: 110,
//   //valueGetter: (params) =>{return params.row.endTimeist.substring(0,16)},
// }

// ];
 

//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#000',
//       },
//       secondary: {
//         main: '#edf2ff',
//       },
//     },
//     typography: {
//       fontFamily: [
//         'Nunito',
//         'Train One',
//         'Roboto',
        
        
//         'sans-serif',
//         'cursive'
//       ].join(",")
    
//     }
//     }
//     );

    

//   return (
//     <Stack direction='row' justifyContent='center'  sx={{width:'100%'}}>

//     <Stack direction='column'  spacing={3}>
//     <Stack direction='column' alignItems='flex-start' spacing={2.5}>
//         <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
//             Scheduled Closeouts
//         </Typography>

//             <Box sx={{width:765}} >
//       <DataGrid autoHeight sx={{ width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         onPageSizeChange={(p)=>{setPsize(p)}}
//         rowsPerPageOptions={[10,25,50,100,500]}
//         disableSelectionOnClick
//         initialState={{
//           sorting: 
//           {
//             sortModel: [{ field: 'endTimeist', sort: 'asc' }],
//           },
//         }}
//         //checkboxSelection
//         //onSelectionModelChange={itm => console.log(itm)}
//       /></Box>
    
//             </Stack>
//       </Stack>
//    </Stack>
    
//   );
// }


export default function CloseoutList() {
  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getscheduledcloseouts()
      .then((response) => {
        setRows(response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'auctype', header: 'Auction Type', size: 120 },
    { accessorKey: 'ourPrice', header: 'Our Price', size: 110, type: 'number' },
    { accessorKey: 'currPrice', header: 'Current Price', size: 110, type: 'number' },
    { accessorKey: 'timeLeft', header: 'Time Left', size: 110, type: 'date-time' },
  ], []);

  const table = useMaterialReactTable({
    columns: columns,
    data: rows,
    initialState: {
      pagination: { pageSize: psize },
      sorting: [{ id: 'endTimeist', desc: true }],
    },
  });

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
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' justifyContent='center' sx={{ width: '100%' }}>
        <Stack direction='column' spacing={3}>
          <Stack direction='column' alignItems='flex-start' spacing={2.5}>
            <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
              Scheduled Closeouts
            </Typography>
            <Box sx={{ width: 1000 }}>
              <MaterialReactTable
                table={table}
                muiTablePaperProps={{
                  sx: { width: '100%' },
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}