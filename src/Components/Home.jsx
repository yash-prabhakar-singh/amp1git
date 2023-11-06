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
import { Box, Button, Card, CardActionArea, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api, { schedulebiddc } from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Home() {

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
    <ThemeProvider theme={theme}><Box sx={{backgroundColor:'white', height:'100vh'}}>
      <CssBaseline/>
    <Stack direction='row' paddingTop={4.5} justifyContent='center' spacing={16} sx={{}}>
<Sidebar/>
    <Stack direction='column' paddingTop={2} sx={{width:'70vw'}} spacing={2.5}>
    <Stack direction='row' justifyContent="flex-start">
        <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Bulk Bid
        </Typography></Stack>
        <Stack spacing={2.5} >
    <Box sx={{ width:150 }}>
      <Stack alignItems='flex-start' spacing={1.5}>
      <Typography color="text.secondary">
          Choose Platform:
        </Typography>
      <FormControl fullWidth>
       
        <Select sx={{height:40, '& legend': { display: 'none' },
    '& fieldset': { top: 0 }, color:'text.primary', fontWeight:'600'}}
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
            label="Domain,Bids"
            multiline
            fullWidth
            rows={10}
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
            {axios.post('http://localhost:8080/postDomains',a).then((Response)=>{console.log(Response.data); setList(Response.data); if(list.length!=0)
            {setBool(true)}});}
            else
            {
                axios.post('http://localhost:8080/postDomainsinstant',a).then((Response)=>{console.log(Response.data); setList(Response.data); if(list.length!=0)
            {setBool(true)}});
               
            }}
            else if(plat==="Dropcatch")
            {
              console.log(plat);

              if(!checked)
              {
                schedulebiddc(a).then((Response)=>{console.log(Response.data);}).catch((error)=>console.log(error))
              }
            }
            }} sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">Bulk Bid</Button>
                    <FormControlLabel  control={<Switch color='primary' sx={{}} checked={checked} onChange={switchHandler}/>} label="Instant Bid" />

            </Stack>
        </Box>
       <Box>
        {bool&&<Typography>Bid Orders not placed of Domains: {list} </Typography>
        }
       </Box>
      </Stack>
      </Stack>
    </Stack>
    </Box>
    </ThemeProvider>
    
  );
}
