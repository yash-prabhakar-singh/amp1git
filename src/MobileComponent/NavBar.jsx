/* eslint-disable jsx-a11y/alt-text */


 import * as React from "react";
 import AppBar from "@mui/material/AppBar";
 import Box from "@mui/material/Box";
 import Toolbar from "@mui/material/Toolbar";
 import IconButton from "@mui/material/IconButton";
 import Typography from "@mui/material/Typography";
 import Menu from "@mui/material/Menu";
 import MenuIcon from "@mui/icons-material/Menu";
 import Container from "@mui/material/Container";
 import Avatar from "@mui/material/Avatar";
 import Button from "@mui/material/Button";
 import Tooltip from "@mui/material/Tooltip";
 import MenuItem from "@mui/material/MenuItem";
 import AdbIcon from "@mui/icons-material/Adb";
 import Sidebar from "../Components/Sidebar";
 import { Grid, ImageList, ImageListItem } from "@mui/material";
 import SettingsIcon from "@mui/icons-material/Settings";
 import { BorderAll, Settings, StarRateSharp } from "@mui/icons-material";
 import { ThemeContext } from "@emotion/react";
 import { TextField } from "formik-mui";
 import { validateYupSchema } from "formik";
 import NotificationsIcon from '@mui/icons-material/Notifications';
 import MoreIcon from '@mui/icons-material/MoreVert';
 //import { isButtonElement } from "react-router-dom/dist/dom";

 const pages = ["Products", "Pricing", "Blog"];
 const settings = ["Profile", "Account", "Dashboard", "Logout"];

 function ResponsiveAppBar() {
   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleOpenNavMenu = (event) => {
     setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
     setAnchorElUser(null);
   };

   return (
     <AppBar position="fixed">
       <Container maxWidth="xl">
         <Toolbar disableGutters>
           <Typography
             variant="h6"
             noWrap
             component="a"
             href="/"
             sx={{
               mr: 2,
               display: { xs: "none", md: "flex" },
               fontFamily: "monospace",
               fontWeight: 700,
               letterSpacing: ".3rem",
               color: "inherit",
               textDecoration: "none",
             }}
           >
             LOGO
           </Typography>

           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
             <IconButton
               size="small"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleOpenNavMenu}
               color="inherit"
             >
               <Sidebar />
             </IconButton>
           </Box>
           <div>
             <img
               style={{
                 height: "40px",
                 width: "110px",
                 padding: "0.15rem",
               }}
               src={require('../Components/images/namekart.png')}
               alt="Namekart Logo"
             ></img>
           </div>
           <Typography
             variant="h5"
             noWrap
             component="a"
             href=""
             sx={{
               mr: 2,
               display: { xs: "flex", md: "none" },
              flexGrow: 1,
               fontFamily: "monospace",
               fontWeight: 700,
               letterSpacing: ".3rem",
               color: "inherit",
               textDecoration: "none",
             }}
           >
             NameKart
           </Typography>
           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
             {pages.map((page) => (
               <Button
                startIcon={<Settings />}
                 key={page}
                 onClick={handleCloseNavMenu}
                 sx={{ my: 2, color: "white", display: "block" }}
               >
                 {page}
               </Button>
            ))}
           </Box>

           <Box sx={{ flexGrow: 0 }}>
             <Tooltip title="Open settings">
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
               </IconButton>
             </Tooltip>
             <Menu
               sx={{ mt: "45px" }}
               id="menu-appbar"
               anchorEl={anchorElUser}
               anchorOrigin={{
                 vertical: "top",
                 horizontal: "right",
               }}
               keepMounted
               transformOrigin={{
                 vertical: "top",
                 horizontal: "right",
               }}
               open={Boolean(anchorElUser)}
               onClose={handleCloseUserMenu}
             >
  
             </Menu>
           </Box>
         </Toolbar>
       </Container>
     </AppBar>
   );
 }



 export default ResponsiveAppBar;









