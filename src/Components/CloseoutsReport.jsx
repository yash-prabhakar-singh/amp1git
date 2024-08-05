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
import { useState,useEffect, useMemo } from 'react';
import DTable from './ScheduledTable';
import RTable from './RTable';
import { DataGrid } from '@mui/x-data-grid';
import { MaterialReactTable , useMaterialReactTable} from 'material-react-table';
import api, { getcompletedcloseouts } from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



// export default function CloseoutsReport() {

//   const columns = [
//     { field: 'platform', headerName: 'Platform', width: 100 },
//     { field: 'domain', headerName: 'Domain', width: 210 },
//     { field: 'status', headerName: 'Status', width: 100 },
//     {
//       field: 'currPrice',
//       headerName: 'Sniped price',
//       type: 'number',
//       width: 110,
//     },
//     {
//       field: 'ourPrice',
//       headerName: 'Our Price',
//       type: 'number',
//       width: 110,
//     },
//     {
//       field: 'endTimeist',
//       headerName: 'Auction Date',
//       description: 'This column has a value getter and is not sortable.',
//       //sortable: false,
//       type:'date-time',
//       width: 200,
//       valueGetter: (params) =>
//         {return params.row.endTimeist.substring(0,16)},
//     }
//   ];
  
//       let fn=(row)=>{if(row.bidPlaced)
//           return "Yes";
//           else
//           return "No";}
  
//           const [psize, setPsize] = React.useState(50);
  
      
 

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

//     React.useEffect(()=>{getcompletedcloseouts().then((response)=>{setRows(response.data); console.log(response.data)}).catch((Error)=>console.log(Error))},[]);


//   return (
   
//     <Stack direction='column' alignItems='center' sx={{width:'100%'}} spacing={3}>
//      <Box>
//       <Stack direction='column' alignItems='flex-start' spacing={2.5}>
//         <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
//             Closeouts' Report
//         </Typography>
//       <Box sx={{width: 850}} >
//       <DataGrid autoHeight sx={{ width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         onPageSizeChange={(p)=>{setPsize(p)}}
//         rowsPerPageOptions={[10,25,50,100,500]}
//         initialState={{
//           sorting: {
//             sortModel: [{ field: 'endTimeist', sort: 'desc' }],
//           },
//         }}
//         disableSelectionOnClick
//         //checkboxSelection
//         //onSelectionModelChange={itm => console.log(itm)}
//       /></Box>
//       </Stack>
//       </Box>
//       </Stack>
    
//   );
// }


export default function CloseoutsReport() {
  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'status', header: 'Status', size: 100 },
    {
      accessorKey: 'currPrice',
      header: 'Sniped price',
      size: 110,
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: 'ourPrice',
      header: 'Our Price',
      size: 110,
      Cell: ({ cell }) => cell.getValue(), 
    },
    {
      accessorKey: 'endTimeist',
      header: 'Auction Date',
      size: 200,
      type: 'date-time',
      Cell: ({ cell }) => cell.getValue().substring(0, 16),
    },
  ], []);

  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);

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

  useEffect(() => {
    
    getcompletedcloseouts()
      .then((response) => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);



  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const table = useMaterialReactTable({
    columns:columns,
    data: rows,
    initialState: {
      pagination: { pageSize: psize },
      sorting: [{ id: 'endTimeist', desc: true }],
    },
  
    muiTablePaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100, 500],
      onPageSizeChange: (newPageSize) => setPsize(newPageSize),
    },    
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='column' alignItems='center' sx={{ width: '100%' }} spacing={3}>
        <Box>
          <Stack direction='column' alignItems='flex-start' spacing={2.5}>
            <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
              Closeouts' Report
            </Typography>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ minWidth: 910 }}>
              <MaterialReactTable table={table}  />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}

