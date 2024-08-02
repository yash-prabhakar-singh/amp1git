//import { createTheme } from "@mui/material";
import Sidebar from './Sidebar';
import { Alert, Box, Button, Card, CardActionArea, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import * as React from 'react';
// import { useEffect } from 'react';
//import api from './api';
import { DataGrid, GridToolbar,GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { Delete, Gavel } from '@mui/icons-material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { color } from '@mui/system';
import { getwatchlist, removeWatchlist, schedulebiddcsingle, schedulebiddynasingle, schedulebidgdsingle, schedulebidncsingle, schedulebidnssingle } from './api';
import { canBidDC, canBidDD, canBidGD, canBidNC, canBidNS } from './msalService';
import { useMemo, useState, useEffect, useRef } from 'react';
import { MaterialReactTable,useMaterialReactTable } from 'material-react-table';


// export default function WatchList() {
//   function CustomToolbar(props) {
//     const ids=props.ids
//     return (
//       <GridToolbarContainer sx={{ display:'flex',flexDirection:'row-reverse'}} >
//         <GridToolbarColumnsButton />
//         <GridToolbarFilterButton />
//         <GridToolbarDensitySelector />
//         <GridToolbarExport />
//       </GridToolbarContainer>
//     );
//   }
//   const timeLeftComparator = (v1, v2,param1,param2) => {return gridStringOrNumberComparator(v1.endtime,v2.endtime)};

//   const MaxBid=(props)=>{
//     const [mb,setMb]=React.useState(props.currbid);
//     const handleChange = (event) => {
//       setMb(event.target.value);
//     };
//     const disabledc=()=>{if((props.platform=="Dynadot"&&canBidDD())||(props.platform=="Dropcatch"&&canBidDC())||
// (props.platform=="Namecheap"&&canBidNC())||(props.platform=="GoDaddy"&&canBidGD())||
// (props.platform=="Namesilo"&&canBidNS())){ return false;}
// else return true;}
// const disabled=()=>{if(!disabledc()){if(mb>props.currbid) return false; else return true;}
// else return true;}
//     return(<Stack direction='row' spacing={2}><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} /><IconButton size='small' disabled={disabled()} onClick={()=>{if(props.platform=="Dynadot")
//     {schedulebiddynasingle(props.domain,props.auctionId,mb.toString()).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=="Dropcatch")
//     {schedulebiddcsingle(props.domain,props.auctionId,mb).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=='GoDaddy')
//     {schedulebidgdsingle(props.domain,props.domain,mb.toString()).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=="Namecheap")
//     {schedulebidncsingle(props.domain,props.ncid,mb).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=="Namesilo")
//     {schedulebidnssingle(props.auctionId,props.domain,mb).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen1(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen1(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})} }}  sx={{
//       "&.Mui-disabled": {
//         color: "grey"
//       },color:'green'
//     }} ><Gavel/></IconButton></Stack>);
//   }  
//     let [rows,setRows]= React.useState([]);
//     const [open1,setOpen1]=React.useState(false);
//   const [open2, setOpen2] = React.useState(false);
//   const res= React.useRef("");
//   const [change,setchange]=React.useState(false);

//     let [psize,setPsize]= React.useState(50);
//     let[idds, setIdds]= React.useState([]);
//   useEffect(()=>{getwatchlist().then((response)=>{setRows(response.data); console.log(response.data);}).catch((error)=>console.log(error))},[change])
//   const columns = [
//     { field: 'platform', headerName: 'Platform', width: 100 },
//     { field: 'domain', headerName: 'Domain', width: 210
// },
//       {
//         field: 'time_left',
//         headerName: 'Time Left',
//         //description: 'This column has a value getter and is not sortable.',
//         //sortable: false,
//         valueGetter: (params) => ({
//           timeleft: params.row.time_left,
//           endtime: params.row.endTimeist,
//         }),
//         valueFormatter: (params) => {
//           const value = params.value;
//           return value.timeleft;
//         },
//         sortComparator:timeLeftComparator,
//         type: 'date-time',
//         width: 120,
        
//       },
//       {
//         field: 'currbid',
//         headerName: 'Current Bid',
//         type: 'number',
//         width: 100,
//       },
      
     
//       {
//         field: 'bidders',
//         headerName: 'Bidders',
//         type: 'number',
//         width: 70,
//       },
     
//       {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 50,
//         //valueGetter: ()=>{return '4 mins'}
//       },
//       {
//         field: 'estibot',
//         headerName: 'EST',
//         type: 'number',
//         width: 70,
//         //valueGetter: ()=>{return '4 mins'}
//       },
//       {
//         field: 'gdv',
//         headerName: 'GDV',
//         type: 'number',
//         width: 70,
//       },
//       { field: 'auctiontype', headerName: 'Auction Type', width: 110 },
//       ,
      
//       {
//         field:'maxbid',
//         headerName:'Our Max Bid',
//         renderCell: (params)=><MaxBid currbid={Number(params.row.currbid)} domain={params.row.domain} auctionId={params.row.auctionId} ncid={params.row.ncid} platform={params.row.platform} />,
//       width:170}
//     ,
//       {
//         field: 'extensions_taken',
//         headerName: 'Extns',
//         type: 'number',
//         width: 50,
//       },
//       {
//         field: 'keyword_exact_lsv',
//         headerName: 'LSV',
//         type: 'number',
//         width: 60,
//       },
//       {
//         field: 'keyword_exact_cpc',
//         headerName: 'CPC',
//         type: 'number',
//         width: 60,
//       },
//       {
//         field: 'whois_registrar',
//         headerName: 'Registrar',
//         width: 130,
//       },
//       {
//         field: 'end_users_buyers',
//         headerName: 'EUB',
//         type: 'number',
//         width: 60,
//       },
//       {
//         field: 'wayback_age',
//         headerName: 'ABY',
//         type: 'number',
//         width: 60,
//       }
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
//     <Stack direction='row' justifyContent='center' sx={{width:'100%'}}>
//       <Stack direction='column' alignItems='flex-start'  spacing={2.5} sx={{width:'100%'}}>
//       <Stack direction='row' spacing={1}>
//       <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
//             Watchlist
//         </Typography>
//         <Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen2(false);}}>
//         <Alert onClose={()=>{setOpen2(false);}} severity="info" sx={{ width: '100%' }}>
//           {res.current}
//         </Alert>
//       </Snackbar>
//       <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
//         <Alert onClose={()=>{setOpen1(false);}} severity="error" sx={{ width: '100%' }}>
//         {res.current}
//         </Alert>
//       </Snackbar>
//         {(idds.length!=0)&&<IconButton size='small' color='primary' sx={{ padding:0}} onClick={()=>{removeWatchlist(idds).then(setchange(!change));}}><Delete fontSize='small'/></IconButton>}
//         </Stack>
//       <Box sx={{//maxHeight: 400,
//          width:'100%' //1022
//          }} >
//       <DataGrid autoHeight sx={{ ".highlight": {
//         color:'darkred',
//            // bgcolor: "grey",
//             "&:hover": {
//               color: "red",
//             },
//           },
//           width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         getRowClassName={(params)=>{return params.row.track?"highlight":"";}}
       
//         /*initialState={{
//             sorting: {
//               sortModel: [{ field: 'endTimeist', sort: 'asc' }],
//             },
//           }}*/
//         onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
//         rowsPerPageOptions={[10,25,50,100,500]}
//         disableSelectionOnClick
//         components={{
//           Toolbar: CustomToolbar,
//           // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
//           BaseCheckbox: CheckboxWrapper
//         }}
//         checkboxSelection
//         onSelectionModelChange={(itm) => {console.log(idds); itm= setIdds(itm); }}

//       /></Box>
//         </Stack>
//         </Stack>
      
//     );
//   }



  
  // function CheckboxWrapper(props) {
  //   return (
  //     <Checkbox
  //       icon={<StarBorderIcon />}
  //       checkedIcon={<StarIcon />}
  //       {...props}
  //     />
  //   );
  // }



  export default function WatchList() {
    const [rows, setRows] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const res = useRef("");
    const [change, setChange] = useState(false);
    const [psize, setPsize] = useState(50);
    const [idds, setIdds] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
  
    useEffect(() => {
      getwatchlist()
        .then((response) => {
          setRows(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }, [change]);

    const columns = useMemo(() => [
      { accessorKey: 'platform', header: 'Platform', size: 100 },
      { accessorKey: 'domain', header: 'Domain', size: 210 },
      {
        accessorKey: 'time_left',
        header: 'Time Left',
        size: 120,
        Cell: ({ cell }) => cell.getValue().timeleft,
        sortingFn: 'datetime',
      },
      { accessorKey: 'currbid', header: 'Current Bid', size: 100, type: 'number' },
      { accessorKey: 'bidders', header: 'Bidders', size: 70, type: 'number' },
      { accessorKey: 'age', header: 'Age', size: 50, type: 'number' },
      { accessorKey: 'estibot', header: 'EST', size: 70, type: 'number' },
      { accessorKey: 'gdv', header: 'GDV', size: 70, type: 'number' },
      { accessorKey: 'auctiontype', header: 'Auction Type', size: 110 },
      {
        accessorKey: 'maxbid',
        header: 'Our Max Bid',
        size: 170,
        Cell: ({ cell }) => (
          <MaxBid
            currbid={Number(cell.row.original.currbid)}
            domain={cell.row.original.domain}
            auctionId={cell.row.original.auctionId}
            ncid={cell.row.original.ncid}
            platform={cell.row.original.platform}
          />
        ),
      },
      { accessorKey: 'extensions_taken', header: 'Extns', size: 50, type: 'number' },
      { accessorKey: 'keyword_exact_lsv', header: 'LSV', size: 60, type: 'number' },
      { accessorKey: 'keyword_exact_cpc', header: 'CPC', size: 60, type: 'number' },
      { accessorKey: 'whois_registrar', header: 'Registrar', size: 130 },
      { accessorKey: 'end_users_buyers', header: 'EUB', size: 60, type: 'number' },
      { accessorKey: 'wayback_age', header: 'ABY', size: 60, type: 'number' },
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
      muiTableHeadCellCheckboxProps: {
        icon: <StarBorderIcon />,
        checkedIcon: <StarIcon />,
      },
    }); 

    

    return (
      <ThemeProvider theme={theme}>
        <Stack direction='row' justifyContent='center' sx={{ width: '100%' }}>
          <Stack direction='column' alignItems='flex-start' spacing={2.5} sx={{ width: '100%' }}>
            <Stack direction='row' spacing={1}>
              <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
                Watchlist
              </Typography>
              <Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => { setOpen2(false); }}>
                <Alert onClose={() => { setOpen2(false); }} severity="info" sx={{ width: '100%' }}>
                  {res.current}
                </Alert>
              </Snackbar>
              <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={() => { setOpen1(false); }}>
                <Alert onClose={() => { setOpen1(false); }} severity="error" sx={{ width: '100%' }}>
                  {res.current}
                </Alert>
              </Snackbar>
              {(Object.keys(rowSelection).length !== 0) && (
                <IconButton size='small' color='primary' sx={{ padding: 0 }} onClick={() => { removeWatchlist(Object.keys(rowSelection)) }}>
                  <Delete fontSize='small' />
                </IconButton>
              )}
                      </Stack>
          <Box sx={{ width: '100%' }}>
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
              muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: { cursor: 'pointer' },
              })}
              muiSelectCheckboxProps={{
                icon: <StarBorderIcon />,
                checkedIcon: <StarIcon />,
              }}
              muiTableHeadCellCheckboxProps={{
                icon: <StarBorderIcon />,
                checkedIcon: <StarIcon />,
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

function MaxBid(props) {
  const [mb, setMb] = useState(props.currbid);
  const handleChange = (event) => {
    setMb(event.target.value);
  };
  const disabledc = () => {
    if ((props.platform === "Dynadot" && canBidDD()) || (props.platform === "Dropcatch" && canBidDC()) ||
      (props.platform === "Namecheap" && canBidNC()) || (props.platform === "GoDaddy" && canBidGD()) ||
      (props.platform === "Namesilo" && canBidNS())) { return false; }
    else return true;
  }
  const disabled = () => {
    if (!disabledc()) { if (mb > props.currbid) return false; else return true; }
    else return true;
  }
  return (
    <Stack direction='row' spacing={2}>
      <TextField size='small' sx={{ width: 95 }} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} />
      <IconButton size='small' disabled={disabled()} onClick={() => {
        if (props.platform === "Dynadot") {
          schedulebiddynasingle(props.domain, props.auctionId, mb.toString()).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === "Dropcatch") {
          schedulebiddcsingle(props.domain, props.auctionId, mb).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === 'GoDaddy') {
          schedulebidgdsingle(props.domain, props.domain, mb.toString()).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === "Namecheap") {
          schedulebidncsingle(props.domain, props.ncid, mb).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === "Namesilo") {
          schedulebidnssingle(props.auctionId, props.domain, mb).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen1(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen1(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
      }} sx={{
        "&.Mui-disabled": {
          color: "grey"
        }, color: 'green'
      }} ><Gavel /></IconButton>
    </Stack>
  );
}   
