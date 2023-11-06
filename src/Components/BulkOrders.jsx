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
import { backorderdiscount, backorderstandard } from './api';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function BulkOrders() {

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
    const [plat,setPlat]= useState(1);
    const [bool,setBool]=useState(false);
    const [open,setOpen]=useState(false);
    const [open1,setOpen1]=useState(false);
   const res= React.useRef([]);
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
    <Stack direction='row' justifyContent='center' sx={{width: '100%'}}>
    <Stack direction='column'  spacing={2.5}>
    <Stack direction='row' justifyContent="flex-start">
    <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert onClose={()=>{setOpen(false);}} severity="info" sx={{ width: '100%' }}>
          Order placed successfully for {res.current[0]}/{res.current[1]} domains.
        </Alert>
      </Snackbar>
      <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
        <Alert onClose={()=>{setOpen1(false);}} severity="info" sx={{ width: '100%' }}>
         Order placed successfully for {res.current[0]}/{res.current[1]} domains.
        </Alert>
      </Snackbar>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
            Bulk Orders
        </Typography>
        </Stack>
        <Stack spacing={2.5} >
    <Box sx={{ width:150 }}>
      <Stack alignItems='flex-start' spacing={1.5}>
      <Typography color="text.secondary">
          Choose Order Type:
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
          <MenuItem value={1}>Level 1</MenuItem>
          <MenuItem value={2}>Level 2</MenuItem>
          <MenuItem value={3}>Level 3</MenuItem>
          <MenuItem value={4}>Level 4</MenuItem>
          
        </Select>
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
           

            if(plat===1)
            {
              var arr= value.split("\n")
            
              console.log(arr);
            
              backorderstandard(arr).then((Response)=>{console.log(Response.data); res.current=Response.data; setOpen1(true);}).catch((error)=>console.log(error))
            
            }
            else if(plat===2)
            {
              var arr= value.split("\n")
              var a= arr.map((ar)=> {return ar.split(',')});
              console.log(a);
            
              backorderdiscount(a).then((Response)=>{console.log(Response.data); res.current=Response.data; setOpen1(true);}).catch((error)=>console.log(error))
            
            }
            setValue('');
            }} 
            sx={{backgroundColor:'black' , alignSelf:"right", fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">Bulk Order</Button>
                    <FormControlLabel  control={<Switch color='primary' sx={{}} checked={checked} onChange={switchHandler}/>} label="Instant Bid" />

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
