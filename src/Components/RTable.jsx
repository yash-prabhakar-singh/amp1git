import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import api from './api';
import { DataGrid } from '@mui/x-data-grid';



function RTable() {

   
const columns = [
  { field: 'platform', headerName: 'Platform', width: 100 },
  { field: 'domain', headerName: 'Domain', width: 210 },
  { field: 'result', headerName: 'Status', width: 100 },
  { field: 'auctiontype', headerName: 'Auction Type', width: 120 },
  {
    field: 'wonat',
    headerName: 'High Bid',
    type: 'number',
    width: 110,
  },
  {
    field: 'mymaxbid',
    headerName: 'Our Max Bid',
    type: 'number',
    width: 110,
  },
  {
    field: 'endTimeist',
    headerName: 'Auction Date',
    description: 'This column has a value getter and is not sortable.',
    //sortable: false,
    type:'date-time',
    width: 200,
    valueGetter: (params) =>
      {return params.row.endTimeist.substring(0,16)},
  }
];

    let fn=(row)=>{if(row.bidPlaced)
        return "Yes";
        else
        return "No";}

        const [psize, setPsize] = React.useState(10);

    const [rows, setRows] = React.useState([]);
    const [cbid, setCbid] = React.useState("");
React.useEffect(()=>{api.getcompletedauctions().then((response)=>{setRows(response.data)}).catch((Error)=>console.log(Error))},[]);
  //const handleChange = (event) => {
    //setValue(event.target.value);
 // };
    return (
    
    <Box>
      <Stack direction='column' alignItems='flex-start' spacing={2.5}>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
            Auctions' Report
        </Typography>

    {/*<TableContainer component={Paper}>
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{fontWeight: 'bold'}}>
            <TableRow sx={{fontWeight: 'bold'}}>
              <TableCell sx={{fontWeight: 'bold'}}>Platform</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Domain</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Status</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Type</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">High Bid</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">My Max Bid</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.domain}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               
                <TableCell align="left">Dynadot</TableCell>
                <TableCell align="right">{row.domain}</TableCell>
                <TableCell align="right">{row.result}</TableCell>
                <TableCell align="right">{row.auctiontype}</TableCell>
                <TableCell align="right">{row.wonat}</TableCell>
                <TableCell align="right">{row.mymaxbid}</TableCell>
                <TableCell align="right">{row.endTimeist.substring(0,16)}</TableCell>
               
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
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[5,10,15,25,50]}
        disableSelectionOnClick
        //checkboxSelection
        //onSelectionModelChange={itm => console.log(itm)}
      /></Box>
      </Stack>
      </Box>)}

export default RTable;