import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
  } from "@mui/icons-material";
  import {
    Box,
    Button,
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
  
  const Sidebar1 = () => {
  
  const navigate= useNavigate();
  
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Box sx={{}}>
  
          <List >
            
              <Stack direction='column' spacing={0}>
            <ListItem color="primary" disablePadding >
             <ListItemButton  onClick={()=>navigate('/singlebid')} >
             
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <Typography fontSize={16} fontFamily='Nunito' variant='h6'>Single Bid</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/home')}  >
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <Typography fontSize={16} variant='h6'>Multiple Bid</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/currentbids')}>
                <ListItemIcon>
                <Storefront />
                </ListItemIcon>
                <Typography fontSize={16} variant='h6'>Current Bids</Typography>
  
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  
                  <Group />
                </ListItemIcon>
                <Typography fontSize={16} variant='h6'>Historic Bids</Typography>
              </ListItemButton>
            </ListItem>
            
            </Stack>
          </List>
        </Box>
      </Box>
      </ThemeProvider>
    );
  };
  
  export default Sidebar1;
  