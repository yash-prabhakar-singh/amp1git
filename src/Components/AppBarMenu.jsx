import * as React from 'react';
import { alpha, AppBar, Box, Button, ButtonGroup, createTheme, CssBaseline, Divider, Menu, MenuItem, Stack, styled, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormatListBulleted, Gavel, Info, Key, Login, Schedule, Settings, ShoppingCart, StarBorder } from '@mui/icons-material';

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
          sx={{ pointerEvents: 'none'}}
          //useLayerForClickAway={false}
          {...props}
        />
      ))(({ theme }) => ({
        '& .MuiPaper-root': {
          borderRadius: 6,
          marginTop: theme.spacing(1),
          minWidth: 180,
          pointerEvents:'auto',
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
 const AppBarMenu = () => {

const navigate= useNavigate();
const [anchorEl, setAnchorEl] = React.useState(null);
//const open = Boolean(anchorEl);
const[open,setOpen]=React.useState(false);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  setOpen(true);
  
};
const handleClose = () => {
  setAnchorEl(null);
  setOpen(false);
  
};
const [anchorEl5, setAnchorEl5] = React.useState(null);
//const open = Boolean(anchorEl);
const[open5,setOpen5]=React.useState(false);
const handleClick5 = (event) => {
  setAnchorEl5(event.currentTarget);
  setOpen5(true);
  
};
const handleClose5 = () => {
  setAnchorEl5(null);
  setOpen5(false);
  
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

const [anchorEl3, setAnchorEl3] = React.useState(null);
//const open = Boolean(anchorEl);
const[open3,setOpen3]=React.useState(false);
const handleClick3 = (event) => {
  setAnchorEl3(event.currentTarget);
  setOpen3(true);
  
};
const handleClose3 = () => {
  setAnchorEl3(null);
  setOpen3(false);
  
};

const [anchorEl2, setAnchorEl2] = React.useState(null);
//const open = Boolean(anchorEl);
const[open2,setOpen2]=React.useState(false);
const handleClick2 = (event) => {
  setAnchorEl2(event.currentTarget);
  setOpen2(true);
  
};
const handleClose2 = () => {
  setAnchorEl2(null);
  setOpen2(false);
  
};
const [anchorEl1, setAnchorEl1] = React.useState(null);
//const open = Boolean(anchorEl);
const[open1,setOpen1]=React.useState(false);
const handleClick1 = (event) => {
  setAnchorEl1(event.currentTarget);
  setOpen1(true);
  
};
const handleClose1 = () => {
  setAnchorEl1(null);
  setOpen1(false);
  
};

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#aaadab'}} elevation={0} //sx={{height:50  }}
      >
        <Toolbar variant='dense'  sx={{display:'flex', flexDirection:'row', justifyContent:'center'}} //disableGutters 
        >
           
            
           <ButtonGroup variant="text" color='secondary'  >
            <div onMouseOver={handleClick}
        onMouseLeave={handleClose}>
            
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        //sx={{fontWeight:500}}
        disableElevation
        color='secondary'
        onClick={handleClick}
        //onMouseOver={handleClick}
        //onMouseLeave={handleClose}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography fontWeight='bold'>Auctions</Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button', //onMouseEnter: handleClick,
        
        }}
        //MenuListProps={{ onMouseLeave: handleClose }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        <MenuItem sx={{pointerEvents:'auto'}}
         onClick={()=>{navigate('/home/bulkfetch');handleClose();}} disableRipple>
         <Info></Info>
          Bulk Fetch
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/bulkbid');handleClose();}} disableRipple>
          <Gavel/>
          Bulk Bid
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/biddinglist');handleClose();}} disableRipple>
          <Schedule/>
          Bidding List
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/watchlist');handleClose();}} disableRipple>
            <StarBorder/>
          Watchlist
        </MenuItem>
      </StyledMenu>
      </div>
      <div onMouseOver={handleClick5}
        onMouseLeave={handleClose5}>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        //sx={{fontWeight:500}}
        disableElevation
        onClick={handleClick5}
       //onMouseOver={handleClick}
        //onMouseLeave={handleClose}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography fontWeight='bold'>BackOrders</Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button', //onMouseEnter: handleClick,
           
        }}
        //MenuListProps={{ onMouseLeave: handleClose }}
        anchorEl={anchorEl5}
        open={open5}
        onClose={handleClose5}
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
        <MenuItem sx={{pointerEvents:'auto'}}
         onClick={()=>{navigate('/home/bulkfetch');handleClose5();}} disableRipple>
         <Info></Info>
          Bulk Fetch
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/bulkbid');handleClose5();}} disableRipple>
          <Gavel/>
          Bulk Bid
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/biddinglist');handleClose5();}} disableRipple>
          <Schedule/>
          Bidding List
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/watchlist');handleClose5();}} disableRipple>
            <StarBorder/>
          Watchlist
        </MenuItem>
      </StyledMenu>
      </div>
      <div onMouseOver={handleClick1}
        onMouseLeave={handleClose1}>
      <Button
        id="demo-customized-button"
        aria-controls={open1 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open1 ? 'true' : undefined}
        variant="text"
        //sx={{fontWeight:500}}
        disableElevation
        onClick={handleClick1}
        //onMouseOver={handleClick1}
        //onMouseLeave={handleClose1}
        endIcon={<KeyboardArrowDownIcon />}
      >
        
        <Typography fontWeight='bold'>Closeouts</Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button', 
        }}
        //MenuListProps={{ onMouseLeave: handleClose }}
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
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
        <MenuItem onClick={()=>{navigate('/home/closeouts/bulkfetch');handleClose1();}} disableRipple>
         <Info></Info>
          Bulk Fetch
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/closeouts/bulkbuy');handleClose1();}} disableRipple>
          <ShoppingCart/>
          Bulk Buy
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/closeouts/closeoutlist');handleClose1();}} disableRipple>
          <FormatListBulleted/>
          Closeouts List
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/closeouts/watchlist');handleClose1();}} disableRipple>
            <StarBorder/>
          Watchlist
        </MenuItem>
      </StyledMenu>
      </div>
      <div onMouseOver={handleClick2}
        onMouseLeave={handleClose2}>
      <Button
        id="demo-customized-button"
        aria-controls={open2 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        variant="text"
        //sx={{fontWeight:500}}
        disableElevation
        onClick={handleClick2}
       // onMouseOver={handleClick2}
       // onMouseLeave={handleClose2}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography fontWeight='bold'>Reports</Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button', 
        }}
        //MenuListProps={{ onMouseLeave: handleClose }}
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
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
        <MenuItem onClick={()=>{navigate('/home/auctionsreport');handleClose2();}} disableRipple>
         <Info></Info>
          BackOrder Report
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/auctionsreport');handleClose2();}} disableRipple>
          <Gavel/>
          Auctions' Report
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/closeouts/report');handleClose2();}} disableRipple>
          <Schedule/>
          Closeouts' Report
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/auctionsreport');handleClose2();}} disableRipple>
            <StarBorder/>
          Purchase Report
        </MenuItem>
      </StyledMenu>
      </div>
      <div onMouseOver={handleClick3}
        onMouseLeave={handleClose3}>
      <Button
        id="demo-customized-button"
        aria-controls={open2 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        variant="text"
        //sx={{fontWeight:500}}
        disableElevation
        onClick={handleClick3}
        //onMouseOver={handleClick3}
        //onMouseLeave={handleClose3}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography fontWeight='bold'>Live</Typography>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button', 
        }}
        //MenuListProps={{ onMouseLeave: handleClose }}
        anchorEl={anchorEl3}
        open={open3}
        onClose={handleClose3}
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
        <MenuItem onClick={()=>{navigate('/home/live/dynadot');handleClose3();}} disableRipple>
         <Info></Info>
          Dynadot
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/live/namecheap');handleClose3();}} disableRipple>
          <Gavel/>
          Namecheap
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/live/namesilo');handleClose3();}} disableRipple>
          <Schedule/>
          Namesilo
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/live/dropcatch');handleClose3();}} disableRipple>
            <StarBorder/>
          Dropcatch
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{navigate('/home/live/godaddy');handleClose3();}} disableRipple>
            <StarBorder/>
          GoDaddy
        </MenuItem>
      </StyledMenu>
      </div>
      <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        //sx={{fontWeight:500}}
        disableElevation
        onClick={()=>navigate('/home/bulkfetchgdv')}
       // onMouseOver={handleClick}
       // onMouseLeave={handleClose}
       // endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography fontWeight='bold'>Bulk GDV</Typography>
      </Button>
      </div>
      <div onMouseOver={handleClick4}
        onMouseLeave={handleClose4}>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        //sx={{fontWeight:500}}
        disableElevation
        onClick={handleClick4}
        //onMouseOver={handleClick4}
        //onMouseLeave={handleClose4}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography fontWeight='bold'>Settings</Typography>
      </Button>
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
        <MenuItem onClick={()=>{navigate('/home/setting/preferences');handleClose4();}} disableRipple>
         <Settings/>
          Preferences
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{//navigate('/home/setting/');
        handleClose4();}} disableRipple>
          <Key/>
          Api Keys
        </MenuItem>
        <Divider sx={{ my: 0 }} />
        <MenuItem onClick={()=>{//navigate('/home/biddinglist')
        ;handleClose4();}} disableRipple>
          <Login/>
          Platforms Login
        </MenuItem>
    
      </StyledMenu>
      </div>
      </ButtonGroup>
      
      
      
     
      
     
            </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>);}

    export default AppBarMenu;