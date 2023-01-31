import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import api from './api';
import { DataGrid } from '@mui/x-data-grid';



export default function PlacedTable() {

    let fn=(row)=>{if(row.bidPlaced)
        return "Yes";
        else
        return "No";}
//const [cbid,setCbid]=React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [psize, setPsize] = React.useState(10);
    //const [cbid, setCbid] = React.useState([]);
    const columns = [
      { field: 'platform', headerName: 'Platform', width: 100 },
      { field: 'domain', headerName: 'Domain', width: 210 },
      { field: 'auctiontype', headerName: 'Auction Type', width: 120 },
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
        type:"date-time",
        width: 200,
       // valueGetter: (params) =>{return params.row.endTimeist.substring(0,16)},
      },
      {
        field: 'buffer',
        headerName: 'Bid Buffer',
        //type: 'number',
        width: 90,
        valueGetter: ()=>{return '4 mins'}
      },
     
    ];
    
React.useEffect(()=>{api.getplacedbids().then((response)=>{setRows(response.data);}).catch((Error)=>console.log(Error))},[]);
  
//React.useEffect(()=>{setCbid(rows.map(axios.get("https://api.dynadot.com/api3.json").then((response)=>{var a=JSON.parse(response.data); return a.Response.ResponseCode})))});

//const handleChange = (event) => {
    //setValue(event.target.value);
 // };
    return (
    <Box>
      <Stack direction='column' alignItems='flex-start' spacing={2.5}>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Placed Bids
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
                //{<TableCell align="right">{fn(row)}</TableCell>}
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>*/}
       <Box sx={{maxHeight: 400, width: '100%'}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rows}
        columns={columns}
        pageSize={psize}
        onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
        rowsPerPageOptions={[5,10,15,25,50]}
        disableSelectionOnClick
        //checkboxSelection
        //onSelectionModelChange={itm => console.log(itm)}
      /></Box>
      </Stack></Box>)}

