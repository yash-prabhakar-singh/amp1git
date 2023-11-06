import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import api from './api';
import { DataGrid } from '@mui/x-data-grid';



export default function ScheduledTable() {

    let fn=(row)=>{if(row.bidPlaced)
        return "Yes";
        else
        return "No";}
const [psize,setPsize]=React.useState(5);
    const [rows, setRows] = React.useState([]);
    //const [cbid, setCbid] = React.useState([]);

React.useEffect(()=>{api.getscheduledauctions().then((response)=>{setRows(response.data);}).catch((Error)=>console.log(Error))},[]);
 
const columns = [
  { field: 'platform', headerName: 'Platform', width: 100 },
  { field: 'domain', headerName: 'Domain', width: 210 },
  { field: 'type', headerName: 'Type', width: 50 ,
  valueGetter: (params) =>{if(params.row.auctiontype.charAt(0)=='e'||params.row.auctiontype.charAt(0)=='E')
return 'E';
else return 'O';}
},
  {
    field: 'bidAmount',
    headerName: 'Our Max Bid',
    type: 'number',
    width: 110,
  },
  {
    field: 'currbid',
    headerName: 'Current Bid',
    type: 'number',
    width: 110,
  },
  {
    field: 'time_left',
    headerName: 'Time Left',
    //description: 'This column has a value getter and is not sortable.',
    //sortable: false,
    type: 'date-time',
    width: 200,
    //valueGetter: (params) =>{return params.row.endTimeist.substring(0,16)},
  },
  {
    field: 'buffer',
    headerName: 'Bid Buffer',
    //type: 'number',
    width: 90,
    valueGetter: ()=>{return '4 mins'}
  },
 
];
//React.useEffect(()=>{setCbid(rows.map(axios.get("https://api.dynadot.com/api3.json").then((response)=>{var a=JSON.parse(response.data); return a.Response.ResponseCode})))});

//const handleChange = (event) => {
    //setValue(event.target.value);
 // };
    return (
    
    <Box sx={{}}>
      <Stack direction='column' alignItems='flex-start' spacing={2.5}>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Scheduled Bids
        </Typography>

   
            <Box sx={{maxHeight: 400, width: '100%'}} >
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
    
            </Stack></Box>)}

