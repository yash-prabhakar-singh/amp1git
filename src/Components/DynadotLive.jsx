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
import { getLive, getLiveUpdated, schedulebiddynasingle } from './api';
import { DataGrid } from '@mui/x-data-grid';
import { Cached, Gavel, Replay } from '@mui/icons-material';
import { canBidDD, canBidDDLive } from './msalService';

export default function Live() {

    let [rows,setRows]= React.useState([]);
    let [rowsf,setRowsf]= React.useState([]);
    let [psize,setPsize]= React.useState(50);
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
  getLive().then((res)=>{console.log(res.data); setRows(res.data);setRowsf(res.data);}
  ).catch((err)=>console.log(err));
	/*let interval = setInterval(() => {
		getLive().then((res)=>{console.log(res.data); setRows(res.data);}).catch((err)=>console.log(err));
	}, 30000);
	return () => {
		clearInterval(interval);
	};*/
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

const MaxBid=(props)=>{
  const [mb,setMb]=React.useState(props.currbid);
  const handleChange = (event) => {
    setMb(event.target.value);
  };
const disabled=()=>{if(mb>props.currbid) return false; else return true;}
const disabledb=()=>{if(canBidDDLive()) return false; else return true;}
  return(<Stack direction='row' spacing={2}><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} /><IconButton size='small' disabled={disabled()||disabledb()} onClick={()=>{console.log(mb);
    
    schedulebiddynasingle(props.domain,props.auctionId,mb.toString()).then((response)=>{if(response.data==0){
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
  setOpen1(true);})} }  sx={{
    "&.Mui-disabled": {
      color: "grey"
    },color:'green'
  }} ><Gavel/></IconButton></Stack>);
}  

 //clearTimeout(timerr);


  const columns = [
   // { field: 'platform', headerName: 'Platform', width: 110 },
    { field: 'domain', headerName: 'Domain', width: 210 },
    {
      field: 'current_bid_price',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
    {
      field: 'bids',
      headerName: 'Bids',
      type: 'number',
      width: 70,
    },
    {
      field: 'est',
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
      valueGetter: (params) =>{return params.row.addtime?params.row.addtime.substring(11,16):"live start time"}
    },
    {
      field: 'time_left',
      headerName: 'Time Left',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 120,
      
    },
    {
        field:'maxbid',
        headerName:'Our Max Bid',
        renderCell: (params)=><MaxBid currbid={Number(params.row.current_bid_price)} domain={params.row.domain} auctionId={params.row.auctionId} />,
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
      <Stack direction='row' spacing={2.5} width={830} ><Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Dynadot Live
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
      <Tooltip sx={{padding:0}} title='Refreshes the list with new domains, Not refreshes data of previously detected domains'><IconButton onClick={()=>{getLive().then((re)=>{console.log(re.data); setRows(re.data);res.current="Refreshed";setOpen(true)}
  ).catch((err)=>{console.log(err);res.current="Not Refreshed"; setOpen1(true)});}}><Replay/></IconButton></Tooltip>
      <Tooltip sx={{color:'red',padding:0}} title='Use only when needed. Refreshes and updates each domain in Live List'><IconButton onClick={()=>{getLiveUpdated().then((res)=>{console.log(res.data); setRows(res.data);res.current="Refreshed";setOpen(true)}
  ).catch((err)=>{console.log(err);res.current="Not Refreshed"; setOpen1(true)});}}><Cached/></IconButton></Tooltip>
        </Stack>
{//<Button variant="contained" sx={{ fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} onClick={()=>{api.startLive().then(res=>console.log(res.data)).catch((err)=>console.log(err.data));}}>Start Live</Button>
}
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
      <Box sx={{width: 830}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
            getRowId={(row)=>{return row.auction_id}}

        rows={rowsf}
        columns={columns}
        pageSize={psize}
        initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'desc' }],
            },
          }}
        onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
        rowsPerPageOptions={[25,50,100,200]}
        disableSelectionOnClick
       
      /></Box>
        </Stack>
     
      
    );
  }
  