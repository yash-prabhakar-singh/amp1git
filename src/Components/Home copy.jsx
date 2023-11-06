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
import { alpha, AppBar, Box, Button, Card, CardActionArea, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Tab, Toolbar, Typography,Menu } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from './api';
import Mbid from './MultipleBid';
import { MenuTwoTone, NotificationImportant } from '@mui/icons-material';
import AuthService from './AuthService';
import AppBarMenu from './AppBarMenu';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



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

  const [checked, setChecked] = useState(false);

  

  return (
    <ThemeProvider theme={theme}><Box sx={{backgroundColor:'white', height:'100vh'}}>
      <CssBaseline/>
      <Stack direction="column">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" //sx={{height:50  }}
      >
        <Toolbar variant='dense' //disableGutters
        >
          {<IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            
          >
            <MenuTwoTone />
  </IconButton>}
  <Button color="inherit" ><Typography fontWeight={600} letterSpacing={3}>AMP</Typography></Button>
  <Box sx={{ flexGrow: 1 }}></Box>
  {<IconButton
            size="large"
            edge="start"
            color="secondary"
            onClick={()=>{navigate('/home/notifications')}}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <NotificationImportant />
  </IconButton>}
          {!AuthService.isLoggedIn()&&<Button onClick={()=>{navigate('/login')}} color="inherit">Login</Button>}
          {AuthService.isLoggedIn()&&<Button onClick={()=>{AuthService.logout(); navigate('/login')}} color="inherit">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
    {AuthService.isLoggedIn()&&<AppBarMenu/>}
    <Stack direction='row' paddingTop={4.5} justifyContent='center' pl={0} spacing={12} sx={{}}>
{//<Sidebar/>
}

<Box width='80vw'  paddingTop={2} sx={{
       
       // maxWidth: 360,
        //bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        //maxHeight: 570,
        
        '&::-webkit-scrollbar':{
          width:0,
      }
      }}>
    <Outlet/>
    </Box>
    </Stack>
    </Stack>
    </Box>
    </ThemeProvider>
    
  );
}
