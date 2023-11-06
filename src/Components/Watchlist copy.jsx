//import { createTheme } from "@mui/material";
import Sidebar from './Sidebar';
import { Box, Button, Card, CardActionArea, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Tab, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import * as React from 'react';
import { useEffect } from 'react';
import { getcompletedauctions, removeWatchlist, schedulebiddcsingle, schedulebiddynasingle, schedulebidgdsingle, schedulebidncsingle, schedulebidnssingle } from './api';
import { DataGrid, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { Delete, Gavel } from '@mui/icons-material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { color } from '@mui/system';
import { MaterialReactTable } from 'material-react-table';


export default function WatchList1() {
  
  const timeLeftComparator = (v1, v2,columnId) => {return gridStringOrNumberComparator(v1.endtime,v2.endtime)};

  const MaxBid=(props)=>{
    const [mb,setMb]=React.useState(props.currbid);
    const handleChange = (event) => {
      console.log(mb)
      console.log(props.domain)
      setMb(event.target.value);
    };
  const disabled=()=>{if(mb>props.currbid) return false; else return true;}
    return(<Stack direction='row' spacing={2}><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} /><IconButton size='small' disabled={disabled()} onClick={()=>{console.log(mb);
      if(props.platform=="Dynadot")
      {schedulebiddynasingle(props.domain,props.auctionId,mb.toString()).then(console.log(mb)).catch((error)=>{console.log(error)})}
    else if(props.platform=="Dropcatch")
    {schedulebiddcsingle(props.domain,props.auctionId,mb).then(console.log(mb)).catch((error)=>{console.log(error)})}

    else if(props.platform=='GoDaddy')
    {schedulebidgdsingle(props.domain,props.domain,mb.toString()).then(console.log(mb)).catch((error)=>{console.log(error)})}
    else if(props.platform=="Namecheap")
    {schedulebidncsingle(props.domain,props.ncid,mb).then(console.log(mb)).catch((error)=>{console.log(error)})}
    else if(props.platform=="Namesilo")
    {schedulebidnssingle(props.auctionId,props.domain,mb).then(console.log(mb)).catch((error)=>{console.log(error)})}
    }}  sx={{
      "&.Mui-disabled": {
        color: "grey"
      },color:'green'
    }} ><Gavel/></IconButton></Stack>);
  }  
    let [rows,setRows]= React.useState([]);
    let [psize,setPsize]= React.useState(50);
    let[idds, setIdds]= React.useState([]);
  useEffect(()=>{getcompletedauctions().then((response)=>{setRows(response.data); console.log(response.data);}).catch((error)=>console.log(error))},[])
  const columns = [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210
},
      {
        accessorKey: 'time_left',
        header: 'Time Left',
        //description: 'This column has a value getter and is not sortable.',
        //sortable: false,
        sortingFn:(rowA,rowB,columnId)=>timeLeftComparator(rowA,rowB,columnId),
        type: 'date-time',
        size: 120,
        
      },
      {
        accessorFn:(row)=>{return (row.currbid??"0")},
        id: 'currbid',
        header: 'Current Bid',
        Cell:({renderedCellValue,row})=>{return <Typography >{renderedCellValue}</Typography>},
       //type: 'number',
        size: 100
      },
      
     
      {

        id: 'bidders',
        accessorFn:(row)=>{if(row.bidders==null)
        return 0;
      else
       return row.bidders;},
        header: 'Bidders',
        type: 'number',
        size: 70,
      },
     
      {
        
        id: 'age',
        accessorFn:(row)=>{if(row.age==null)
        return 0;
      else
       return row.age;},
        header: 'Age',
        type: 'number',
        size: 50,
        //valueGetter: ()=>{return '4 mins'}
      },
      {
        id: 'estibot',
        accessorFn:(row)=>{if(row.estibot==null)
        return 0;
      else
       return row.estibot;},
        header: 'EST',
        type: 'number',
        size: 70,
        //valueGetter: ()=>{return '4 mins'}
      },
      {
       
        id: 'gdv',
        accessorFn:(row)=>{if(row.gdv==null)
        return 0;
      else
       return row.gdv;},

        header: 'GDV',
        type: 'number',
        size: 70,
      },
      { accessorKey: 'auctiontype', header: 'Auction Type', size: 110 },
      {
        accessorFn:(row)=>{return row;},
        id:'maxbid',
        header:'Our Max Bid',
        Cell: ({renderedCellValue})=><MaxBid currbid={Number(renderedCellValue.currbid??0)} domain={renderedCellValue.domain} auctionId={renderedCellValue.auctionId} ncid={renderedCellValue.ncid} platform={renderedCellValue.platform} />,
      size:170}
    
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
    <Stack direction='row' justifyContent='center' sx={{width:'100%'}}>
      <Stack direction='column' alignItems='flex-start'  spacing={2.5}>
      <Stack direction='row' spacing={1}>
      <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Watchlist
        </Typography>
        {(idds.length!=0)&&<IconButton size='small' color='primary' sx={{ padding:0}} onClick={()=>{removeWatchlist(idds)}}><Delete fontSize='small'/></IconButton>}
        </Stack>
      <Box sx={{maxHeight: 400, width: 1122}} >
      <MaterialReactTable 
      columns={columns}
      data={rows} 
      muiTablePaginationProps={{
        rowsPerPageOptions: [10,25,50,100,500],
        showFirstButton: false,
        showLastButton: false,
      }}
      initialState={{ pagination: { pageSize: 25 } }}
      enableRowSelection
      rowCount={psize}
      muiSelectCheckboxProps={{
        icon:<StarBorderIcon />,
        checkedIcon:<StarIcon />
      }}
      />
      </Box>
        </Stack>
        </Stack>
      
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