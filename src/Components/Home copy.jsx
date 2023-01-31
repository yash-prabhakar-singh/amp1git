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
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from './api';
import Mbid from './MultipleBid';
// import { TabContext, TabList, TabPanel } from '@material-ui/core
// import useMediaQuery from '@mui/material/useMediaQuery';
// import BulkBidM from '../MobileComponent/BulkBidM';




export default function Home1() {

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

  // const isMobile = useMediaQuery('(max-width:600px)');

  const [checked, setChecked] = useState(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };


  // const Mobile=()=>{return(
  //   <BulkBidM/>
  // )}
  // <Typography>Bulk Bid is being designed</Typography>

  // if(isMobile)
  // return(<Mobile/>);


  return (
    <ThemeProvider theme={theme}><Box sx={{backgroundColor:'white', height:'100vh'}}>
      <CssBaseline/>
    <Stack direction='row' paddingTop={4.5} justifyContent='flex-start' pl={2} spacing={12} sx={{}}>
<Sidebar/>
<Box width='70vw'  paddingTop={2} sx={{
       
       // maxWidth: 360,
        //bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 570,
        
        '&::-webkit-scrollbar':{
          width:0,
      }
      }}>
    <Outlet/>
    </Box>
    </Stack>
    </Box>
    </ThemeProvider>
    
  );
}
