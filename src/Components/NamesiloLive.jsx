//import { createTheme } from "@mui/material";
import Sidebar from './Sidebar';
import { Alert, Box, Button, Card, CardActionArea, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, TextField, Tooltip, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import * as React from 'react';
import { useEffect } from 'react';
import { getLivenc, getLivens, schedulebidncsingle, schedulebidnssingle } from './api';
import { DataGrid } from '@mui/x-data-grid';
import { Gavel, Replay } from '@mui/icons-material';
import { canBidNSLive } from './msalService';

export default function NamesiloLive() {

    let [rows,setRows]= React.useState([]);
    let [psize,setPsize]= React.useState(50);
    let [rowsf,setRowsf]= React.useState([]);
    const [plat,setPlat]= useState("All");
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1,setOpen1]= React.useState(false);
    const res= React.useRef("");
    const switchHandler = (event) => {
      setChecked(event.target.checked);
      console.log(checked)
    };
    //let [timer,setTimer]= React.useState();
 // useEffect(()=>{api.getLive().then((response)=>{setRows(response.data)}).catch((error)=>console.log(error))},[])
  /*setInterval(() => {console.log("live");
    api.getLive().then((response)=>{setRows(response.data)}).catch((error)=>console.log(error));
  }, 60000);
  useEffect(()=>{timer(1);},[])
 function timer(i)
 {
  setTimeout((i)=>{
  console.log(i);
  i++;},1000).then((i)=>{timer(i);})
 }
 function timer() {
 let timerr= setTimeout(function myTimer(){api.sample().then((res)=>{console.log(res); timerr= setTimeout(myTimer,10000)})},10000)
 }
 */
 useEffect(() => {
  getLivens().then((res)=>{console.log(res.data); setRows(res.data);setRowsf(res.data);}).catch((err)=>console.log(err));

}, []);
useEffect(() => {
  if(plat==='All')
  {if(!checked)setRowsf(rows);
  else setRowsf(rows.filter((row)=>{if(row.highlight) return row;}))}
  else if(plat==='Bubbles')
  {if(!checked)setRowsf(rows.filter((row)=>{if(row.live) return row;}));
  else setRowsf(rows.filter((row)=>{if(row.highlight&&row.live) return row;}))}
  else if(plat==='Initial List')
  {if(!checked)setRowsf(rows.filter((row)=>{if(row.initialList) return row;}));
  else setRowsf(rows.filter((row)=>{if(row.highlight&&row.initialList) return row;}))}
  else if(plat==='End List')
  {if(!checked)setRowsf(rows.filter((row)=>{if(row.endList) return row;}));
  else setRowsf(rows.filter((row)=>{if(row.highlight&&row.endList) return row;}))}

}
, [plat,checked,rows]);

 

 //clearTimeout(timerr);
 const MaxBid=(props)=>{
  const [mb,setMb]=React.useState(props.currbid);
  const handleChange = (event) => {
    setMb(event.target.value);
  };
const disabled=()=>{if(mb>props.currbid) return false; else return true;}
const disabledb=()=>{if(canBidNSLive()) return false; else return true;}

  return(<Stack direction='row' spacing={2}><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} /><IconButton size='small' disabled={disabled()||disabledb()} onClick={()=>{console.log(mb);
    schedulebidnssingle(props.auctionId,props.domain,mb).then((response)=>{if(response.data==0){
      res.current="Bid scheduled for "+props.domain+" at max price "+mb;
      setOpen(true);
    }
  else if(response.data>2){
    res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
    setOpen1(true); 
  }
  else{
    res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
    setOpen1(true); 
  }}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
  setOpen1(true);})   
} }  sx={{
    "&.Mui-disabled": {
      color: "grey"
    },color:'green'
  }} ><Gavel/></IconButton></Stack>);
}  

  const columns = [
   // { field: 'platform', headerName: 'Platform', width: 110 },
    { field: 'domain', headerName: 'Domain', width: 210 },
    {
      field: 'currentBid',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
    {
      field: 'openingBid',
      headerName: 'Opening Bid',
      type: 'number',
      width: 70,
    },
    {
      field: 'EST',
      headerName: 'EST',
      type: 'number',
      width: 70,
    },
    {
      field: 'addtime',
      headerName: 'Add Time',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 90,
      valueGetter: (params) =>{return params.row.addtime?params.row.addtime.substring(11,16):"Live Start"}
    },
    {
      field: 'time_left',
      headerName: 'Time Left',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 120,
      
    },
    ,
    {
        field:'maxbid',
        headerName:'Our Max Bid',
        renderCell: (params)=><MaxBid currbid={params.row.price} domain={params.row.name} auctionId={params.row.id} />,
      width:170
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
    
      <Stack direction='column' alignItems='flex-start' sx={{width:'100%'}} spacing={2.5}>
     <Stack direction='row' spacing={2.5} width={835} ><Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Namesilo Live
        </Typography>
        <Box sx={{flexGrow:1}}/>
        <FormControl  sx={{paddingLeft:0}}>
       
        <Select  sx={{height:40, '& legend': { display: 'none' },
    '& fieldset': { top: 0 }, color:'text.primary', fontWeight:'600',  padding: "0px 0px 0px 0px !important"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         // value={plat}
          value={plat}
          label="Platforms"
          onChange={(event)=>{setPlat(event.target.value);}}
        >
          {<MenuItem value={"All"}>All</MenuItem>}
          {<MenuItem value={"Bubbles"}>Bubbles</MenuItem>}
          {<MenuItem value={"Initial List"}>Initial List</MenuItem>}
          {<MenuItem value={"End List"}>End List</MenuItem>}
          
        </Select>
      </FormControl>
      <FormControlLabel  control={<Switch color='primary' sx={{}} checked={checked} onChange={switchHandler}/>} label="Highlights" labelPlacement='start' />
      <Tooltip sx={{padding:0}} title='Refreshes the list with new domains, Not refreshes data of previously detected domains'><IconButton onClick={()=>{getLivens().then((re)=>{console.log(re.data);res.current="Refreshed!" ;setRows(re.data);setOpen(true)}
  ).catch((err)=>{console.log(err);res.current="Failed to Refresh";setOpen1(true)});}}><Replay/></IconButton></Tooltip>
        </Stack>
        <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
        {res.current}
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen1(false);}}>
        <Alert  severity="error" sx={{ width: '100%' }}>
        {res.current}
        </Alert>
      </Snackbar>
      <Box sx={{ width: 835}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rowsf}
        columns={columns}
        pageSize={psize}
        initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}         
           getRowId={(row)=>row.nsid}

        onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
        rowsPerPageOptions={[25,50,100,200]}
        disableSelectionOnClick
       
      /></Box>
        </Stack>
     
      
    );
  }
  