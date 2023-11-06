import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Grid,
  Box,
  Pagination,
  PaginationItem,
  Tab,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DataGrid, gridStringOrNumberComparator } from "@mui/x-data-grid";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { data } from "../Components/Data";
import { Delete, Gavel } from "@mui/icons-material";
import { cancelBidDc, cancelBidDd, cancelBidGd, cancelBidNc, cancelBidNs, getscheduledcloseouts, getwatchlist, removeWatchlist, schedulebiddcsingle, schedulebiddynasingle, schedulebidgdsingle, schedulebidncsingle, schedulebidnssingle } from "../Components/api";
import { canBidDC, canBidDD, canBidGD, canBidNC, canBidNS } from "../Components/msalService";

const initialData = [
  {
    platform: "Platform A",
    domain: "Domain X",
    timeleft: "0d 23hr 22m",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform B",
    domain: "Domain X",
    timeleft: "59 min",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform C",
    domain: "Domain X",
    timeleft: "0d 11hr",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform D",
    domain: "Domain X",
    timeleft: "0d 23hr 22m",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform E",
    domain: "Domain X",
    timeleft: "59 min",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform F",
    domain: "Domain X",
    timeleft: "0d 11hr",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  // Add more mock data here
];

const WatchlistM = () => {
  //const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(-1);
  const [page, setPage] = useState(1); // Current page state
  let [psize,setPsize]= React.useState(10);
  let [psize1,setPsize1]= React.useState(10);
  let[idds, setIdds]= React.useState([]);
  //const [open,setOpen]=useState(false);
  const [change,setchange]=React.useState(false);
  let [rows,setRows]= React.useState([]);
  let [rows1,setRows1]= React.useState([]);

  const [open1,setOpen1]=useState(false);
  const [open2, setOpen2] = React.useState(false);
  const res= React.useRef("");
  const itemsPerPage = 5; // Number of items to display per page
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const timeLeftComparator = (v1, v2,param1,param2) => {return gridStringOrNumberComparator(v1.endtime,v2.endtime)};
  useEffect(()=>{getwatchlist().then((response)=>{setRows(response.data); console.log(response.data);}).catch((error)=>console.log(error))
},[change])
React.useEffect(()=>{getscheduledcloseouts().then((response)=>{setRows1(response.data);}).catch((Error)=>console.log(Error))},[]);

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
          return value.timeleft.substring(value.timeleft.indexOf(" "),value.timeleft.length);
        },
        sortComparator:timeLeftComparator,
        type: 'date-time',
        width: 80,
        
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
      },    { field: 'platform', headerName: 'Pl', width: 30,valueGetter: (params)=>{const plat=params.row.platform; if(plat==='GoDaddy') return 'GD'; else if(plat==='Namecheap') return 'NC';if(plat==='Namesilo') return 'NS';if(plat==='Dynadot') return 'DD';if(plat==='Dropcatch') return 'DC';}},

    
  ];
  const columns1 = [
    { field: 'domain', headerName: 'Domain', width: 100 },
    {
      field: 'timeLeft',
      headerName: 'Ending',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type: 'date-time',
      width: 80,
      
    },
    {
      field: 'currPrice',
      headerName: 'Price',
      type: 'number',
      width: 60,
    },
    {
      field: 'ourPrice',
      headerName: 'Our Price',
      type: 'number',
      width: 110,
    },
   
    {
      field: 'gdv',
      headerName: 'GDV',
      type: 'number',
      width: 60,
    },
    
    { field: 'auctype', headerName: 'Type', width: 100 },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };
  const MaxBid=(props)=>{
    const [mb,setMb]=React.useState(props.scheduled?props.bidAmount:props.currbid);
    const handleChange = (event) => {
      setMb(event.target.value);
    };
    const disabledc=()=>{if((props.platform=="Dynadot"&&canBidDD())||(props.platform=="Dropcatch"&&canBidDC())||
(props.platform=="Namecheap"&&canBidNC())||(props.platform=="GoDaddy"&&canBidGD())||
(props.platform=="Namesilo"&&canBidNS())){ return false;}
else return true;}
const disabled=()=>{if(mb>props.currbid) return false; else return true;}
    return(<Stack direction='row' spacing={2}><IconButton size='small'  sx={{ padding:0, marginRight:-1, color:'black'}} onClick={()=>{if(!props.scheduled)removeWatchlist([props.id]);else
    {
      if(props.platform=="Dynadot")
      {cancelBidDd(props.domain,props.auctionId).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
    else if(props.platform=="Dropcatch")
    {cancelBidDc(props.domain,props.auctionId).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
  
    else if(props.platform=='GoDaddy')
    {cancelBidGd(props.domain).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
    else if(props.platform=="Namecheap")
    {cancelBidNc(props.domain,props.ncid).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
    else if(props.platform=="Namesilo")
    {cancelBidNs(props.domain,props.auctionId).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
    }setchange(!change);}}><Delete sx={{paddingRight:0}} /></IconButton>
    <Divider orientation="vertical" flexItem/><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} /><IconButton size='small' disabled={disabled()}
     onClick={()=>{console.log(mb);
    if(props.platform=="Dynadot")
    {schedulebiddynasingle(props.domain,props.auctionId,mb.toString()).then((response)=>{if(response.data==0){
      res.current="Bid scheduled for "+props.domain+" at max price "+mb;
      setOpen2(true);
    }
  else if(response.data>2){
    res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
    setOpen2(true); 
  }
  else{
    res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
    setOpen2(true); 
  }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
  setOpen1(true);})}
    else if(props.platform=="Dropcatch")
    {schedulebiddcsingle(props.domain,props.auctionId,mb).then((response)=>{if(response.data==0){
      res.current="Bid scheduled for "+props.domain+" at max price "+mb;
      setOpen2(true);
    }
  else if(response.data>2){
    res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
    setOpen2(true); 
  }
  else{
    res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
    setOpen2(true); 
  }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
  setOpen1(true);})}
    else if(props.platform=='GoDaddy')
    {schedulebidgdsingle(props.domain,props.domain,mb.toString()).then((response)=>{if(response.data==0){
      res.current="Bid scheduled for "+props.domain+" at max price "+mb;
      setOpen2(true);
    }
  else if(response.data>2){
    res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
    setOpen2(true); 
  }
  else{
    res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
    setOpen2(true); 
  }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
  setOpen1(true);})}
    else if(props.platform=="Namecheap")
    {schedulebidncsingle(props.domain,props.ncid,mb).then((response)=>{if(response.data==0){
      res.current="Bid scheduled for "+props.domain+" at max price "+mb;
      setOpen2(true);
    }
  else if(response.data>2){
    res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
    setOpen2(true); 
  }
  else{
    res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
    setOpen2(true); 
  }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
  setOpen1(true);})}
    else if(props.platform=="Namesilo")
    {schedulebidnssingle(props.auctionId,props.domain,mb).then((response)=>{if(response.data==0){
      res.current="Bid scheduled for "+props.domain+" at max price "+mb;
      setOpen1(true);
    }
  else if(response.data>2){
    res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
    setOpen1(true); 
  }
  else{
    res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
    setOpen2(true); 
  }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
  setOpen1(true);})}}}  
    sx={
      {
      "&.Mui-disabled": {
        color: "grey"
      },color:'green'
    }
  } ><Gavel/></IconButton></Stack>);
  }  
  const handleMaxPriceChange = (event, index) => {
    const newData = [...data];
    newData[index].ourMaxPrice = event.target.value;
    //setData(newData);
  };

  const [bidI,setBidI] = React.useState({}); 
  const [value, setValue] = React.useState("1"); 
  const handleChange = (event, newValue) => { 
    setValue(newValue); 
  }; 
  const handleRowClick = (params) => {
    setBidI(params.row)
    handleClickOpen()
   // setMessage(`Movie "${params.row.title}" clicked`);
  };
  return (
    <Box>
      <Typography
        fontWeight="bold"
        fontSize="1.3rem"
        padding="20px 0px 0px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Watchlists
      </Typography>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Actions</DialogTitle>
        <DialogContent>
          <MaxBid id={bidI.id} currbid={Number(bidI.currbid)} bidAmount={Number(bidI.bidAmount)} scheduled={bidI.scheduled} domain={bidI.domain} auctionId={bidI.auctionId} ncid={bidI.ncid} platform={bidI.platform} />
        </DialogContent>
        {/*<DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>*/}
      </Dialog>
      <Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen2(false);}}>
        <Alert onClose={()=>{setOpen2(false);}} severity="info" sx={{ width: '100%' }}>
          {res.current}
        </Alert>
      </Snackbar>
      <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
        <Alert onClose={()=>{setOpen1(false);}} severity="error" sx={{ width: '100%' }}>
        {res.current}
        </Alert>
      </Snackbar>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box
            sx={{
              padding: "10px 10px",
            }}
          >
             <TabContext value={value}> 
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}> 
              <TabList onChange={handleChange} variant="fullWidth"> 
                <Tab label="Auctions" value="1" /> 
                <Tab label="Closeouts" value="2" /> 
              </TabList> 
            </Box> 
            <TabPanel value="1" sx={{padding:0,margin:0}}> 
            <Box sx={{maxHeight: window.screen.height*0.6,
             position: 'relative',
             overflow: 'auto',
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
        rows={rows}
        columns={columns}
        pageSize={psize}
        onRowClick={handleRowClick}
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
          //BaseCheckbox: CheckboxWrapper
        }}
        //checkboxSelection
        onSelectionModelChange={(itm) => {console.log(idds); itm= setIdds(itm); }}

      /></Box></TabPanel> 
            <TabPanel value="2" sx={{padding:0,margin:0}}><Box sx={{maxHeight: window.screen.height*0.6,
             position: 'relative',
             overflow: 'auto',
         width: '100%'}} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rows1}
        columns={columns1}
        pageSize={psize1}
        initialState={{
          sorting: {
            sortModel: [{ field: 'endTimeist', sort: 'asc' }],
          },
        }}
        onPageSizeChange={(newPageSize) => setPsize1(newPageSize)}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
         // BaseCheckbox: CheckboxWrapper
        }}
        //checkboxSelection
        onSelectionModelChange={(itm) => {console.log(idds); itm= setIdds(itm); }}

      /></Box></TabPanel>  
          </TabContext> 
            
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

function CheckboxWrapper(props) {
  return (
    <Checkbox
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
      {...props}
    />
  );
}
export default WatchlistM;


/*<TableContainer sx={{padding:0,margin:0}} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Platform
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Domain
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Time-Left
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Target
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      GDC Reports
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5",
                      }}
                    >
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.platform}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.domain}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.timeleft}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.price}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.target}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          style={{
                            color: row.result === "Lost" ? "red" : "green",
                          }}
                        >
                          {row.gdcreports}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex ",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                count={10}
                page={page}
                onChange={handleChangePage}
                renderItem={(item) => (
                  <PaginationItem
                    component={Box}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#3E338F",
                        color: "white",
                        width: "auto",
                      },
                    }}
                    {...item}
                  />
                )}
                nextIcon={<ArrowForwardIosRoundedIcon />}
                prevIcon={<ArrowBackIosNewRoundedIcon />}
              />
            </Box> */