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
import { Autocomplete, Box, Button, Card, CardActionArea, CssBaseline, Divider, FormControl, FormControlLabel, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Stack, Switch, Tab, Tooltip, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DTable from './ScheduledTable';
import RTable from './RTable';
import { useEffect } from 'react';
import  { getnotifs, getnotifsnew } from './api';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { date } from 'yup';
import { DesktopDatePicker } from '@mui/x-date-pickers';
//import { TabContext, TabList, TabPanel } from '@mui/lab';



export default function Notifications() {

  let [rows,setRows]= React.useState([]);
  let [rowsf,setRowsf]= React.useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [date1, setDate1] = React.useState(dayjs(new Date()));
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [imp, setImp] = React.useState(true);
  const [val, setVal] = React.useState("");
 useEffect(()=>{getnotifsnew(date.format('DD-MM-YYYY'),date1.format('DD-MM-YYYY'),date.utcOffset(),imp).then((response)=>{setRows(response.data);setRowsf(response.data)}).catch(err=>console.log(err))},[imp,date,date1]);
useEffect(()=>{setRowsf(rows.filter((row)=>{if(selectedPlatform==="All")
{if(row.message.toLowerCase().includes(val.toLowerCase()))
return row;}
else
{{if(row.message.toLowerCase().includes(val.toLowerCase())&&row.platform===selectedPlatform)
  return row;}}
}))},[selectedPlatform,val,rows]);
 
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
 

    const options = [
      { label: 'Won', id: 1 },
      { label: 'Lost', id: 2 },
      { label: 'Outbid', id: 3 },
      { label: 'Closeout', id: 4 },
    ];

    const handlePlatformChange = (event) => {
      setSelectedPlatform(event.target.value);
    };

  return (
   
    <Stack direction='column' alignItems='flex-start'  minHeight={350}  sx={{width:'100%'}} spacing={2.5} marginTop={2}>
    <Stack direction='row' sx={{}} alignItems='center' width='100%'><Typography  fontWeight='bold' color='primary.main' align='left'>Notifications</Typography>
    <Box sx={{flexGrow:1}}/>
    <FormControl  sx={{width:150,//backgroundColor:'red'
    display:'flex',flexDirection:'row',justifyContent:'end',mt:1
  }}>
          
          <Select //fullWidth 
          sx={{
            '& legend': { display: 'none' },
    '& fieldset': { top: 0 }, 
    color:'text.primary',fontWeight:'600',  padding: "0px 0px 0px 0px !important", paddingLeft:-2,marginRight:2//backgroundColor:'blue'
  }}
            labelId="platform-select-label"
            id="platform-select"
            value={selectedPlatform}
            label="Platform"
            onChange={handlePlatformChange}
            size='small'
          >
            <MenuItem  value="All">All</MenuItem>
            <MenuItem value="Namecheap">Namecheap</MenuItem>
            <MenuItem value="Dynadot">Dynadot</MenuItem>
            <MenuItem value="Dropcatch">Dropcatch</MenuItem>
            <MenuItem value="Namesilo">Namesilo</MenuItem>
            <MenuItem value="GoDaddy">GoDaddy</MenuItem>
          </Select>
        </FormControl> <Autocomplete
      disablePortal
      id="combo-box-demo"
      freeSolo
      options={options}
      sx={{ width: 300,marginRight:2,marginTop:1 }}
      size='small'
      
      onChange={(event,value)=>{if(value==null) setVal(""); else if (typeof value === 'string')setVal(value); else setVal(value.label);}}
      renderInput={(params) => <TextField  {...params} label="Search" />}
    />
  
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer    components={['DatePicker','DatePicker']}> */}
      <DesktopDatePicker 
        slotProps={{ textField: { size: 'small' } }}
        sx={{
        color:'text.primary',fontWeight:'600',  padding: "0px 0px 0px 0px !important",width:200}}
          label="From"
          value={date}
          onChange={(newValue) => {const updatedDate = new Date();
            newValue=newValue.set('h',updatedDate.getHours());
            newValue=newValue.set('m',updatedDate.getMinutes());
            setDate(newValue);}}
        />
        <DesktopDatePicker
        inputProps={{ size: 'small' }}
        slotProps={{ textField: { size: 'small' } }}
        sx={{
        color:'text.primary',fontWeight:'600',  padding: "0px 0px 0px 0px !important",width:200}}
          label="To"
          value={date1}
          onChange={(newValue) => {const updatedDate = new Date();
            newValue=newValue.set('h',updatedDate.getHours());
            newValue=newValue.set('m',updatedDate.getMinutes());setDate1(newValue);}}
        />
         {/* </DemoContainer> */}
    </LocalizationProvider>
    <Tooltip title={imp?"Important":"All"}>
        <FormControlLabel sx={{marginLeft:2,marginRight:0}} control={<Switch
      sx={{}}
      size='small'
                    checked={imp}
                    onChange={() =>{setImp(!imp)}}/>} />
                    </Tooltip>
        </Stack>
    <Box sx={{width:'100%'}}>
      
      <List sx={{
        width: '100%',
        //maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        //overflow: 'auto',
        //maxHeight: 500,
        '& ul': { padding: 0 },
      }} disablePadding>
        { rowsf.map((row)=>(
          <React.Fragment>
            <Card variant='outlined' sx={{marginY:1, paddingLeft:1}}>
        <ListItem disableGutters>
          <ListItemText secondary={row.message}/>
           
          
        </ListItem>
        </Card>
       
        </React.Fragment>
))}
        </List>
        
    </Box>
      </Stack>
    
  );
}
