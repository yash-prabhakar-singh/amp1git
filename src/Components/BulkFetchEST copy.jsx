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
import { Alert, Box, Button, Card, CardActionArea, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, Typography, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api, { fetchest } from './api';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { CSVLink } from 'react-csv';
import { Download } from '@mui/icons-material';
import CopyToClipboardButton from './CopyButton';

//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Bulkfest1() {

 

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
    const matches = useMediaQuery('(min-width:600px)');

    const [plat,setPlat]= React.useState("Dynadot");
    const [fdets,setFdets]= React.useState([]);
    const [bfdets,setBfdets]= React.useState(false);
    const [value, setValue] = React.useState('');
    const [psize, setPsize] = React.useState(10);
    const [bool, setBool] = React.useState(false);
    const columns = [
      { field: 'domain', headerName: 'Domain', width: 210 },
      
      {
        field: 'appraised_value',
        headerName: 'EST',
        type: 'number',
        width: 90,
      }
    ];
    const headers = [
      { label: "Domain", key: "domain" },
      { label: "EST", key: "appraised_value" },
  ];
   // React.useEffect(() => { console.log(plat);console.log(plat);}, [plat])
    React.useEffect(() => {if(!matches)navigate("/m")}, []);
   // React.useEffect(() => {}, [value]);

   const handleChange = (event) => {
     setValue(event.target.value);
   };
 
   const isMobile = useMediaQuery('(max-width:600px)');

   const [loaded, setLoaded] = React.useState(false);
   const [loading, setLoading] = React.useState(false);
   const [checked, setChecked] = React.useState(false);
   const [variant, setVariant] = React.useState("outlined");
 const [open,setOpen]= React.useState(false);
   const switchHandler = (event) => {
     setChecked(event.target.checked);
     console.log(checked);
   };

  
    const Mobile=()=>{return(
    <Typography>Mobile version, Yet to be designed</Typography>);}

    if(isMobile)
    return(<Mobile/>);
    else
    return(
      <ThemeProvider theme={theme}><Box width='100%' sx={{ maxHeight:'100vh'}}>
      <CssBaseline/>
      <Stack direction='row' justifyContent='center' paddingTop={4} sx={{width:'100%'}}>
    <Stack direction='column'  sx={{
          
       }} spacing={2.5} >
      <Stack direction='row' justifyContent="flex-start" >
    <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
          Details fetched!
        </Alert>
      </Snackbar>
        <Typography alignSelf='left'  fontWeight='bold' color='text.primary' >
            Bulk Fetch EST
        </Typography></Stack>
   
        
    <Box 
        component="form"
        sx={{
          width: '800px'
       }}
        noValidate
        autoComplete="off"
      >
         
        <div>
        <Stack alignItems='flex-start' spacing={1.5}>
        <Stack direction='row' width='100%'><Typography color='text.secondary'>
          Enter the list of domains:
        </Typography><Box flexGrow={1} /><CopyToClipboardButton text={value}/>
        <IconButton
                variant='contained'
                color="primary"
                sx={{alignSelf : "right",fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}}
            >
                <CSVLink
                    headers={headers}
                    data={fdets}
                    filename="ESTs"
                    style={{ "textDecoration": "none", "color": "black" }}
                >
                    {<Download fontSize='small'/>}
                </CSVLink>
            </IconButton>
        </Stack>
          <TextField
            id="outlined-multiline-static"
            name='domainbids'
            //label="Domains"
            //InputLabelProps={{shrink: false}}
          //  sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 },}}
          placeholder="Domains"
            multiline
            rows={15}
            //sx={{width: 260}}
           // fullWidth
            onChange={handleChange}
            value={value}
            fullWidth
           
          />
          </Stack>
        </div>
        <Stack direction='row' justifyContent="flex-start" paddingTop={2.5}>
        {/*<FormControlLabel control={<Switch checked={checked} onChange={switchHandler}/>} label="Instant Bid" />
  */}
        <Button 
        disabled={loading}
      onClick={()=>{
            setLoading(true);
            //var arr= value.replace(/\s/g,"").split("\n")
            var arr = value.replace(/[^\S\n]+/g, "").split("\n").filter(Boolean);

            var s="";
            //var a= arr.map((ar)=> {return ar.split(',')});
            setFdets([]);
            console.log(arr);
            fetchest(arr).then((res)=>{console.log(res.data); setFdets(res.data);setLoaded(true);setLoading(false);
              for(let i=0;i<res.data.length;i++)
              { var row=res.data[i];
                s=s+(row.domain??'domain')+'\t'+(row.appraised_value??0)+"\n";
            }
            setValue(s);

              if(fdets.length!=0)
              setOpen(true);}).catch((err)=>{console.log(err);setLoading(false)})
            setBfdets(true);
           // setValue('');
            setVariant("contained");
            }}  sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}} variant="contained">{loading?"Fetching..":"Fetch ESTs"}</Button> </Stack>
        
        </Box>
       {/*<Box>
      {bfdets&&<Divider orientation='vertical'  />}
      </Box>
      
      <Stack width={370}>
      {bfdets&&<Box  >
        <Stack direction='column' alignItems='flex-start' spacing={1.5} sx={{maxHeight: 400, width: 370}}>
        <Stack direction='row' justifyContent='space-between' width={370}>
        <Typography color='text.secondary'>
          Domains with EST:
        </Typography>
        <Box >
        {/*loaded&&<IconButton
                variant='contained'
                color="primary"
                sx={{alignSelf : "right",fontSize:12, paddingTop:0.1,paddingBottom:0.1,borderRadius:0.2,height:30}}
            >
                <CSVLink
                    headers={headers}
                    data={fdets}
                    filename="ESTs"
                    style={{ "textDecoration": "none", "color": "black" }}
                >
                    {<Download/>}
                </CSVLink>
            </IconButton>
            }</Box>
        </Stack>
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={fdets}
        getRowId={(row) => row.domain} 
        columns={columns}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[5,10,15,25,50]}
        disableSelectionOnClick
        components={{
          // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
          BaseCheckbox: CheckboxWrapper,
          Toolbar: GridToolbar
        }}
        //checkboxSelection
        //onSelectionModelChange={itm => {console.log(itm); api.watchlist(itm,fdets).then().catch(err=>console.log(err)) }}
      />
      
      </Stack></Box>}
      </Stack>
      <Box>
      {bfdets&&<Divider orientation='vertical'  />}
      </Box>
      {bfdets&&<Stack direction='column' justifyContent='flex-start' alignItems='flex-start'>
        {<Typography align='left'>{fdets.map((row)=>{
          return <>{row.domain??'domain'}{'\t'}{row.appraised_value??0}<br/></>})}</Typography>
        }
        {//fdets.map((row)=>{if(row!==null)
       // return <Stack direction='row'><Typography>{row.domain}</Typography><Typography paddingLeft='4em'>{row.appraised_value}</Typography></Stack>})
        }
      </Stack>}*/}
      
      </Stack>
      </Stack>
      </Box>
      </ThemeProvider>)

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
