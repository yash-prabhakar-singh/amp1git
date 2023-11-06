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
import { Alert, Box, Button, ButtonGroup, Card, CardActionArea, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, Typography, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchDetailsEst, fetchDetailsdc, fetchDetailsdyna, fetchDetailsgodaddy, fetchDetailsnc, fetchDetailsns, watchlist } from './api';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, gridStringOrNumberComparator } from '@mui/x-data-grid';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useRef } from 'react';
import { Star } from '@mui/icons-material';

//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Bulkf() {

 

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
    function CustomToolbar(props) {
      const ids=props.ids
      return (
        <GridToolbarContainer sx={{ display:'flex',flexDirection:'row-reverse'}} >
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Button variant='text' sx={{paddingRight:0,paddingLeft:0,padding:'0px !important'}} onClick={()=>{console.log(ids);fetchDetailsEst(ids).then((response)=>{setFdets(response.data);setColumnVisibilityModel(withEst);})}}>EST</Button>
        </GridToolbarContainer>
      );
    }
    
    const timeLeftComparator = (v1, v2,param1,param2) => {return gridStringOrNumberComparator(v1.endtime,v2.endtime)};

    const navigate = useNavigate();
    const [plat,setPlat]= React.useState("Dynadot");
    const [fdets,setFdets]= React.useState([]);
    const [ids,setIds]= React.useState([]);
    const [bfdets,setBfdets]= React.useState(false);
    const [value, setValue] = React.useState('');
    const [psize, setPsize] = React.useState(50);
    const n=useRef(0);
    const d=useRef(0);
    const [bool, setBool] = React.useState(false);
    const columns = [
      { field: 'domain', headerName: 'Domain', width: 210 },
      {
        field: 'time_left',
        headerName: 'Time Left',
        //description: 'This column has a value getter and is not sortable.',
        //sortable: false,
        valueGetter: (params) => ({
          timeleft: params.row.time_left,
          endtime: params.row.endTimeist,
        }),
        valueFormatter: (params) => {
          const value = params.value;
          return value.timeleft;
        },
        sortComparator:timeLeftComparator,
        type: 'date-time',
        width: 110,
        
      },
      {
        field: 'currbid',
        headerName: 'Current Bid',
        type: 'number',
        width: 110,
      },
      
     
      {
        field: 'bidders',
        headerName: 'Bidders',
        type: 'number',
        width: 80,
      },
     
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 70,
        //valueGetter: ()=>{return '4 mins'}
      },
      {
        field: 'estibot',
        headerName: 'EST',
        type: 'number',
        width: 90,
        //valueGetter: ()=>{return '4 mins'}
      },
      { field: 'auctiontype', headerName: 'Auction Type', width: 110 },
      {
        field: 'extensions_taken',
        headerName: 'Extns',
        type: 'number',
        width: 50,
      },
      {
        field: 'keyword_exact_lsv',
        headerName: 'LSV',
        type: 'number',
        width: 60,
      },
      {
        field: 'keyword_exact_cpc',
        headerName: 'CPC',
        type: 'number',
        width: 60,
      },
      {
        field: 'whois_registrar',
        headerName: 'Registrar',
        width: 130,
      },
      {
        field: 'end_users_buyers',
        headerName: 'End User Buyers',
        type: 'number',
        width: 130,
      },
      {
        field: 'wayback_age',
        headerName: 'Wayback Age',
        type: 'number',
        width: 110,
      },
      
      
    ];
    const withEst={};
    const withoutEst={extensions_taken:false,wayback_age:false,end_users_buyers:false,whois_registrar:false,keyword_exact_cpc:false,keyword_exact_lsv:false};

    //React.useEffect(() => { console.log(plat);console.log(plat);}, [plat])
    React.useEffect(() => {}, [bool]);
   const handleChange = (event) => {
     setValue(event.target.value);
   };
 
   const isMobile = useMediaQuery('(max-width:600px)');
   const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(withoutEst);

   
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
    return(<Stack direction='row' width='100%' justifyContent='center'>
    <Stack direction='column' alignItems='center' spacing={2.5} sx={{width:860}}>
    <Stack direction='column'  spacing={2.5} >
    <Stack direction='row' justifyContent="flex-start" >
    <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
        Details fetched of {n.current}/{d.current} domains!
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen1(false);}}>
        <Alert  severity="error" sx={{ width: '100%' }}>
        Failed to fetch details.
        </Alert>
      </Snackbar>
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
      
      <Select  sx={{height:40,'& legend': { display: 'none' },
    '& fieldset': { top: 0 }, color:'text.primary',fontWeight:'600',  padding: "0px 0px 0px 0px !important", paddingLeft:-2}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         // value={plat}
          value={plat}
          label="Platforms"
          
          onChange={(event)=>{setPlat(event.target.value);}}
        >
          <MenuItem  value={"Dynadot"} sx={{ paddingY:0}}>Dynadot</MenuItem>
         <Divider/>
          <MenuItem  value={"GoDaddy"} sx={{ paddingY:0}}>GoDaddy</MenuItem>
          <Divider/>
          <MenuItem value={"Dropcatch"} sx={{ paddingY:0}}>Dropcatch</MenuItem>         
          <Divider/>
          <MenuItem value={"Namecheap"} sx={{ paddingY:0}}>Namecheap</MenuItem>
          <Divider/>
          <MenuItem value={"Namesilo"} sx={{ paddingY:0}}>Namesilo</MenuItem>
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
        autoComplete="off">
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
  <Stack direction='row'>
        <Button onClick={()=>{
          setColumnVisibilityModel(withoutEst)
            var arr= value.split("\n")
            //var a= arr.map((ar)=> {return ar.split(',')});
            console.log(arr);
            if(plat==='Dynadot')
             {
              fetchDetailsdyna(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
             setIds(Response.data.map((row)=>row.id))
             
              n.current=Response.data.length; d.current=arr.length;
             if(Response.data.length!=0)
             setOpen(true);
             else
             setOpen1(true);
             setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);//setBfdets(false);
            })
          }
            else if(plat==='Dropcatch')
            {
              fetchDetailsdc(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                console.log(ids);

                if(Response.data.length!=0)
                {setOpen(true);}
                else
                {setOpen1(true);}
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
  
            else if(plat==='Namecheap')
            {
              fetchDetailsnc(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                if(Response.data.length!=0)
                setOpen(true);
                else
                setOpen1(true);
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
            else if(plat==='GoDaddy')
            {
              fetchDetailsgodaddy(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                if(Response.data.length!=0)
                setOpen(true);
                else
                setOpen1(true);
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
            else if(plat==='Namesilo')
            {
              fetchDetailsns(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                if(Response.data.length!=0)
                setOpen(true);
                else
                setOpen1(true);
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
            setBfdets(true);
           // setValue('');
            setVariant("contained");
            }}  sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingRight:1,paddingTop:0.1,borderTopRightRadius:0.2,borderBottomRightRadius:0.2,paddingBottom:0.1,height:30}} variant="contained">Fetch
            </Button>
<Divider orientation="vertical" sx={{color:'white'}}/>
            <Button onClick={()=>
            {
            setColumnVisibilityModel(withoutEst)
            var arr= value.split("\n")
  
            console.log(arr);
            if(plat==='Dynadot')
            {fetchDetailsdyna(arr,true).then((Response)=>{console.log(Response.data); setFdets(Response.data);
              setIds(Response.data.map((row)=>row.id))
              n.current=Response.data.length; d.current=arr.length;
            if(Response.data.length!=0)
            setOpen(true);
            else
            setOpen1(true);
              setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);//setBfdets(false);
            })}
            else if(plat==='Dropcatch')
            {
              fetchDetailsdc(arr,true).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                if(Response.data.length!=0)
                {setOpen(true);}
                else
                {setOpen1(true);}
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
  
            else if(plat==='Namecheap')
            {
              fetchDetailsnc(arr,true).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                if(Response.data.length!=0)
                setOpen(true);
                else
                setOpen1(true);
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
            else if(plat==='GoDaddy')
            {
              fetchDetailsgodaddy(arr,true).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                if(Response.data.length!=0)
                setOpen(true);
                else
                setOpen1(true);
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
            else if(plat==='Namesilo')
            {
              fetchDetailsns(arr,true).then((Response)=>{console.log(Response.data); setFdets(Response.data);
                setIds(Response.data.map((row)=>row.id))
                n.current=Response.data.length; d.current=arr.length;
                if(Response.data.length!=0)
                setOpen(true);
                else
                setOpen1(true);
                setBfdets(true);}).catch((Response)=>{setOpen1(true);console.log(Response.error);});
            }
            setBfdets(true);
           // setValue('');
            setVariant("contained");
            }}  sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12,paddingLeft:1,paddingTop:0.1,borderTopLeftRadius:0.2,borderBottomLeftRadius:0.2,paddingBottom:0.1,height:30}} variant="contained">Watch
            </Button>

            </Stack>
             </Stack>
        </Box>
        </Stack>
        </Stack>
      {bfdets&&<Box sx={{maxHeight: 400, width: 832}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={fdets}
        columns={columns}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[10,25,50,100,500]}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
      
        disableSelectionOnClick
        components={{
          // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
          BaseCheckbox: CheckboxWrapper,
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            ids
          },
        }}
        checkboxSelection
        onSelectionModelChange={itm => {console.log(itm); watchlist(itm,fdets).then().catch(err=>console.log(err)) }}
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
      //checked={}
      {...props}
    />
  );
}