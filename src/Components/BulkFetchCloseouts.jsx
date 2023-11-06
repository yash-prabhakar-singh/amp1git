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
import { Alert, Box, Button, Card, CardActionArea, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, Typography, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import  { fetchDetailscloseoutsgd } from './api';
import { DataGrid } from '@mui/x-data-grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Bulkfetchcloseout() {

 

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
    const [plat,setPlat]= React.useState("GoDaddy");
    const [price,setPrice]= React.useState("5");
    const num= React.useRef(0);
    const den= React.useRef(0);

    const [fdets,setFdets]= React.useState([]);
    const [bfdets,setBfdets]= React.useState(false);
    const [value, setValue] = React.useState('');
    const [psize, setPsize] = React.useState(50);
    const [bool, setBool] = React.useState(false);
    const columns = [
      { field: 'domain', headerName: 'Domain', width: 210 },
      {
        field: 'timeLeft',
        headerName: 'Time Left',
        //description: 'This column has a value getter and is not sortable.',
        //sortable: false,
        type: 'date-time',
        width: 110,
        
      },
      {
        field: 'currPrice',
        headerName: 'Current Price',
        type: 'number',
        width: 110,
      },
      
     
      {
        field: 'gdv',
        headerName: 'GDV',
        type: 'number',
        width: 110,
      },
      { field: 'auctype', headerName: 'Auction Type', width: 110 },
    ];
    React.useEffect(() => { console.log(plat);console.log(plat);}, [plat])
    React.useEffect(() => {}, [bool]);
   const handleChange = (event) => {
     setValue(event.target.value);
   };
 
   const isMobile = useMediaQuery('(max-width:600px)');


   const [checked, setChecked] = React.useState(false);
   const [variant, setVariant] = React.useState("outlined");
 const [open,setOpen]= React.useState(false);
 const [open1,setOpen1]= React.useState(false);

   const switchHandler = (event) => {
     setChecked(event.target.checked);
     console.log(checked);
   };


    const Mobile=()=>{return(
    <Typography>Mobile version, Yet to be designed</Typography>);}

    if(isMobile)
    return(<Mobile/>);
    else
    return(<Stack direction='column' alignItems='center' spacing={2.5} sx={{width:'100%'}}>
      <Stack direction='column' spacing={2.5}>
    <Stack direction='row' justifyContent="flex-start">
    <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
          Details fetched of {num.current}/{den.current} domains!
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen1(false);}}>
        <Alert  severity="error" sx={{ width: '100%' }}>
        Failed to fetch details.
        </Alert>
      </Snackbar>
        <Typography alignSelf='left'  fontWeight='bold' color='text.primary' >
            Bulk Fetch Closeouts
        </Typography></Stack>
        <Stack spacing={2.5} >
    <Box sx={{ width:150 }}>
      <Stack alignItems='flex-start' spacing={1.5}>
        <Typography color="text.secondary">
          Choose Platform:
        </Typography>
      <FormControl fullWidth>
        <Stack direction="row">
        <Select  sx={{height:40, '& legend': { display: 'none' },
    '& fieldset': { top: 0 }, color:'text.primary', fontWeight:'600',  padding: "0px 0px 0px 0px !important"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         // value={plat}
          value={plat}
          label="Platforms"          
          onChange={(event)=>{setPlat(event.target.value);}}
        >
          <MenuItem  value={"Dynadot"}>Dynadot</MenuItem>
          <MenuItem value={"GoDaddy"}>GoDaddy</MenuItem>
          <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
          <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
        </Select>
        <Box width={25}></Box>
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
            //label="Domains"
            //InputLabelProps={{shrink: false}}
          //  sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}}
          placeholder="Domains"
            multiline
            rows={10}
            fullWidth
            onChange={handleChange}
            value={value}
           
          />
          </Stack>
        </div>
        <Stack direction='row' justifyContent="flex-start" paddingTop={2.5}>
        {/*<FormControlLabel control={<Switch checked={checked} onChange={switchHandler}/>} label="Instant Bid" />
  */}
        <Button onClick={()=>{
            var arr= value.split("\n")
            //var a= arr.map((ar)=> {return ar.split(',')});
            console.log(arr);
            if(plat==='GoDaddy')
            {fetchDetailscloseoutsgd(arr).then((Response)=>{console.log(Response.data);setFdets(Response.data); num.current=Response.data.length; den.current=arr.length
              if(Response.data.length!=0)
              setOpen(true);
              else
              setOpen1(true);
              setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);//setBfdets(false);
            });}
          
            setBfdets(true);
           // setValue('');
            setVariant("contained");
            }}  sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">Fetch Details</Button> </Stack>
        </Box>
        </Stack>
      {bfdets&&<Box sx={{maxHeight: 400, width: 710}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={fdets}
        columns={columns}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
          // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
          BaseCheckbox: CheckboxWrapper
        }}
        checkboxSelection
        onSelectionModelChange={itm => {console.log(itm); api.watchlistcloseouts(itm,fdets).then().catch(err=>console.log(err)) 
        }}
      /></Box>}
     
      </Stack>
      </Stack>)

 /* return (
   
  )*/;
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
{/* <Button onClick={()=>{
            var arr= value.split(",")
            //var a= arr.map((ar)=> {return ar.split(',')});
            console.log(arr);
            console.log(checked);
            if(!checked)
           { axios.post('http://localhost:8080/postDomainsingle',arr).then((Response)=>{console.log(Response.data); setBool(Response.data);});}
           else
           {
            axios.post('http://localhost:8080/postDomainsingleinstant',arr).then((Response)=>{console.log(Response.data); setBool(Response.data); if(!bool)
        {alert("Bid placed Successfully.")}
        });
           }
            }} sx={{alignSelf : "right",fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">Submit</Button> */}
