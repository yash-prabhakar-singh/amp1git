import * as React from 'react';

import { Box, Button, Card, CardActionArea, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Switch, Tab, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import api, { sample } from './api';
import axiosInstance from './axiosInstance';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Preferences() {

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
    const [count, setCount] = useState(0);
    const {instance}=useMsal();
    const target= React.useRef();
    let clickCount = 0;
    React.useEffect(()=>{console.log(instance.getActiveAccount());sample().catch((err)=>{console.log(err)})},[]);
   /* React.useEffect(() => {
  
      //Implementing the setInterval method
      const interval =  setInterval(() => {
        target.current.click();
        setCount(count + 1);
        console.log(count)
      }, 3000);

      //Clearing the interval
      return () => clearInterval(interval);
  }, [count]);*/
  
   

  return (
   
    <Stack direction='column' //alignItems='center'  
    sx={{width:'100%'}} spacing={4}>
    <Box>
        <Typography  fontWeight='bold' color='text.primary' align='left'>Settings</Typography>
        <Box  marginTop={2} width='40vw'>
            <Stack spacing={1.5}>
            <Typography  fontWeight='bold' color='text.secondary' align='left'>Preferences :</Typography>
            <Card disableGutters sx={{backgroundColor:"", borderRadius:'16px', paddingLeft:1}}>
                <Stack spacing={1.5} paddingTop={1} paddingBottom={1}>
                 <Typography  fontWeight='bold' color='grey' align='left'>Display Preferences :</Typography>
                 <FormControl>
      <FormLabel  id="demo-row-radio-buttons-group-label" sx={{fontSize:'16',fontWeight:'bold', alignSelf:'flex-start'}}>Domains Per Page</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={50} control={<Radio />} label="50" />
        <FormControlLabel value={100} control={<Radio />} label="100" />
        <FormControlLabel value={250} control={<Radio />} label="250" />
        <FormControlLabel value={500} control={<Radio />} label="500" />
        
      </RadioGroup>
    </FormControl>
    <FormControl>
      <FormLabel  id="demo-row-radio-buttons-group-label" sx={{fontSize:'16',fontWeight:'bold', alignSelf:'flex-start'}}>Future Time Display</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel onClick={()=>console.log('a')} ref={target} value={50} control={<Radio />} label="Exact Timestamp" />
        <FormControlLabel value={100} control={<Radio/>} label="Relative Time" />
        
      </RadioGroup>
    </FormControl>
                </Stack>
            </Card>
            </Stack>
             </Box>
    </Box>
      </Stack>
   
    
  );
}
