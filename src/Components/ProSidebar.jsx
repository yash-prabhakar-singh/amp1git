
import { Box, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Navigate, useNavigate } from "react-router-dom";


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
    });

export default function Proside(){

const navigate= useNavigate();

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <ProSidebarProvider>
    <Sidebar>
  <Menu>
    <SubMenu label="Charts">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</Sidebar>
</ProSidebarProvider>
    </Box>
    </ThemeProvider>)}