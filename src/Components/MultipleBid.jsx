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
import api from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Mbid() {

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
    const [plat,setPlat]= useState("Dynadot");
    const [bool,setBool]=useState(false);
    const [open,setOpen]=useState(false);
    const [open1,setOpen1]=useState(false);
   const [res,setRes]=useState([]);

   React.useEffect(() => { console.log(plat);console.log(plat);}, [plat])
   React.useEffect(() => {}, [bool])
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [checked, setChecked] = useState(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };

  return (
    
    <Stack direction='column' sx={{width: '100%'}} spacing={2.5}>
    <Stack direction='row' justifyContent="flex-start">
    <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert onClose={()=>{setOpen(false);}} severity="info" sx={{ width: '100%' }}>
          Bid placed successfully for {res[0]}/{res[1]} domains.
        </Alert>
      </Snackbar>
      <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
        <Alert onClose={()=>{setOpen1(false);}} severity="info" sx={{ width: '100%' }}>
         Bid scheduled successfully for {res[0]}/{res[1]} domains.
        </Alert>
      </Snackbar>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Bulk Bid
        </Typography></Stack>
        <Stack spacing={2.5} >
    <Box sx={{ width:150 }}>
      <Stack alignItems='flex-start' spacing={1.5}>
      <Typography color="text.secondary">
          Choose Platform:
        </Typography>
      <FormControl fullWidth sx={{paddingLeft:0}}>
       
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
      </FormControl>
      </Stack>
    </Box>
    <Box 
        component="form"
        sx={{
           width: '45vw'
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
           placeholder="Domain,Bid
Domain,Bid
Domain,Bid
Domain,Bid"
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
            var arr= value.split("\n")
            var a= arr.map((ar)=> {return ar.split(',')});
            console.log(a);
            console.log(checked);

            if(plat==="Dynadot")
            {
            if(!checked)
            {api.schedulebiddyna(a).then((Response)=>{console.log(Response.data); setRes(Response.data); setOpen1(true);}).catch(error=>console.log(error));}
            else
            {
                api.instantbiddyna(a).then((Response)=>{console.log(Response.data); setRes(Response.data);setOpen(true);}).catch(error=>console.log(error));
               
            }}
            else if(plat==="Dropcatch")
            {
              console.log(plat);

              if(!checked)
              {
                api.schedulebiddc(a).then((Response)=>{console.log(Response.data); setRes(Response.data); setOpen1(true);}).catch((error)=>console.log(error))
              }
              else
              {
                api.instantbiddc(a).then((Response)=>{console.log(Response.data); setRes(Response.data); setOpen(true);}).catch((error)=>console.log(error))
              }
            }

            else if(plat==="Namecheap")
            {
              console.log(plat);

              if(!checked)
              {
                api.schedulebidnc(a).then((Response)=>{console.log(Response.data); setRes(Response.data); setOpen1(true);}).catch((error)=>console.log(error))
              }
              else
              {
                api.instantbidnc(a).then((Response)=>{console.log(Response.data); setRes(Response.data); setOpen(true);}).catch((error)=>console.log(error))
              }
            }

            setValue('');
            }} 
            sx={{backgroundColor:'black' , alignSelf:"right", fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">Bulk Bid</Button>
                    <FormControlLabel  control={<Switch color='primary' sx={{}} checked={checked} onChange={switchHandler}/>} label="Instant Bid" />

            </Stack>
        </Box>
       {/*<Box>
        {bool&&<Typography>Bid Orders not placed of Domains: {list} </Typography>
        }
       </Box>*/}
      </Stack>
      </Stack>
   
    
  );
}
