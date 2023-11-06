import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Box,
  Checkbox,
  Divider,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./styles.css";
import { fetchDetailsEst, fetchDetailsdc, fetchDetailsdyna, fetchDetailsgodaddy, fetchDetailsnc, fetchDetailsns, removeWatchlistSingle, watchlist, watchlistSingle } from "../Components/api";
import { data } from "../Components/Data";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { DataGrid, gridStringOrNumberComparator } from "@mui/x-data-grid";
//import { fetchDetailsEst, fetchDetailsdc, fetchDetailsdyna, fetchDetailsgodaddy, fetchDetailsnc, fetchDetailsns, watchlist } from './api';

const BulkFetchM = () => {
  const [output, setOutput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [plat, setPlat] = useState("Dynadot");
  const [anchorEl, setAnchorEl] = useState(null);
  const [fdets,setFdets]= React.useState([]);
  const [ids,setIds]= React.useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [psize, setPsize] = React.useState(50);

  const n=useRef(0);
  const d=useRef(0);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isTableDisplayed, setIsTableDisplayed] = useState(false);

  const handleInputChange = (event) => {
    
    setInputText(event.target.value);
  };
  
  const handleOutputClick = () => {
    const arr = inputText.trim().split("\n");
    //setIsTableDisplayed(inputLines.length > 5);
    
    //var a= arr.map((ar)=> {return ar.split(',')});
    console.log(arr);
    if(plat==='Dynadot')
     {
      fetchDetailsdyna(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
  
      n.current=Response.data.length; d.current=arr.length;
     if(Response.data.length!=0)
     {setOpen(true);setOutput(true);}
     else
     setOpen1(true);
     setIsTableDisplayed(Response.data.length > 3);
    }).catch((Response)=>{setOpen1(true);console.log(Response.error);//setBfdets(false);
    })
  }
    else if(plat==='Dropcatch')
    {
      fetchDetailsdc(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
        n.current=Response.data.length; d.current=arr.length;
        if(Response.data.length!=0)
        {setOpen(true);setOutput(true);}
        else
        {setOpen1(true);}
        setIsTableDisplayed(Response.data.length > 3);

        }).catch((Response)=>{setOpen1(true);console.log(Response.error);});
    }

    else if(plat==='Namecheap')
    {
      fetchDetailsnc(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
        n.current=Response.data.length; d.current=arr.length;
      if(Response.data.length!=0)
      {setOpen(true);setOutput(true);}
      else
      {setOpen1(true);}
      setIsTableDisplayed(Response.data.length > 3);
        }).catch((Response)=>{setOpen1(true);console.log(Response.error);});
    }
    else if(plat==='GoDaddy')
    {
      fetchDetailsgodaddy(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
        n.current=Response.data.length; d.current=arr.length;
        if(Response.data.length!=0)
        {setOpen(true);setOutput(true);}
        else
        setOpen1(true);
        setIsTableDisplayed(Response.data.length > 3);

        }).catch((Response)=>{setOpen1(true);console.log(Response.error);});
    }
    else if(plat==='Namesilo')
    {
      fetchDetailsns(arr,false).then((Response)=>{console.log(Response.data); setFdets(Response.data);
        n.current=Response.data.length; d.current=arr.length;
        if(Response.data.length!=0)
        {setOpen(true);setOutput(true);}
        else
        setOpen1(true);
        setIsTableDisplayed(Response.data.length > 3);
      }).catch((Response)=>{setOpen1(true);console.log(Response.error);});
    }
    // Update the userInput for each item in the items array
  };

  const [open, setOpen] = useState(false);
 const [open1,setOpen1]= React.useState(false);

  function Item({ item }) {
    const [checked, setChecked] = React.useState(item.watchlist);

  const handleChange = (event) => {
    setChecked(event.target.checked);
   if(event.target.checked) watchlistSingle(item.id); else removeWatchlistSingle(item.id);
  
  };

  

    return (
      <Box //className="cookieC" 
      //bgcolor={'blue'}
      //zIndex='mobileStepper'
        //onClick={toggleDrawer}
        sx={{
          display: "flex",
          flexWrap:'wrap',
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          //zIndex: "mobileStepper",
        }}
      >
        <Box className="cookieCard"  bgcolor={'red'}>
          <Stack sx={{ width:'100%'}}  direction='row' justifyContent='space-between'><Typography variant="h6">{item.domain}</Typography>
      <Checkbox
        icon={<StarBorderIcon />}
        checkedIcon={<StarIcon />}
        checked={checked}
        onChange={handleChange}
      />
   </Stack>
          <Typography variant="body2">Time: {item.time_left}</Typography>
          <Typography variant="body2">Current Bid: {item.currbid}</Typography>
          <Typography variant="body2">Target: {item.bidAmount}</Typography>
          <Typography variant="body2">EST: {item.estibot}</Typography>
        </Box>
      </Box>
    );
  }

  const renderOutputCards = () => {
    return (
      <Carousel //className='cookieC' 
     // sx={{backgroundColor:'black'}}
        className="cardContainer"
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={false}
      
      >
        {fdets.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    );
  };

  const renderOutputTable = () => {
    const timeLeftComparator = (v1, v2,param1,param2) => {return gridStringOrNumberComparator(v1.endtime,v2.endtime)};

    const columns = [
      { field: 'domain', headerName: 'Domain', width: 100},
  {field: 'time_left',
          headerName: 'Ending',
          //description: 'This column has a value getter and is not sortable.',
          //sortable: false,
          valueGetter: (params) => 
          ({
            timeleft: params.row.time_left,
            endtime: params.row.endTimeist,
          }),
          valueFormatter: (params) => 
          {
            const value = params.value;
            return value.timeleft;//.substring(value.timeleft.indexOf(" "),value.timeleft.length);
          },
          sortComparator:timeLeftComparator,
          type: 'date-time',
          width: 110,
          
        },
        {
          field: 'currbid',
          headerName: 'Price',
          type: 'number',
          width: 60,
        },
        
        {
          field:'bidAmount',
          headerName:'Target',
          type: 'number',
          width: 60
          },
        {
          field: 'estibot',
          headerName: 'EST',
          type: 'number',
          width: 60,
        }  
      
    ];
    const inputLines = inputText.trim().split("\n");
    return (
      <Box
        sx={{
          padding: "30px 0px",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
          <Box sx={{//maxHeight: window.screen.height*0.6,position: 'relative',overflow: 'auto',
         width: '100%'}} >
      <DataGrid  autoHeight 
      sx={{ ".won": {
        color:'green',
           // bgcolor: "grey",
            "&:hover": {
              color: "#62f507",
            },
          },
          ".lost": {
            color:'darkred',
               // bgcolor: "grey",
                "&:hover": {
                  color: "red",
                },
              },
          width: '100%'}}
        rows={fdets}
        columns={columns}
        pageSize={psize}
       // onRowClick={handleRowClick}
        getRowClassName={(params)=>{return params.row.scheduled?(Number(params.row.bidAmount)>Number(params.row.currbid)?"won":"lost"):"";}}
       
        /*initialState={{
            sorting: {
              sortModel: [{ field: 'endTimeist', sort: 'asc' }],
            },
          }}*/
        onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
          //Toolbar: CustomToolbar,
          // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
          BaseCheckbox: CheckboxWrapper
        }}
        checkboxSelection
        onSelectionModelChange={itm => {console.log(itm); watchlist(itm,fdets).then().catch(err=>console.log(err)) }}

      /></Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <div>
      {/*<Typography
        fontWeight="bold"
        fontSize="1.2rem"
        padding="20px 15px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Fetch
  </Typography>*/}
      <Box

        sx={{
          padding: "20px 10px 5px 15px",
        }}
      >
       
        <Select
          sx={{ alignSelf: "center" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth={true}
          value={plat}
          label="Platforms"
          onChange={(event) => {
            setPlat(event.target.value);
          }}
        >
          <MenuItem value={"Dynadot"}>Dynadot</MenuItem>
          <MenuItem value={"GoDaddy"}>GoDaddy</MenuItem>
          {//<MenuItem value={"GDCloseouts"}>GoDaddy Closeouts</MenuItem>
          }
          <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
          <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
          <MenuItem value={"Namesilo"}>Namesilo</MenuItem>
        </Select>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
        Details fetched of {n.current}/{d.current} domains!
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen1(false);}}>
        <Alert  severity="error" sx={{ width: '100%' }}>
        Failed to fetch details.
        </Alert>
      </Snackbar>
      <Divider style={{ padding: "15px" }}>
        <Typography variant="subtitle1" color="grey">
          FETCH
        </Typography>
      </Divider>
      <Box
        sx={{
          padding: "0px 10px 5px 15px",
        }}
      >
        <TextField
          multiline
          rows={5}
          variant="outlined"
          placeholder="Enter your Domain here..."
          value={inputText}
          fullWidth={true}
          onChange={handleInputChange}
          margin="normal"
        />
        <Button
          style={{
            width: "100%",
            borderRadius: "20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={handleOutputClick}
        >
          Fetch Domain
        </Button>
        {output && (
          <Box>
            {isTableDisplayed ? renderOutputTable() : renderOutputCards()}
          </Box>
        )}
      </Box>
    </div>
  );
};

function CheckboxWrapper(props) {
  return (
    <Checkbox
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
      //checked={}
      {...props}
    />
  );
}
export default BulkFetchM;
