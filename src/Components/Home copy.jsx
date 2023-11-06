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
import { alpha, Box, Button, Card, CardActionArea, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Tab, Toolbar, Typography,Menu, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from './api';
import Mbid from './MultipleBid';
import { Bolt, Build, CurrencyExchange, Dvr, FormatListBulleted, Gavel, Info, Key, Login, MenuTwoTone, NotificationImportant, QueryStats, Schedule, Settings, ShoppingCart, StarBorder, SwitchAccount, Tune, VerifiedUser } from '@mui/icons-material';
import AuthService from './AuthService';
import AppBarMenu from './AppBarMenu';
import { msalInstance } from '..';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { canAdmin, canAuction, canBackOrder, canBid, canCloseOut, canLive, canLiveDC, canLiveDD, canLiveGD, canLiveNC, canLiveNS, canReport, canReports, canWatch } from './msalService';

//import { TabContext, TabList, TabPanel } from '@mui/lab';

const drawerWidth = 240;

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    //sx={{ pointerEvents: 'none'}}
    //useLayerForClickAway={false}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
 // pointerEvents:'auto',
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1.5),
  minHeight:48,
  // necessary for content to be below app bar
  //...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function Home1() {

  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000',
        //main: '#3CA6E1',
      },
      secondary: {
        main: '#edf2ff',
        //main: '#e1763c',
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
    const { instance,accounts} = useMsal();
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

  const isAuthenticated = useIsAuthenticated();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setNestedOpen1(false);setNestedOpen2(false);setNestedOpen3(false);setNestedOpen4(false);setNestedOpen5(false);setNestedOpen6(false);
  };

  const [nestedOpen1, setNestedOpen1] = useState(false);

  const toggleNestedMenu1 = () => {
    if(!open)
    setOpen(true);
    setNestedOpen1(!nestedOpen1);
  };

  const [nestedOpen2, setNestedOpen2] = useState(false);

  const toggleNestedMenu2 = () => {
    if(!open)
    setOpen(true);
    setNestedOpen2(!nestedOpen2);
  };

  const [nestedOpen3, setNestedOpen3] = useState(false);

  const toggleNestedMenu3 = () => {
    if(!open)
    setOpen(true);
    setNestedOpen3(!nestedOpen3);
  };

  const [nestedOpen4, setNestedOpen4] = useState(false);

  const toggleNestedMenu4 = () => {
    if(!open)
    setOpen(true);
    setNestedOpen4(!nestedOpen4);
  };

  const [nestedOpen5, setNestedOpen5] = useState(false);

  const toggleNestedMenu5 = () => {
    if(!open)
    setOpen(true);
    setNestedOpen5(!nestedOpen5);
  };

  const [nestedOpen6, setNestedOpen6] = useState(false);

  const toggleNestedMenu6 = () => {
    if(!open)
    setOpen(true);
    setNestedOpen6(!nestedOpen6);
  };

  const [anchorEl4, setAnchorEl4] = React.useState(null);
//const open = Boolean(anchorEl);
const[open4,setOpen4]=React.useState(false);
const handleClick4 = (event) => {
  setAnchorEl4(event.currentTarget);
  setOpen4(true);
  
};
const handleClose4 = () => {
  setAnchorEl4(null);
  setOpen4(false);
  
};
  return (
    <ThemeProvider theme={theme}><Box sx={{backgroundColor:'white', maxHeight:'100vh'}}>
      <CssBaseline/>
      <Stack direction="column">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}//sx={{height:50  }}
      >
        <Toolbar variant='dense' //disableGutters
        >
          {<IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
            
          >
            <MenuTwoTone />
  </IconButton>}
  <Button color="secondary" ><Typography fontWeight={600} letterSpacing={3}>AMP</Typography></Button>
  <Box sx={{ flexGrow: 1 }}></Box>
  
  {canAdmin()&&<IconButton
        size="large"
        edge="start"
        color="secondary"
        aria-label="menu"
        id="demo-customized-button"
        aria-controls={open4 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open4 ? 'true' : undefined}
        sx={{ mr: 2 }}
        onClick={handleClick4}
        
        //onMouseOver={handleClick4}
        //onMouseLeave={handleClose4}
      >
      <Settings/>
      </IconButton>}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button', 
        }}
        //MenuListProps={{ onMouseLeave: handleClose }}
        anchorEl={anchorEl4}
        open={open4}
        onClose={handleClose4}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={()=>{navigate('/home/settings/preferences');handleClose4();}} disableRipple>
         <SwitchAccount/>
          Preferences
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/settings/live');handleClose4();}} disableRipple>
         <Tune/>
          Live Filters
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/settings/apikeys');
        handleClose4();}} disableRipple>
          <Key/>
          Api Keys
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem disabled onClick={()=>{//navigate('/home/biddinglist')
        ;handleClose4();}} disableRipple>
          <Login/>
          Platforms Login
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/users')
        ;handleClose4();}} disableRipple>
          <VerifiedUser/>
          Manage Users
        </MenuItem>
    
      </StyledMenu>
      
      {canReports()&&<IconButton
            size="large"
            edge="start"
            color="secondary"
            onClick={()=>{navigate('/home/notifications')}}
            aria-label="menu"
            sx={{ mr: 2 }}
            
          >
            <NotificationImportant />
  </IconButton>}
          {
           !isAuthenticated&&<Button onClick={()=>{navigate('/login')}} color="secondary">Login</Button>}
          {isAuthenticated&&<Button onClick={()=>{ if (accounts.length > 0) {
      const account = accounts[0]; // Assuming you want to log out the first logged-in account if multiple accounts are present
      instance.logoutRedirect({ account });
    }}} color="secondary">Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
    {isAuthenticated&& <Drawer PaperProps={{sx:{'&::-webkit-scrollbar': {
    width: '6px', // Set the desired width for the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888', // Set the color of the scrollbar thumb
    borderRadius: '6px', // Set the border radius of the scrollbar thumb
  },}}} variant="permanent" open={open}>
     
        <DrawerHeader >
          <Typography ml={4} fontWeight='bold'>Auction-Hacker</Typography>
          <IconButton   onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
       
        <Divider />
        <List>
            {canAuction()&&<ListItem key={'auction'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={toggleNestedMenu1}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Gavel/>
                </ListItemIcon>
                <ListItemText primary='Auction' sx={{ opacity: open ? 1 : 0 }} />{open&&(nestedOpen1 ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>}
            {nestedOpen1 && (
            <List  sx={{ marginLeft: '50px',alignItems:'flex-end' }}>
              {canWatch&&<ListItem key={"Bulk Fetch"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/bulkfetch')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Info/>
                </ListItemIcon>
                <ListItemText primary='Bulk Fetch' />
              </ListItemButton>
            </ListItem>}

           {canBid()&&<ListItem key={"Bulk Bid"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/bulkbid')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Gavel/>
                </ListItemIcon>
                <ListItemText primary='Bulk Bid' />
              </ListItemButton>
            </ListItem>}<ListItem key={"Bidding List"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/biddinglist')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Schedule/>
                </ListItemIcon>
                <ListItemText primary='Bidding List' />
              </ListItemButton>
            </ListItem><ListItem key={"Watchlist"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/watchlist')}}

                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <StarBorder/>
                </ListItemIcon>
                <ListItemText primary='Watchlist' />
              </ListItemButton>
            </ListItem>
              {/* Add more nested items here */}
            </List>
          )}
          {canBackOrder()&&<ListItem key={'backorders'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={toggleNestedMenu2}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart/>
                </ListItemIcon>
                <ListItemText primary='BackOrders' sx={{ opacity: open ? 1 : 0 }} />{open&&(nestedOpen2 ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>}
            {nestedOpen2 && (
            <List  sx={{ marginLeft: '50px',alignItems:'flex-end' }}>
              <ListItem key={"Bulk Fetch"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right' disabled
               onClick={()=>{navigate('/home/bulkfetchbo')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Info/>
                </ListItemIcon>
                <ListItemText primary='Bulk Fetch' />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Bulk Order"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/bulkorders')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Gavel/>
                </ListItemIcon>
                <ListItemText primary='Bulk Order' />
              </ListItemButton>
            </ListItem><ListItem key={"Bidding List"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right' disabled
              onClick={()=>{navigate('/home/biddinglist')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Schedule/>
                </ListItemIcon>
                <ListItemText primary='Bidding List' />
              </ListItemButton>
            </ListItem><ListItem key={"Watchlist"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right' disabled
               onClick={()=>{navigate('/home/watchlist')}}

                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <StarBorder/>
                </ListItemIcon>
                <ListItemText primary='Watchlist' />
              </ListItemButton>
            </ListItem>
              {/* Add more nested items here */}
            </List>
          )}

{canCloseOut()&&<ListItem key={'closeouts'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={toggleNestedMenu3}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CurrencyExchange/>
                </ListItemIcon>
                <ListItemText primary='CloseOuts' sx={{ opacity: open ? 1 : 0 }} />{open&&(nestedOpen3 ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>}
            {nestedOpen3 && (
            <List  sx={{ marginLeft: '50px',alignItems:'flex-end' }}>
              <ListItem key={"Bulk Fetch"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/closeouts/bulkfetch')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Info/>
                </ListItemIcon>
                <ListItemText primary='Bulk Fetch' />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Bulk Buy"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/closeouts/bulkbuy')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart/>
                </ListItemIcon>
                <ListItemText primary='Bulk Buy' />
              </ListItemButton>
            </ListItem><ListItem key={"Closeouts List"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/closeouts/closeoutlist')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <FormatListBulleted/>
                </ListItemIcon>
                <ListItemText primary='Closeouts List' />
              </ListItemButton>
            </ListItem><ListItem key={"Watchlist"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/closeouts/watchlist')}}

                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <StarBorder/>
                </ListItemIcon>
                <ListItemText primary='Watchlist' />
              </ListItemButton>
            </ListItem>
              {/* Add more nested items here */}
            </List>
          )}
          
        </List>
        <Divider />
        <List>
        {canLive()&&<ListItem key={'Live'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={toggleNestedMenu5}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Bolt/>
                </ListItemIcon>
                <ListItemText primary='Live' sx={{ opacity: open ? 1 : 0 }} />{open&&(nestedOpen5 ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>}
            {nestedOpen5 && (
            <List  sx={{ marginLeft: '50px',alignItems:'flex-end' }}>
              {canLiveDD()&&<ListItem key={"Dynadot"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/live/dynadot')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Gavel/>
                </ListItemIcon>
                <ListItemText primary='Dynadot' />
              </ListItemButton>
            </ListItem>}
            {canLiveDC()&&<ListItem key={"Dropcatch"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/live/dropcatch')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart/>
                </ListItemIcon>
                <ListItemText primary='Dropcatch' />
              </ListItemButton>
            </ListItem>}
            {canLiveNC()&&<ListItem key={"Namecheap"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/live/namecheap')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <FormatListBulleted/>
                </ListItemIcon>
                <ListItemText primary='Namecheap' />
              </ListItemButton>
            </ListItem>}
            {canLiveNS()&&<ListItem key={"Namesilo"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/live/namesilo')}}

                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <StarBorder/>
                </ListItemIcon>
                <ListItemText primary='Namesilo' />
              </ListItemButton>
            </ListItem>}
            {canLiveGD()&&<ListItem key={"GoDaddy"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/live/godaddy')}}

                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <StarBorder/>
                </ListItemIcon>
                <ListItemText primary='GoDaddy' />
              </ListItemButton>
            </ListItem>}
              {/* Add more nested items here */}
            </List>
          )}
        <ListItem key={'Tools'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={toggleNestedMenu6}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Build/>
                </ListItemIcon>
                <ListItemText primary='Tools' sx={{ opacity: open ? 1 : 0 }} />{open&&(nestedOpen6 ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>
            {nestedOpen6 && (
            <List  sx={{ marginLeft: '50px',alignItems:'flex-end' }}>
              <ListItem key={"Bulk EST"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/tools/est')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Gavel/>
                </ListItemIcon>
                <ListItemText primary='Bulk EST' />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Bulk Stats"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/tools/stats')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <QueryStats/>
                </ListItemIcon>
                <ListItemText primary='Bulk Stats' />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Bulk GDV"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right' disabled
              onClick={()=>{navigate('/home/tools/gdv')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart/>
                </ListItemIcon>
                <ListItemText primary='Bulk GDV' />
              </ListItemButton>
            </ListItem>
              {/* Add more nested items here */}
            </List>
          )}
          </List>
          <Divider/>
          <List>
          {canReports()&&<ListItem key={'reports'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={toggleNestedMenu4}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Dvr/>
                </ListItemIcon>
                <ListItemText primary='Reports' sx={{ opacity: open ? 1 : 0 }} />{open&&(nestedOpen4 ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItemButton>
            </ListItem>}
            {nestedOpen4 && (
            <List  sx={{ marginLeft: '50px',alignItems:'flex-end' }}>
              <ListItem key={"Auctions Report"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
               onClick={()=>{navigate('/home/auctionsreport')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <Gavel/>
                </ListItemIcon>
                <ListItemText primary='Auctions' />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Backorder"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right' disabled
              onClick={()=>{navigate('/home/auctionsreport')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart/>
                </ListItemIcon>
                <ListItemText primary='BackOrders' />
              </ListItemButton>
            </ListItem><ListItem key={"Closeouts Report"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right'
              onClick={()=>{navigate('/home/closeouts/report')}}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <FormatListBulleted/>
                </ListItemIcon>
                <ListItemText primary='Closeouts' />
              </ListItemButton>
            </ListItem><ListItem key={"Purchase Report"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton alignItems='right' disabled
               onClick={()=>{navigate('/home/closeouts/report')}}

                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr:2,
                    justifyContent: 'center',
                  }}
                >
                  <StarBorder/>
                </ListItemIcon>
                <ListItemText primary='Purchase' />
              </ListItemButton>
            </ListItem>
              {/* Add more nested items here */}
            </List>
          )}
          </List>
      </Drawer>}
    <Stack direction='row'   paddingTop={4.5} justifyContent='center' pl={0} spacing={12} sx={{marginLeft: open? `${drawerWidth}px`:`calc(${theme.spacing(7)} + 1px)`}}>
{//<Sidebar/>
}

<Box width='100%' marginInline={5} paddingTop={3} sx={{
       
       // maxWidth: 360,
        //bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        //maxHeight: 570,
       // backgroundColor:'red',
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
