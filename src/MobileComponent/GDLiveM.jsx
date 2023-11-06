//import { createTheme } from "@mui/material";
import { Alert, Box, Button, Card, CardActionArea, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, TableCell, TextField, Tooltip, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as React from 'react';
import { useEffect } from 'react';
import { getLivegd, getLivenc, schedulebidgdsingle, schedulebidncsingle } from '../Components/api';
import { DataGrid } from '@mui/x-data-grid';
import { Gavel, Replay } from '@mui/icons-material';
import { canBidGDLive } from '../Components/msalService';
import { data } from '../Components/Data';

export default function GDLiveM() {

  const CustomTooltipCell = ({ value, ...props }) => {
  
    
  
    return (
      <Tooltip sx={{paddingX:0}} title={value} arrow placement="top">
      <TableCell  align='left' {...props} >
      {value} 
    </TableCell>
    </Tooltip>


    );
  };
    let [rows,setRows]= React.useState([]);
    let [psize,setPsize]= React.useState(50);
    let [rowsf,setRowsf]= React.useState([]);
    const [checked, setChecked] = useState(false);
    const [plat,setPlat]= useState("All");
    const [open, setOpen] = useState(false);
    const [open1,setOpen1]= React.useState(false);
    const res= React.useRef("");
    const switchHandler = (event) => {
      setChecked(event.target.checked);
      console.log(checked)
    };

 useEffect(() => {
  getLivegd().then((res)=>{console.log(res.data); setRows(res.data);setRowsf(res.data)}).catch((err)=>console.log(err));

}, []);

useEffect(() => {
  if(plat==='All')
  {if(!checked)setRowsf(rows);
  else setRowsf(rows.filter((row)=>{if(row.highlight) return row;}))}
  else if(plat==='Bubbles')
  {if(!checked)setRowsf(rows.filter((row)=>{if(row.live) return row;}));
  else setRowsf(rows.filter((row)=>{if(row.highlight&&row.live) return row;}))}
  else if(plat==='Initial List')
  {if(!checked)setRowsf(rows.filter((row)=>{if(!row.live) return row;}));
  else setRowsf(rows.filter((row)=>{if(row.highlight&&(!row.live)) return row;}))}
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
    console.log(props.currbid)
  };
const disabled=()=>{if(mb>props.currbid) return false; else return true;}
const disabledb=()=>{if(canBidGDLive()) return false; else return true;}

  return(<Stack direction='row' spacing={2}><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} /><IconButton size='small' disabled={disabled()||disabledb()} onClick={()=>{console.log(mb);
    schedulebidgdsingle(props.domain,props.domain,mb.toString()).then((response)=>{if(response.data==0){
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
    { field: 'name', headerName: 'Domain', width: 120 ,renderCell: (params) => (
      <CustomTooltipCell value={params.row.name} />
    )},
    
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 70,
    },
    {
      field: 'bidCount',
      headerName: 'Bids',
      type: 'number',
      width: 30,
    },
    {
      field: 'gdv',
      headerName: 'GDV',
      type: 'number',
      width: 70,
    },
    {
      field: 'addTime',
      headerName: 'Add Time',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 60,
      valueGetter: (params) =>{return params.row.addtime?params.row.addtime.substring(11,16):"Live Start"}
    },
    {
      field: 'timeLeft',
      headerName: 'Time Left',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 90,
      
    },
    ,
    {
        field:'maxbid',
        headerName:'Our Max Bid',
        renderCell: (params)=><MaxBid currbid={Number(params.row.price)} domain={params.row.name} auctionId={params.row.name} />,
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
      <Stack direction='column' alignItems='center' justifyContent='center' paddingY={2}  sx={{width:'100%'}} spacing={2.5}>
      <Grid  container direction='row' xs={12} pl={1} sx={{width:'100%'}} justifyContent='flex-start' alignItems='center' columnSpacing={1} rowSpacing={3} width='100%' ><Grid item container xs={5}  justifyContent='flex-start' alignItems='flex-start'><Typography alignSelf='start'  fontWeight='bold' color='text.primary' >GoDaddy Live</Typography></Grid>
        <Grid item xs={6}></Grid>
        <Grid  alignItems='flex-start'  item container xs={5}>
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
          
        </Select>
      </FormControl>
      </Grid>
      <Grid item flexGrow={1}></Grid>
      <Grid  item xs={3}>
      <FormControlLabel control={<Switch color='primary' sx={{}} checked={checked} onChange={switchHandler}/>} label="HL" labelPlacement='start' />
      </Grid>
      <Grid  item xs={1.5}>
      <Tooltip sx={{padding:0}} title='Refreshes the list with new domains, Not refreshes data of previously detected domains'><IconButton onClick={()=>{getLivegd().then((re)=>{console.log(re.data); setRows(re.data);res.current="Refreshed";setOpen(true)}
  ).catch((err)=>{console.log(err);res.current="Not Refreshed"; setOpen1(true)});}}><Replay/></IconButton></Tooltip>
      </Grid>
       </Grid>
      
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
      <Box sx={{ width:'100%'}} paddingX={1}>
      <DataGrid autoHeight sx={{ width: '100%'}}
      //isCellEditable={true}
      
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
  