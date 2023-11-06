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
import { Box, Button, Card, CardActionArea, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchDetailsdc, fetchDetailsdyna } from './api';
import { DataGrid } from '@mui/x-data-grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function BulkFetch() {

 

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
    const [plat,setPlat]= React.useState("Dynadot");
    const [fdets,setFdets]= React.useState([]);
    const [bfdets,setBfdets]= React.useState(false);
    const [value, setValue] = React.useState('');
    const [bool, setBool] = React.useState(false);
    const columns = [
      { field: 'domain', headerName: 'Domain', width: 210 },
      { field: 'auctiontype', headerName: 'Auction Type', width: 110 },
      {
        field: 'currbid',
        headerName: 'Current Bid',
        //type: 'number',
        width: 110,
      },
      {
        field: 'bidders',
        headerName: 'Bidders',
        //type: 'number',
        width: 110,
      },
      {
        field: 'time_left',
        headerName: 'Time Left',
        //description: 'This column has a value getter and is not sortable.',
        //sortable: false,
        width: 110,
        
      },
      {
        field: 'age',
        headerName: 'Age',
        //type: 'number',
        width: 110,
        //valueGetter: ()=>{return '4 mins'}
      },
      {
        field: 'estibot',
        headerName: 'Estibot',
        //type: 'number',
        width: 110,
        //valueGetter: ()=>{return '4 mins'}
      },
     
    ];
    React.useEffect(() => { console.log(plat);console.log(plat);}, [plat])
    React.useEffect(() => {}, [bool]);
   const handleChange = (event) => {
     setValue(event.target.value);
   };
 
   const [checked, setChecked] = React.useState(false);
   const [variant, setVariant] = React.useState("outlined");
 
   const switchHandler = (event) => {
     setChecked(event.target.checked);
     console.log(checked);
   };

  

  return (
    <ThemeProvider theme={theme}><Box sx={{backgroundColor:'white', height:'100vh'}}>
      <CssBaseline/>
    <Stack direction='row' paddingTop={4.5} justifyContent='center' spacing={16} sx={{}}>
<Sidebar/>
    <Stack direction='column' paddingTop={2}spacing={2.5} sx={{width:'70vw'}}>
      
    <Stack direction='row' justifyContent="flex-start">
        <Typography alignSelf='left'  fontWeight='bold' color='text.primary' >
            Bulk Fetch
        </Typography></Stack>
        <Stack spacing={2.5} >
    <Box sx={{ width:150 }}>
      <Stack alignItems='flex-start' spacing={1.5}>
        <Typography color="text.secondary">
          Choose Platform:
        </Typography>
      <FormControl fullWidth>
      
      <Select  sx={{height:40, '& legend': { display: 'none' },
    '& fieldset': { top: 0 }, color:'text.primary', fontWeight:'600'}}
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
            label="Domains"
            multiline
            rows={10}
            fullWidth
            onChange={handleChange}
           
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
            if(plat==='Dynadot')
            {fetchDetailsdyna(arr).then((Response)=>{console.log(Response.data); setFdets(Response.data);setBfdets(true);}).catch((Response)=>{console.log(Response.error);//setBfdets(false);
            });}
            else if(plat==='Dropcatch')
            {
              fetchDetailsdc(arr).then((Response)=>{console.log(Response.data); setFdets(Response.data);setBfdets(true);}).catch((Response)=>{console.log(Response.error);});
            }
            setBfdets(true);
            setVariant("contained");
            }}  sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">Fetch Details</Button> </Stack>
        </Box>
        {/*bfdets&&<TableContainer component={Paper}>
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{fontWeight: 'bold'}}>
            <TableRow sx={{fontWeight: 'bold'}}>
              <TableCell sx={{fontWeight: 'bold'}}>domain</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Auction Type</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Current Bid</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Bidders</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Time Left</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Age</TableCell>
              <TableCell sx={{fontWeight: 'bold'}} align="right">Estibot</TableCell>
            </TableRow>
          </TableHead>
          {<TableBody>
           
              <TableRow
                key={1}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
               
                <TableCell align="left">{fdets.domain}</TableCell>
                <TableCell align="right">{fdets.auctiontype}</TableCell>
                <TableCell align="right">{fdets.currbid}</TableCell>
                <TableCell align="right">{fdets.bidders}</TableCell>
                <TableCell align="right">{fdets.time_left}</TableCell> 
                <TableCell align="right">{fdets.age}</TableCell>
                <TableCell align="right">{fdets.estibot}</TableCell>
              </TableRow>
          </TableBody>}
        </Table>
      </TableContainer>*/}
      {bfdets&&<Box sx={{maxHeight: 400, width: 925}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={fdets}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5,10,15,25,50]}
        disableSelectionOnClick
        components={{
          // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
          BaseCheckbox: CheckboxWrapper
        }}
        checkboxSelection
        onSelectionModelChange={itm => {console.log(itm); api.watchlist(itm,fdets).then().catch(err=>console.log(err)) }}
      /></Box>}
     
      </Stack>
      </Stack>
    </Stack>
    </Box>
    </ThemeProvider>
    
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
