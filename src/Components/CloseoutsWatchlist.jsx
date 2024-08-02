//import { createTheme } from "@mui/material";
import Sidebar from './Sidebar';
import { Box, Button, Card, CardActionArea, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import * as React from 'react';
// import { useEffect } from 'react';
import { getwatchlistCloseout, removeCloseoutWatchlist } from './api';
import { DataGrid } from '@mui/x-data-grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Delete } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';


// export default function Watchlistcloseouts() {

//   let[idds, setIdds]= React.useState([]);
//     let [rows,setRows]= React.useState([]);
//     let [psize,setPsize]= React.useState(50);
//   useEffect(()=>{getwatchlistCloseout().then((response)=>{setRows(response.data);console.log(response.data)}).catch((error)=>console.log(error))},[])
//   const columns = [
//     { field: 'domain', headerName: 'Domain', width: 210 },
//     {
//       field: 'timeLeft',
//       headerName: 'Time Left',
//       //description: 'This column has a value getter and is not sortable.',
//       //sortable: false,
//       type: 'date-time',
//       width: 110,
      
//     },
//     {
//       field: 'currPrice',
//       headerName: 'Current Price',
//       type: 'number',
//       width: 110,
//     },
    
   
//     {
//       field: 'gdv',
//       headerName: 'GDV',
//       type: 'number',
//       width: 110,
//     },
//     { field: 'auctype', headerName: 'Auction Type', width: 150 },
//   ];
  
//     const theme = createTheme({
//       palette: {
//         primary: {
//           main: '#000',
//         },
//         secondary: {
//           main: '#edf2ff',
//         },
//       },
//       typography: {
//         fontFamily: [
//           'Nunito',
//           'Train One',
//           'Roboto',
          
          
//           'sans-serif',
//           'cursive'
//         ].join(",")
      
//       }
//       }
//       );
  
      
  
//     return (
    
//       <Stack direction='row' justifyContent='center' sx={{width:'100%'}}>
//       <Stack direction='column' alignItems='flex-start'  spacing={2.5}>
//         <Stack direction='row' spacing={1}>
//       <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
//             CloseOuts' Watchlist
//         </Typography>
//         {(idds.length!=0)&&<IconButton size='small' color='primary' sx={{ padding:0}} onClick={()=>{removeCloseoutWatchlist(idds)}}><Delete fontSize='small'/></IconButton>}
//         </Stack>
//       <Box sx={{width: 742}} >
//       <DataGrid autoHeight sx={{ width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         initialState={{
//           sorting: {
//             sortModel: [{ field: 'endTimeist', sort: 'asc' }],
//           },
//         }}
//         onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
//         rowsPerPageOptions={[10,25,50,100,500]}
//         disableSelectionOnClick
//         components={{
//           BaseCheckbox: CheckboxWrapper
//         }}
//         checkboxSelection
//         onSelectionModelChange={(itm) => {console.log(idds); itm= setIdds(itm); }}

//       /></Box>
//         </Stack>
//         </Stack>
      
//     );
//   }
  
//   function CheckboxWrapper(props) {
//     return (
//       <Checkbox
//         icon={<StarBorderIcon />}
//         checkedIcon={<StarIcon />}
//         {...props}
//       />
//     )
//   }


// import Sidebar from './Sidebar';
// import { Box, Checkbox, IconButton, Stack, Typography } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect, useMemo } from 'react';
// import { getwatchlistCloseout, removeCloseoutWatchlist } from './api';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import StarBorderIcon from '@mui/icons-material/StarBorder';
// import StarIcon from '@mui/icons-material/Star';
// import { Delete } from '@mui/icons-material';

export default function Watchlistcloseouts() {
  const [idds, setIdds] = useState([]);
  const [rows, setRows] = useState([]);
  const [psize, setPsize] = useState(50);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    getwatchlistCloseout()
      .then((response) => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = useMemo(() => [
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'timeLeft', header: 'Time Left', size: 110, type: 'date-time' },
    { accessorKey: 'currPrice', header: 'Current Price', size: 110, type: 'number' },
    { accessorKey: 'gdv', header: 'GDV', size: 110, type: 'number' },
    { accessorKey: 'auctype', header: 'Auction Type', size: 150 },
  ], []);

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


  const table = useMaterialReactTable({
    columns: columns,
    data: rows,
    initialState: {
      pagination: { pageSize: psize },
      sorting: [{ id: 'endTimeist', desc: true }],
    },
    muiTableBodyCellProps: {
      sx: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        // backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.grey,
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: 500,
      },
    },
    muiTablePaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100, 500],
      onPageSizeChange: (newPageSize) => setPsize(newPageSize),
    },
    enableRowSelection: true,
    enableMultiRowSelection: true,
    getRowId: (row) => row.id, // Assuming each row has a unique 'id' field
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    muiSelectCheckboxProps: {
      icon: <StarBorderIcon />,
      checkedIcon: <StarIcon />,
    },
    // muiTableHeadCellCheckboxProps: {
    //   icon: <StarBorderIcon />,
    //   checkedIcon: <StarIcon />,
    // },
  });

 
  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' justifyContent='center' sx={{ width: '100%' }}>
        <Stack direction='column' alignItems='flex-start' spacing={2.5}>
          <Stack direction='row' spacing={1}>
            <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
              CloseOuts' Watchlist
            </Typography>
            {(Object.keys(rowSelection).length !== 0) && (
              <IconButton size='small' color='primary' sx={{ padding: 0 }} onClick={() => { removeCloseoutWatchlist(Object.keys(rowSelection)) }}>
                <Delete fontSize='small' />
              </IconButton>
            )}
          </Stack>
          <Box sx={{ width: 850 }}>
            <MaterialReactTable
              table={table}
              muiTablePaperProps={{
                sx: { width: '100%' },
              }}
              muiTableBodyCellProps={{
                sx: {
                  '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
              }}
              muiTableHeadCellProps={{
                sx: {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                },
              }}
              muiTableContainerProps={{
                sx: {
                  maxHeight: 500,
                },
              }}
              muiTablePaginationProps={{
                rowsPerPageOptions: [10, 25, 50, 100, 500],
                onPageSizeChange: (newPageSize) => setPsize(newPageSize),
              }}
              muiTableCheckboxProps={{
                icon: <StarBorderIcon />,
                checkedIcon: <StarIcon />,
              }}
              muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: { cursor: 'pointer' },
              })}
              // muiTableHeadCellCheckboxProps={{
              //   icon: <StarBorderIcon />,
              //   checkedIcon: <StarIcon />,
              // }}
            />
          </Box>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

function CheckboxWrapper(props) {
  return (
    <Checkbox
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
      {...props}
    />
  );
}