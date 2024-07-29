import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import { Grid } from '@material-ui/core';
//import AuthService from '../AuthService';
//import apiservice from '../apiservice';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Alert, Box, Button, Card, CardActionArea, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api, { instantcloseoutgd, instantcloseoutgd1, schedulecloseoutgd, schedulecloseoutgd1 } from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Mcloseouts() {

  let [rows,setRows]= React.useState([]);

 

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

    const navigate = useNavigate();
    const [value, setValue] = React.useState('');
    const [list, setList] = React.useState([]);
    const [plat,setPlat]= useState("GoDaddy");
    const [price,setPrice]= useState("5");
    const [bool,setBool]=useState(false);
    const [open,setOpen]=useState(false);
    const [open1,setOpen1]=useState(false);
    const [open2,setOpen2]=useState(false);
 const res= React.useRef([]);const err= React.useRef("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [checked, setChecked] = useState(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };

  return (
    
    <Stack direction='row' sx={{width: '100%'}} justifyContent='center'>
    <Stack direction='column'  spacing={2.5}>
    <Stack direction='row' justifyContent="flex-start">
    <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert onClose={()=>{setOpen(false);}} severity="info" sx={{ width: '100%' }}>
          Closeouts bought successfully for {res.current[0]}/{res.current[1]} domains.
        </Alert>
      </Snackbar>
      <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
        <Alert onClose={()=>{setOpen1(false);}} severity="info" sx={{ width: '100%' }}>
         Closeouts scheduled successfully for {res.current[0]}/{res.current[1]} domains.
        </Alert>
      </Snackbar>
      <Snackbar open={open2} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen2(false);}}>
        <Alert onClose={()=>{setOpen2(false);}} severity="error" sx={{ width: '100%' }}>
         {err.current}
        </Alert>
      </Snackbar>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Bulk Buy Closeouts
        </Typography></Stack>
        <Stack spacing={2.5} >
    <Box sx={{ width:200 }}>
      <Stack alignItems='flex-start' spacing={1.5}>
      <Typography color="text.secondary">
          Choose Platform And Price:
        </Typography>
      <FormControl fullWidth sx={{paddingLeft:0}}>
       <Stack direction="row" spacing={2.8}>
        <Select  sx={{height:40, '& legend': { display: 'none' },
    '& fieldset': { top: 0 }, color:'text.primary', fontWeight:'600',  padding: "0px 0px 0px 0px !important"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         // value={plat}
          value={plat}
          label="Platforms"
          onChange={(event)=>{setPlat(event.target.value);}}
        >
          <MenuItem value={"Dynadot"}>Dynadot</MenuItem>
          <MenuItem value={"GoDaddy"}>GoDaddy</MenuItem>
          <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
          <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
        </Select>

        <Select  sx={{height:40, '& legend': { display: 'none' },
    '& fieldset': { top: 0 }, color:'text.primary', fontWeight:'600',  padding: "0px 0px 0px 0px !important"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         // value={plat}
          value={price}
          label="Price"
          
          onChange={(event)=>{setPrice(event.target.value);}}
        >
          <MenuItem  value={"5"}>5</MenuItem>
          <MenuItem value={"11"}>11</MenuItem>
          <MenuItem value={"30"}>30</MenuItem>
          <MenuItem value={"40"}>40</MenuItem>
          <MenuItem value={"50"}>50</MenuItem>

        </Select>
        </Stack>
      </FormControl>
      </Stack>
    </Box>
    <Box 
        component="form"
        sx={{
           width: '58vw'
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <Stack alignItems='flex-start' spacing={1.5}>
          <Typography color='text.secondary'>
          Enter the list of domains:
        </Typography>
          <TextField
            id="outlined-multiline-static"
            name='domainbids'
           // label="Domain,Bids"
           placeholder="Enter domains here please"
            multiline
            fullWidth
            rows={10}
            value={value}
            //defaultValue="Domain,Bid"
            onChange={handleChange}
          /></Stack>
        </div>
        <Stack direction='row' justifyContent='space-between' paddingTop={2.5}>
        <Button onClick={()=>{
            var arr= value.trim().split("\n");
            if(arr[0].split(',').length>1)
            {
              var a= arr.map((ar)=> {return ar.split(',')});
              if(!checked)
              {
                schedulecloseoutgd1(a).then((Response)=>{console.log(Response.data); if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)})
              }
            else
            {
                instantcloseoutgd1(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)});  
            }
            }
            else
            {
            if(plat==="GoDaddy")
            {
            if(!checked)
            {schedulecloseoutgd(arr,price).then((Response)=>{console.log(Response.data); if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Closeouts not scheduled for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Closeouts not placed, SERVER ERROR!";setOpen2(true);console.log(error)})}
            else
            {
                instantcloseoutgd(arr,price).then((Response)=>{console.log(Response.data); if(Response.data[0]!=0) {res.current=Response.data; setOpen(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Closeouts not placed, SERVER ERROR!";setOpen2(true);console.log(error)})
            }}
          }
            setValue('');
            }} 
            sx={{backgroundColor:'black' , alignSelf:"right", fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">Bulk Buy</Button>
                    <FormControlLabel  control={<Switch color='primary' sx={{}} checked={checked} onChange={switchHandler}/>} label="Instant Buy" />

            </Stack>
        </Box>
       {/*<Box>
        {bool&&<Typography>Bid Orders not placed of Domains: {list} </Typography>
        }
       </Box>*/}
      </Stack>
      </Stack>
      </Stack>
    
  );
}
