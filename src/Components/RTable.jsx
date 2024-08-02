import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import  { getcompletedauctions } from './api';
import { useState, useEffect, useMemo } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';



// function RTable() {

// const columns = [
//   { field: 'platform', headerName: 'Platform', width: 100 },
//   { field: 'domain', headerName: 'Domain', width: 210 },
//   { field: 'result', headerName: 'Status', width: 100 },
//   { field: 'auctiontype', headerName: 'Auction Type', width: 120 },
//   {
//     field: 'currbid',
//     headerName: 'High Bid',
//     type: 'number',
//     width: 110,
//   },
//   {
//     field: 'bidAmount',
//     headerName: 'Our Max Bid',
//     type: 'number',
//     width: 110,
//   },
//   {
//     field: 'endTimeist',
//     headerName: 'Auction Date',
//     description: 'This column has a value getter and is not sortable.',
//     //sortable: false,
//     type:'date-time',
//     width: 150,
//     valueGetter: (params) =>
//       {return params.row.endTimeist.substring(0,16)},
//   }
// ];

//     let fn=(row)=>{if(row.bidPlaced)
//         return "Yes";
//         else
//         return "No";}

//         const [psize, setPsize] = React.useState(50);

//     const [rows, setRows] = React.useState([]);
//     const [cbid, setCbid] = React.useState("");
// React.useEffect(()=>{getcompletedauctions().then((response)=>{setRows(response.data)}).catch((Error)=>console.log(Error))},[]);
//   //const handleChange = (event) => {
//     //setValue(event.target.value);
//  // };
//     return (
    
//     <Box>
//       <Stack direction='row' justifyContent='center' width='100%'>
//       <Stack direction='column' alignItems='flex-start' spacing={2.5}>
//         <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
//             Auctions' Report
//         </Typography>

  
//       <Box sx={{width:910}} >
//       <DataGrid autoHeight sx={{ width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         onPageSizeChange={(p)=>{setPsize(p)}}
//         rowsPerPageOptions={[10,25,50,100]}
//         disableSelectionOnClick
//         components={{
//           Toolbar: GridToolbar
//         }}
//         //checkboxSelection
//         //onSelectionModelChange={itm => console.log(itm)}
//       /></Box>
//       </Stack>
//       </Stack>
//       </Box>)}

function RTable() {
  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'result', header: 'Status', size: 100 },
    { accessorKey: 'auctiontype', header: 'Auction Type', size: 120 },
    {
      accessorKey: 'currbid',
      header: 'High Bid',
      size: 110,
      Cell: ({ cell }) => cell.getValue(), // Display as string
    },
    {
      accessorKey: 'bidAmount',
      header: 'Our Max Bid',
      size: 110,
      Cell: ({ cell }) => cell.getValue(), // Display as string
    },
    {
      accessorKey: 'endTimeist',
      header: 'Auction Date',
      size: 150,
      Cell: ({ cell }) => cell.getValue().substring(0, 16), // Display as string
    },
  ], []);

  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getcompletedauctions()
      .then((response) => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: rows,
    initialState: {
      pagination: { pageSize: psize },
      sorting: [{ id: 'endTimeist', desc: true }],
    },
    // state: {
    //   pagination: { pageSize: psize },
    // },
    // onPaginationChange: ({ pageSize }) => setPsize(pageSize),
  });

    return (
      <Box>
        <Stack direction='row' justifyContent='center' width='100%'>
          <Stack direction='column' alignItems='flex-start' spacing={2.5}>
            <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
              Auctions' Report
            </Typography>
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Box sx={{ minWidth: 910 }}>
                <MaterialReactTable
                  table={table}
                  muiTablePaperProps={{
                    sx: { width: '100%' },
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  }

export default RTable;