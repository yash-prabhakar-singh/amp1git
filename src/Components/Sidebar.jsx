

import {
  AccountBox,
  Article,
  AttachMoney,
  Bolt,
  CloseFullscreen,
  CloseRounded,
  FlipToBack,
  FourK,
  GMobiledata,
  Group,
  Hiking,
  HikingSharp,
  Home,
  Key,
  Language,
  Login,
  ModeNight,
  NotificationImportant,
  OneK,
  Person,
  Report,
  ReportOff,
  ReportOutlined,
  ReportRounded,
  Settings,
  SettingsAccessibility,
  SingleBed,
  Storefront,
  ThreeK,
  TwoK,
} from "@mui/icons-material";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  createTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const theme = createTheme({
  
    typography: {
      fontFamily: [
        'Nunito',
        'Train One',
        'Roboto',
        
        
        'sans-serif',
        'cursive'
      ].join(",")
    }
    });

const Sidebar = () => {

const navigate= useNavigate();

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: { xs: "block", sm: "block" } }}>
      <Box fontSize={16} sx={{}}>

        <List  sx={{
        width: 220,
       // maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        //maxHeight: 565,
        height: 575,
        '& ul': { padding: 0 },
        '&::-webkit-scrollbar':{
          width:0,
      }
      }} disablePadding>
       
            <Stack direction='column' spacing={1}>
            
          <ListItem color="primary" disablePadding >
          <Accordion sx={{width:212}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         
         <LiveTvIcon sx={{color:'#1a1b1c'}} />
         <Typography paddingLeft={0.5}>Live</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:0}}>
          
        <List sx={{color:'text.secondary'}} >
            
            <Stack direction='column' spacing={0} paddingLeft={1}>
          <ListItem color="primary" disablePadding >
           <ListItemButton  onClick={()=>navigate('/home/live/dynadot')}>
           
             
                <SettingsAccessibility />
              
              <Typography paddingLeft={0.5} fontSize={16} fontFamily='Nunito'>Dynadot Live</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/live/namecheap')}  
            >
             
                <Key />
             
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Namecheap Live</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/live/dropcatch')}
            >
             
              <Login />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Dropcatch Live</Typography>

            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/live/godaddy')}
            >
             
              <GMobiledata />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>GoDaddy Live</Typography>

            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/live/namesilo')}
            >
             
              <Language />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Namesilo Live</Typography>

            </ListItemButton>
          </ListItem>
          
          </Stack>
        </List>
       
        </AccordionDetails>
      </Accordion>
          </ListItem>
            {/*<ListItem disablePadding>
          <Card sx={{width:212}}>
            <ListItemButton onClick={()=>navigate('/home/live')}  >
           
                <LiveTvIcon sx={{color:'#1a1b1c'}} />
                
              <Typography paddingLeft={0.5}>Live</Typography>
            </ListItemButton>
            </Card>
          </ListItem>*/}
          <ListItem disablePadding>
          <Card sx={{width:212}}>
            <ListItemButton onClick={()=>navigate('/home/bulkfetchgdv')}  >
           
                <AttachMoney sx={{color:'#1a1b1c'}} />
                
              <Typography paddingLeft={0.5}>Bulk Fetch GDV</Typography>
            </ListItemButton>
            </Card>
          </ListItem>
         
            <ListItem color="primary" disablePadding >
            <Accordion  sx={{width:212, }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
       <Bolt sx={{color:'#1a1b1c'}}/> <Typography paddingLeft={0.5}>Auctions</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:0}} >
          
        <List sx={{color:'text.secondary'}} >
            
            <Stack direction='column' spacing={0} paddingLeft={1}>
          <ListItem color="primary" disablePadding >
           <ListItemButton  onClick={()=>navigate('/home/bulkfetch')} >
           
              
                <Home />
             
              <Typography paddingLeft={0.5} fontSize={16} fontFamily='Nunito' variant='h6'>Bulk Fetch</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/bulkbid')}  >
             
                <Article />
              
              <Typography fontSize={16} paddingLeft={0.5} variant='h6'>Bulk Bid</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/biddinglist')}>
             
              <Storefront />
             
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Bidding List</Typography>

            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton onClick={()=>navigate('/home/watchlist')}>

                
                <Group />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Watch List</Typography>
            </ListItemButton>
          </ListItem>
          
          </Stack>
        </List>
       
        </AccordionDetails>
      </Accordion >
          </ListItem>
          <ListItem color="primary" disablePadding >
          <Accordion sx={{width:212}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         
         <FlipToBack fontSize='small' sx={{color:'#1a1b1c'}}/> <Typography paddingLeft={0.5}>BackOrders</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:0}}>
          
        <List sx={{color:'text.secondary'}} >
            
            <Stack direction='column' spacing={0} paddingLeft={1}>
          <ListItem color="primary" disablePadding >
           <ListItemButton  onClick={()=>navigate('/settings/preferences')}>
           
             
                <SettingsAccessibility />
              
              <Typography paddingLeft={0.5} fontSize={16} fontFamily='Nunito'>Bulk Add</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton //onClick={()=>navigate('/home')}  
            >
             
                <Key />
             
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Bulk Delete</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton //onClick={()=>navigate('/currentbids')}
            >
             
              <Login />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>View All</Typography>

            </ListItemButton>
          </ListItem>
          
          </Stack>
        </List>
       
        </AccordionDetails>
      </Accordion>
          </ListItem>
          <ListItem color="primary" disablePadding >
          <Accordion sx={{width:212}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         
         <CloseFullscreen fontSize='small' sx={{color:'#1a1b1c'}}/> <Typography paddingLeft={0.5}>CloseOuts</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:0}}>
          
        <List sx={{color:'text.secondary'}}>
            
            <Stack direction='column' spacing={0} paddingLeft={1}>
          <ListItem color="primary" disablePadding >
           <ListItemButton  onClick={()=>navigate('/home/closeouts/bulkfetch')}>
           
              
                <SettingsAccessibility />
              
              <Typography paddingLeft={0.5} fontSize={16} fontFamily='Nunito' variant='h6'>Bulk Fetch</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/closeouts/bulkbuy')}  
            >
             
                <Key />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Bulk Buy</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/closeouts/closeoutlist')}
            >
              
              <Login />
             
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Closeout List</Typography>

            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/closeouts/watchlist')}
            >
              
              <Login />
             
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Watchlist</Typography>

            </ListItemButton>
          </ListItem>
          
          </Stack>
        </List>
      
        </AccordionDetails>
      </Accordion>
          </ListItem>
          <ListItem color="primary" disablePadding >
            <Accordion  sx={{width:212, }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <ReportOutlined sx={{color:'#1a1b1c'}}/> <Typography paddingLeft={0.5}>Reports</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:0}}  >
          
        <List sx={{color:'text.secondary'}}>
            
            <Stack direction='column' spacing={0}  paddingLeft={1}  >
          <ListItem color="primary" disablePadding >
           <ListItemButton  onClick={()=>navigate('/singlebid')} >
           
              
                <Home />
              
              <Typography paddingLeft={0.5} fontSize={16} fontFamily='Nunito' variant='h6'>BackOrders Report</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/home/auctionsreport')}  >
              
                <Article />
              
              <Typography fontSize={16} paddingLeft={0.5} variant='h6'>Auctions Report</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/home/closeouts/report')}>
             
              <Storefront />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>CloseOuts Report</Typography>

            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton onClick={()=>navigate('/historicbids')}>
              
                
                <Group />
             
              <Typography fontSize={16} paddingLeft={0.5} variant='h6'>Purchase Report</Typography>
           </ListItemButton>
          </ListItem>
          
          </Stack>
        </List>
       
        </AccordionDetails>
      </Accordion >
          </ListItem>
          <ListItem color="primary" disablePadding >
          <Accordion sx={{width:212}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         
         <SettingsIcon fontSize='small' sx={{color:'#1a1b1c'}}/> <Typography paddingLeft={0.5}> Settings</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:0}}>
          
        <List sx={{color:'text.secondary'}}>
            
            <Stack direction='column' spacing={0} paddingLeft={1}>
          <ListItem color="primary" disablePadding >
           <ListItemButton  onClick={()=>navigate('/home/settings/preferences')}>
           
              
                <SettingsAccessibility />
             
              <Typography paddingLeft={0.5} fontSize={16} fontFamily='Nunito' variant='h6'>Preferences</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton //onClick={()=>navigate('/home')}  
            >
              
                <Key />
              
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Api keys</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton //onClick={()=>navigate('/currentbids')}
            >
              
              <Login />
             
              <Typography paddingLeft={0.5} fontSize={16} variant='h6'>Platform Logins</Typography>

            </ListItemButton>
          </ListItem>
          
          </Stack>
        </List>
       
        </AccordionDetails>
      </Accordion>
          </ListItem>
         
          
          
          </Stack>
        </List>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default Sidebar;
