//import { createTheme } from "@mui/material";
import Sidebar from './Sidebar';
import { Alert, Box, Button, Card, CardActionArea, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, Stack, Switch, Tab, TextField, Typography,Tabs,Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import DTable from './ScheduledTable';
import ScheduledTable from './ScheduledTable';
import PlacedTable from './PlacedTable';
import * as React from 'react';
// import { useEffect } from 'react';
//import api from './api';
import { DataGrid, GridToolbar,GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, gridStringOrNumberComparator } from '@mui/x-data-grid';
import { Delete, Gavel } from '@mui/icons-material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { color } from '@mui/system';
import { getwatchlist, removeWatchlist, schedulebiddcsingle, schedulebiddynasingle, schedulebidgdsingle, schedulebidncsingle, schedulebidnssingle } from './api';
import { canBidDC, canBidDD, canBidGD, canBidNC, canBidNS } from './msalService';
import { useMemo, useState, useEffect, useRef } from 'react';
import { MaterialReactTable,useMaterialReactTable } from 'material-react-table';
import CommonFilters from './CommonFilters';
import DateTimeFilters from './DateTimeFilters';


// export default function WatchList() {
//   function CustomToolbar(props) {
//     const ids=props.ids
//     return (
//       <GridToolbarContainer sx={{ display:'flex',flexDirection:'row-reverse'}} >
//         <GridToolbarColumnsButton />
//         <GridToolbarFilterButton />
//         <GridToolbarDensitySelector />
//         <GridToolbarExport />
//       </GridToolbarContainer>
//     );
//   }
//   const timeLeftComparator = (v1, v2,param1,param2) => {return gridStringOrNumberComparator(v1.endtime,v2.endtime)};

//   const MaxBid=(props)=>{
//     const [mb,setMb]=React.useState(props.currbid);
//     const handleChange = (event) => {
//       setMb(event.target.value);
//     };
//     const disabledc=()=>{if((props.platform=="Dynadot"&&canBidDD())||(props.platform=="Dropcatch"&&canBidDC())||
// (props.platform=="Namecheap"&&canBidNC())||(props.platform=="GoDaddy"&&canBidGD())||
// (props.platform=="Namesilo"&&canBidNS())){ return false;}
// else return true;}
// const disabled=()=>{if(!disabledc()){if(mb>props.currbid) return false; else return true;}
// else return true;}
//     return(<Stack direction='row' spacing={2}><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} /><IconButton size='small' disabled={disabled()} onClick={()=>{if(props.platform=="Dynadot")
//     {schedulebiddynasingle(props.domain,props.auctionId,mb.toString()).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=="Dropcatch")
//     {schedulebiddcsingle(props.domain,props.auctionId,mb).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=='GoDaddy')
//     {schedulebidgdsingle(props.domain,props.domain,mb.toString()).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=="Namecheap")
//     {schedulebidncsingle(props.domain,props.ncid,mb).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen2(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen2(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})}
//     else if(props.platform=="Namesilo")
//     {schedulebidnssingle(props.auctionId,props.domain,mb).then((response)=>{if(response.data==0){
//       res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//       setOpen1(true);
//     }
//   else if(response.data>2){
//     res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//     setOpen1(true); 
//   }
//   else{
//     res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//     setOpen2(true); 
//   }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//   setOpen1(true);})} }}  sx={{
//       "&.Mui-disabled": {
//         color: "grey"
//       },color:'green'
//     }} ><Gavel/></IconButton></Stack>);
//   }  
//     let [rows,setRows]= React.useState([]);
//     const [open1,setOpen1]=React.useState(false);
//   const [open2, setOpen2] = React.useState(false);
//   const res= React.useRef("");
//   const [change,setchange]=React.useState(false);

//     let [psize,setPsize]= React.useState(50);
//     let[idds, setIdds]= React.useState([]);
//   useEffect(()=>{getwatchlist().then((response)=>{setRows(response.data); console.log(response.data);}).catch((error)=>console.log(error))},[change])
//   const columns = [
//     { field: 'platform', headerName: 'Platform', width: 100 },
//     { field: 'domain', headerName: 'Domain', width: 210
// },
//       {
//         field: 'time_left',
//         headerName: 'Time Left',
//         //description: 'This column has a value getter and is not sortable.',
//         //sortable: false,
//         valueGetter: (params) => ({
//           timeleft: params.row.time_left,
//           endtime: params.row.endTimeist,
//         }),
//         valueFormatter: (params) => {
//           const value = params.value;
//           return value.timeleft;
//         },
//         sortComparator:timeLeftComparator,
//         type: 'date-time',
//         width: 120,
        
//       },
//       {
//         field: 'currbid',
//         headerName: 'Current Bid',
//         type: 'number',
//         width: 100,
//       },
      
     
//       {
//         field: 'bidders',
//         headerName: 'Bidders',
//         type: 'number',
//         width: 70,
//       },
     
//       {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 50,
//         //valueGetter: ()=>{return '4 mins'}
//       },
//       {
//         field: 'estibot',
//         headerName: 'EST',
//         type: 'number',
//         width: 70,
//         //valueGetter: ()=>{return '4 mins'}
//       },
//       {
//         field: 'gdv',
//         headerName: 'GDV',
//         type: 'number',
//         width: 70,
//       },
//       { field: 'auctiontype', headerName: 'Auction Type', width: 110 },
//       ,
      
//       {
//         field:'maxbid',
//         headerName:'Our Max Bid',
//         renderCell: (params)=><MaxBid currbid={Number(params.row.currbid)} domain={params.row.domain} auctionId={params.row.auctionId} ncid={params.row.ncid} platform={params.row.platform} />,
//       width:170}
//     ,
//       {
//         field: 'extensions_taken',
//         headerName: 'Extns',
//         type: 'number',
//         width: 50,
//       },
//       {
//         field: 'keyword_exact_lsv',
//         headerName: 'LSV',
//         type: 'number',
//         width: 60,
//       },
//       {
//         field: 'keyword_exact_cpc',
//         headerName: 'CPC',
//         type: 'number',
//         width: 60,
//       },
//       {
//         field: 'whois_registrar',
//         headerName: 'Registrar',
//         width: 130,
//       },
//       {
//         field: 'end_users_buyers',
//         headerName: 'EUB',
//         type: 'number',
//         width: 60,
//       },
//       {
//         field: 'wayback_age',
//         headerName: 'ABY',
//         type: 'number',
//         width: 60,
//       }
//   ];
  
//     const theme = createTheme({
//       palette: {
//         primary: {
//           main: '#000',
//         },
//         secondary: {
//           main: '#edf2ff',
//         },
//       },
//       typography: {
//         fontFamily: [
//           'Nunito',
//           'Train One',
//           'Roboto',
          
          
//           'sans-serif',
//           'cursive'
//         ].join(",")
      
//       }
//       }
//       );
  
      
  
//     return (
//     <Stack direction='row' justifyContent='center' sx={{width:'100%'}}>
//       <Stack direction='column' alignItems='flex-start'  spacing={2.5} sx={{width:'100%'}}>
//       <Stack direction='row' spacing={1}>
//       <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
//             Watchlist
//         </Typography>
//         <Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen2(false);}}>
//         <Alert onClose={()=>{setOpen2(false);}} severity="info" sx={{ width: '100%' }}>
//           {res.current}
//         </Alert>
//       </Snackbar>
//       <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
//         <Alert onClose={()=>{setOpen1(false);}} severity="error" sx={{ width: '100%' }}>
//         {res.current}
//         </Alert>
//       </Snackbar>
//         {(idds.length!=0)&&<IconButton size='small' color='primary' sx={{ padding:0}} onClick={()=>{removeWatchlist(idds).then(setchange(!change));}}><Delete fontSize='small'/></IconButton>}
//         </Stack>
//       <Box sx={{//maxHeight: 400,
//          width:'100%' //1022
//          }} >
//       <DataGrid autoHeight sx={{ ".highlight": {
//         color:'darkred',
//            // bgcolor: "grey",
//             "&:hover": {
//               color: "red",
//             },
//           },
//           width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         getRowClassName={(params)=>{return params.row.track?"highlight":"";}}
       
//         /*initialState={{
//             sorting: {
//               sortModel: [{ field: 'endTimeist', sort: 'asc' }],
//             },
//           }}*/
//         onPageSizeChange={(newPageSize) => setPsize(newPageSize)}
//         rowsPerPageOptions={[10,25,50,100,500]}
//         disableSelectionOnClick
//         components={{
//           Toolbar: CustomToolbar,
//           // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
//           BaseCheckbox: CheckboxWrapper
//         }}
//         checkboxSelection
//         onSelectionModelChange={(itm) => {console.log(idds); itm= setIdds(itm); }}

//       /></Box>
//         </Stack>
//         </Stack>
      
//     );
//   }



  
  // function CheckboxWrapper(props) {
  //   return (
  //     <Checkbox
  //       icon={<StarBorderIcon />}
  //       checkedIcon={<StarIcon />}
  //       {...props}
  //     />
  //   );
  // }



  export default function WatchList() {
    const [rows, setRows] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const res = useRef("");
    const [change, setChange] = useState(false);
    const [psize, setPsize] = useState(50);
    const [idds, setIdds] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [filters, setFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [disabledFilters, setDisabledFilters] = useState({});
    const [originalRows, setOriginalRows] = useState([]); 
  
    useEffect(() => {
      getwatchlist()
        .then((response) => {
          setRows(response.data);
          setOriginalRows(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }, [change]);

    const columns = useMemo(() => [
      { accessorKey: 'platform', header: 'Platform', size: 100 },
      { accessorKey: 'domain', header: 'Domain', size: 210 },
      {
        accessorKey: 'time_left',
        header: 'Time Left',
        size: 120,
        Cell: ({ cell }) => cell.getValue().timeleft,
        sortingFn: 'datetime',
      },
      { accessorKey: 'currbid', header: 'Current Bid', size: 100, type: 'number' },
      { accessorKey: 'bidders', header: 'Bidders', size: 70, type: 'number' },
      { accessorKey: 'age', header: 'Age', size: 50, type: 'number' },
      { accessorKey: 'estibot', header: 'EST', size: 70, type: 'number' },
      { accessorKey: 'gdv', header: 'GDV', size: 70, type: 'number' },
      { accessorKey: 'auctiontype', header: 'Auction Type', size: 110 },
      {
        accessorKey: 'maxbid',
        header: 'Our Max Bid',
        size: 170,
        Cell: ({ cell }) => (
          <MaxBid
            currbid={Number(cell.row.original.currbid)}
            domain={cell.row.original.domain}
            auctionId={cell.row.original.auctionId}
            ncid={cell.row.original.ncid}
            platform={cell.row.original.platform}
          />
        ),
      },
      { accessorKey: 'extensions_taken', header: 'Extns', size: 50, type: 'number' },
      { accessorKey: 'keyword_exact_lsv', header: 'LSV', size: 60, type: 'number' },
      { accessorKey: 'keyword_exact_cpc', header: 'CPC', size: 60, type: 'number' },
      { accessorKey: 'whois_registrar', header: 'Registrar', size: 130 },
      { accessorKey: 'end_users_buyers', header: 'EUB', size: 60, type: 'number' },
      { accessorKey: 'wayback_age', header: 'ABY', size: 60, type: 'number' },
    ], []);


    useEffect(() => {
      const initialFilters = columns.reduce((acc, col) => {
        acc[col.accessorKey] = '';
        if (col.accessorKey.includes('Price') || col.accessorKey.includes('estibot') || col.accessorKey.includes('gdv') || col.accessorKey.includes('currbid') || col.accessorKey.includes('maxbid') || col.accessorKey.includes('keyword_exact_lsv') || col.accessorKey.includes('keyword_exact_cpc') || col.accessorKey.includes('whois_registrar') || col.accessorKey.includes('end_users_buyers') || col.accessorKey.includes('wayback_age')) {
          acc[`${col.accessorKey}Min`] = '';
          acc[`${col.accessorKey}Max`] = '';
        }
        return acc;
      }, {});
      // Add domain-specific filters
      initialFilters.allowlistStartsWith = '';
      initialFilters.allowlistContains = '';
      initialFilters.allowlistEndsWith = '';
      initialFilters.blocklistStartsNotWith = '';
      initialFilters.blocklistContainsNot = '';
      initialFilters.blocklistEndsNotWith = '';
      initialFilters.domainNameContains = '';
      initialFilters.vowelsMin = '';
      initialFilters.vowelsMax = '';
      initialFilters.charactersMin = '';
      initialFilters.charactersMax = '';
      initialFilters.platform = '';
      initialFilters.auctiontype = ''; // Add auctionType filter
      // Add date/time filters
      initialFilters.runningEndDate = '';
      initialFilters.runningNamedEnding = '';
      initialFilters.runningEndsInDaysMin = '';
      initialFilters.runningEndsInDaysMax = '';
      initialFilters.completedEndDate = '';
      initialFilters.completedNamedEnding = '';
      initialFilters.completedEndsInDaysMin = '';
      initialFilters.completedEndsInDaysMax = '';
      initialFilters.whois_registrarContains = '';
      initialFilters.whois_registrarContainsNot = '';
      setFilters(initialFilters);
  
      const disabled = {
        auctiontype: !columns.some(col => col.accessorKey === 'auctiontype'),
        currPriceMin: !columns.some(col => col.accessorKey === 'currPrice'),
        currPriceMax: !columns.some(col => col.accessorKey === 'currPrice'),
        ourPriceMin: !columns.some(col => col.accessorKey === 'ourPrice'),
        ourPriceMax: !columns.some(col => col.accessorKey === 'ourPrice'),
        status: !columns.some(col => col.accessorKey === 'status'),
        bidMin: !columns.some(col => col.accessorKey === 'bid'),
        bidMax: !columns.some(col => col.accessorKey === 'bid'),
        gdvMin: !columns.some(col => col.accessorKey === 'gdv'),
        gdvMax: !columns.some(col => col.accessorKey === 'gdv'),
        estMin: !columns.some(col => col.accessorKey === 'estibot'),
        estMax: !columns.some(col => col.accessorKey === 'estibot'),
        eubMin: !columns.some(col => col.accessorKey === 'eub'),
        eubMax: !columns.some(col => col.accessorKey === 'eub'),
        abyMin: !columns.some(col => col.accessorKey === 'aby'),
        abyMax: !columns.some(col => col.accessorKey === 'aby'),
        lsvMin: !columns.some(col => col.accessorKey === 'lsv'),
        lsvMax: !columns.some(col => col.accessorKey === 'lsv'),
        cpcMin: !columns.some(col => col.accessorKey === 'cpc'),
        cpcMax: !columns.some(col => col.accessorKey === 'cpc'),
        endTimeist: !columns.some(col => col.accessorKey === 'endTimeist'),
        currbidMin: !columns.some(col => col.accessorKey === 'currbid'),
        currbidMax: !columns.some(col => col.accessorKey === 'currbid'),
        maxbidMin: !columns.some(col => col.accessorKey === 'maxbid'),
        maxbidMax: !columns.some(col => col.accessorKey === 'maxbid'),
        whois_registrarContains: !columns.some(col => col.accessorKey === 'whois_registrar'),
        whois_registrarContainsNot: !columns.some(col => col.accessorKey === 'whois_registrar'),
        extns: !columns.some(col => col.accessorKey === 'extns'),
        
        // Add other filters as needed
      };
      setDisabledFilters(disabled);
    }, [columns]);

    const handleFilterChange = (event) => {
      const { name, value, type, checked } = event.target;
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: type === 'checkbox' ? checked : value,
      }));
      console.log('Updated filters:', { ...filters, [name]: type === 'checkbox' ? checked : value }); // Debugging filter changes
    };

    const applyFilters = () => {
      console.log('Applying filters:', filters);
      console.log('Original rows:', originalRows); // Debugging original rows
  
      const filteredRows = originalRows.filter(row => {
        const allowlistStartsWithMatch = filters.allowlistStartsWith === '' || row.domain.toLowerCase().startsWith(filters.allowlistStartsWith.toLowerCase().trim());
        const allowlistContainsMatch = filters.allowlistContains === '' || row.domain.toLowerCase().includes(filters.allowlistContains.toLowerCase().trim());
        const allowlistEndsWithMatch = filters.allowlistEndsWith === '' || row.domain.toLowerCase().endsWith(filters.allowlistEndsWith.toLowerCase().trim());
        const blocklistStartsNotWithMatch = filters.blocklistStartsNotWith === '' || !row.domain.toLowerCase().startsWith(filters.blocklistStartsNotWith.toLowerCase().trim());
        const blocklistContainsNotMatch = filters.blocklistContainsNot === '' || !row.domain.toLowerCase().includes(filters.blocklistContainsNot.toLowerCase().trim());
        const blocklistEndsNotWithMatch = filters.blocklistEndsNotWith === '' || !row.domain.toLowerCase().endsWith(filters.blocklistEndsNotWith.toLowerCase().trim());
        const domainNameContainsMatch = filters.domainNameContains === '' || row.domain.toLowerCase().includes(filters.domainNameContains.toLowerCase().trim());
        const vowelsMinMatch = filters.vowelsMin === '' || (row.domain.match(/[aeiou]/gi) || []).length >= filters.vowelsMin;
        const vowelsMaxMatch = filters.vowelsMax === '' || (row.domain.match(/[aeiou]/gi) || []).length <= filters.vowelsMax;
        const charactersMinMatch = filters.charactersMin === '' || row.domain.length >= filters.charactersMin;
        const charactersMaxMatch = filters.charactersMax === '' || row.domain.length <= filters.charactersMax;
        const platformMatch = filters.platform === '' || row.platform.toLowerCase().includes(filters.platform.toLowerCase().trim());
        const auctiontypeMatch = filters.auctiontype === '' || row.auctiontype.toLowerCase() === filters.auctiontype.toLowerCase().trim();
        console.log("row.currbid",typeof(row.currbid))
        console.log("row.maxbid",typeof(row.bidAmount))
        const currPrice = parseFloat(row.currbid.replace(/[^0-9.-]+/g, ""));
        const estibot = row.estibot;
        const gdv = row.gdv;
        const maxbid = parseFloat(row.bidAmount.replace(/[^0-9.-]+/g, ""));
        const lsv = row.keyword_exact_lsv;
        const cpc = row.keyword_exact_cpc;
        const eub = row.end_users_buyers;
        const aby = row.wayback_age;
  
        // const ourpriceMinMatch = filters.ourPriceMin === '' || ourPrice >= parseFloat(filters.ourPriceMin);
        // const ourpriceMaxMatch = filters.ourPriceMax === '' || ourPrice <= parseFloat(filters.ourPriceMax);
        const currpriceMinMatch = filters.currbidMin === '' || currPrice >= parseFloat(filters.currbidMin);
        const currpriceMaxMatch = filters.currbidMax === '' || currPrice <= parseFloat(filters.currbidMax);
        const estibotMinMatch = filters.estibotMin === '' || estibot >= parseFloat(filters.estibotMin);
        const estibotMaxMatch = filters.estibotMax === '' || estibot <= parseFloat(filters.estibotMax);
        const gdvMinMatch = filters.gdvMin === '' || gdv >= parseFloat(filters.gdvMin);
        const gdvMaxMatch = filters.gdvMax === '' || gdv <= parseFloat(filters.gdvMax);
        const maxbidMinMatch = filters.maxbidMin === '' || maxbid >= parseFloat(filters.maxbidMin);
        const maxbidMaxMatch = filters.maxbidMax === '' || maxbid <= parseFloat(filters.maxbidMax);
        const lsvMinMatch = filters.keyword_exact_lsvMin === '' || lsv >= parseFloat(filters.keyword_exact_lsvMin);
        const lsvMaxMatch = filters.keyword_exact_lsvMax === '' || lsv <= parseFloat(filters.keyword_exact_lsvMax);
        const cpcMinMatch = filters.keyword_exact_cpcMin === '' || cpc >= parseFloat(filters.keyword_exact_cpcMin);
        const cpcMaxMatch = filters.keyword_exact_cpcMax === '' || cpc <= parseFloat(filters.keyword_exact_cpcMax);
        const eubMinMatch = filters.end_users_buyersMin === '' || eub >= parseFloat(filters.end_users_buyersMin);
        const eubMaxMatch = filters.end_users_buyersMax === '' || eub <= parseFloat(filters.end_users_buyersMax);
        const abyMinMatch = filters.wayback_ageMin === '' || aby >= parseFloat(filters.wayback_ageMin);
        const abyMaxMatch = filters.wayback_ageMax === '' || aby <= parseFloat(filters.wayback_ageMax);
  
        const runningEndDateMatch = filters.runningEndDate === '' || row.runningEndDate === filters.runningEndDate;
        const runningNamedEndingMatch = filters.runningNamedEnding === '' || row.runningNamedEnding === filters.runningNamedEnding;
        const runningEndsInDaysMinMatch = filters.runningEndsInDaysMin === '' || row.runningEndsInDays >= filters.runningEndsInDaysMin;
        const runningEndsInDaysMaxMatch = filters.runningEndsInDaysMax === '' || row.runningEndsInDays <= filters.runningEndsInDaysMax;
        const completedEndDateMatch = filters.completedEndDate === '' || row.completedEndDate === filters.completedEndDate;
        const completedNamedEndingMatch = filters.completedNamedEnding === '' || row.completedNamedEnding === filters.completedNamedEnding;
        const completedEndsInDaysMinMatch = filters.completedEndsInDaysMin === '' || row.completedEndsInDays >= filters.completedEndsInDaysMin;
        const completedEndsInDaysMaxMatch = filters.completedEndsInDaysMax === '' || row.completedEndsInDays <= filters.completedEndsInDaysMax;
  
        const matches = {
          allowlistStartsWithMatch,
          allowlistContainsMatch,
          allowlistEndsWithMatch,
          blocklistStartsNotWithMatch,
          blocklistContainsNotMatch,
          blocklistEndsNotWithMatch,
          domainNameContainsMatch,
          vowelsMinMatch,
          vowelsMaxMatch,
          charactersMinMatch,
          charactersMaxMatch,
          platformMatch,
          auctiontypeMatch,
          // ourpriceMinMatch,
          // ourpriceMaxMatch,
          currpriceMinMatch,
          currpriceMaxMatch,
          estibotMinMatch,
          estibotMaxMatch,
          gdvMinMatch,
          gdvMaxMatch,
          maxbidMinMatch,
          maxbidMaxMatch,
          lsvMinMatch,
          lsvMaxMatch,
          cpcMinMatch,
          cpcMaxMatch,
          eubMinMatch,
          eubMaxMatch,
          abyMinMatch,
          abyMaxMatch,
          runningEndDateMatch,
          runningNamedEndingMatch,
          runningEndsInDaysMinMatch,
          runningEndsInDaysMaxMatch,
          completedEndDateMatch,
          completedNamedEndingMatch,
          completedEndsInDaysMinMatch,
          completedEndsInDaysMaxMatch
        };
  
        console.log('Row:', row);
        console.log('Matches:', matches);
  
        return Object.values(matches).every(Boolean);
      });
  
      console.log('Filtered rows:', filteredRows); // Debugging filtered rows
      setRows(filteredRows);
    };

    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
    };


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
  
    const table = useMaterialReactTable({
      columns: columns,
      data: rows,
      initialState: {
        pagination: { pageSize: psize },
        sorting: [{ id: 'endTimeist', desc: true }],
      },
      muiTablePaperProps:{
        sx: { width: '100%' },
      },
      muiTableHeadCellProps: {
        sx: {
          color: theme.palette.common.grey,
        },
      },
      muiTablePaginationProps: {
        rowsPerPageOptions: [10, 25, 50, 100, 500],
        onPageSizeChange: (newPageSize) => setPsize(newPageSize),
      },
      enableRowSelection: true,
      enableMultiRowSelection: true,
      getRowId: (row) => row.id, // Assuming each row has a unique 'id' field
      onRowSelectionChange: setRowSelection,
      state: { rowSelection },
      muiSelectCheckboxProps: {
        icon: <StarBorderIcon />,
        checkedIcon: <StarIcon />,
      },
      muiTableHeadCellCheckboxProps: {
        icon: <StarBorderIcon />,
        checkedIcon: <StarIcon />,
      },
    }); 

    

  //   return (
  //     <ThemeProvider theme={theme}>
  //       <Stack direction='row' justifyContent='center' sx={{ width: '100%' }}>
  //         <Stack direction='column' alignItems='flex-start' spacing={2.5} sx={{ width: '100%' }}>
  //           <Stack direction='row' spacing={1}>
  //             <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
  //               Watchlist
  //             </Typography>
  //             <Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => { setOpen2(false); }}>
  //               <Alert onClose={() => { setOpen2(false); }} severity="info" sx={{ width: '100%' }}>
  //                 {res.current}
  //               </Alert>
  //             </Snackbar>
  //             <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={() => { setOpen1(false); }}>
  //               <Alert onClose={() => { setOpen1(false); }} severity="error" sx={{ width: '100%' }}>
  //                 {res.current}
  //               </Alert>
  //             </Snackbar>
  //             {(Object.keys(rowSelection).length !== 0) && (
  //               <IconButton size='small' color='primary' sx={{ padding: 0 }} onClick={() => { removeWatchlist(Object.keys(rowSelection)) }}>
  //                 <Delete fontSize='small' />
  //               </IconButton>
  //             )}
  //           </Stack>
  //         <Box sx={{ width: '100%' }}>
  //           <MaterialReactTable
  //             table={table}
  //           />
  //         </Box>
  //       </Stack>
  //     </Stack>
  //   </ThemeProvider>
  // );


  return (
    <ThemeProvider theme={theme}>
      <Stack direction='column' alignItems='flex-start' sx={{ width: '100%' }} spacing={3}>
        <Box sx={{ width: '100%', paddingLeft: 2, paddingTop: 2 }}>
          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Typography variant="h4" gutterBottom>Watchlist</Typography>
            <Button onClick={() => setShowFilters(!showFilters)} sx={{ marginBottom: 2 }}>
              {showFilters ? 'Hide Filters' : 'Apply Filter'}
            </Button>
          </Stack>
        </Box>
        {showFilters && (
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="filter tabs">
              <Tab label="Common" />
              <Tab label="Additional" />
              <Tab label="Date/Time" />
            </Tabs>
            <Box sx={{ padding: 2 }}>
              {selectedTab === 0 && (
                <CommonFilters filters={filters} 
                  setFilters={setFilters} 
                  handleFilterChange={handleFilterChange}
                />
              )}
              {selectedTab === 1 && (
                <AdditionalFilters filters={filters} 
                  handleFilterChange={handleFilterChange}
                  disabledFilters={disabledFilters}
                />
              )}
              {selectedTab === 2 && (
                <DateTimeFilters filters={filters} 
                  handleFilterChange={handleFilterChange}
                />
              )}
            </Box>
            <Button onClick={applyFilters} sx={{ marginTop: 2 }}>Apply Filters</Button>
          </Paper>
        )}
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ minWidth: 910 }}>
            <Stack direction='row' justifyContent='center' sx={{ width: '100%' }}>
              <Stack direction='column' alignItems='flex-start' spacing={2.5} sx={{ width: '100%' }}>
                <Stack direction='row' spacing={1}>
                  {/* <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
                    Watchlist
                  </Typography> */}
                  <Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={() => { setOpen2(false); }}>
                    <Alert onClose={() => { setOpen2(false); }} severity="info" sx={{ width: '100%' }}>
                      {res.current}
                    </Alert>
                  </Snackbar>
                  <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={() => { setOpen1(false); }}>
                    <Alert onClose={() => { setOpen1(false); }} severity="error" sx={{ width: '100%' }}>
                      {res.current}
                    </Alert>
                  </Snackbar>
                  {(Object.keys(rowSelection).length !== 0) && (
                    <IconButton size='small' color='primary' sx={{ padding: 0 }} onClick={() => { removeWatchlist(Object.keys(rowSelection)) }}>
                      <Delete fontSize='small' />
                    </IconButton>
                  )}
                  </Stack>
                <Box sx={{ width: '100%' }}>
                  <MaterialReactTable
                    table={table}
                  />
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}


const AdditionalFilters = ({ filters, handleFilterChange, disabledFilters}) => {
  const boxStyle = {
    flex: 1,
    marginBottom: 2,
    border: '1px solid #5A5A5A',
    padding: 2,
    borderWidth: 2,
    borderRadius: 2,
    height: 'auto', // Adjust height to auto to fit content
  };

  // const [isStatusDisabled, setIsStatusDisabled] = React.useState(false);
  // const [isAuctionTypeDisabled, setIsAuctionTypeDisabled] = React.useState(false);
  // const [isCurrentPriceDisabled, setIsCurrentPriceDisabled] = React.useState(false);
  // const [isOurPriceDisabled, setIsOurPriceDisabled] = React.useState(false);  
  // const [isHighBidDisabled, setIsHighBidDisabled] = React.useState(false);  
  // const [isOurMaxBidDisabled, setIsOurMaxBidDisabled] = React.useState(false);
  // const [isGDVDisabled, setIsGDVDisabled] = React.useState(false);
  // const [isESTDisabled, setIsESTDisabled] = React.useState(false);
  // const [isEUBDisabled, setIsEUBDisabled] = React.useState(false);
  // const [isABYDisabled, setIsABYDisabled] = React.useState(false);
  // const [isLSVDisabled, setIsLSVDisabled] = React.useState(false);
  // const [isCPCDisabled, setIsCPCDisabled] = React.useState(false);
  // const [isRegistrarDisabled, setIsRegistrarDisabled] = React.useState(false);
  // const [isExtnsDisabled, setIsExtnsDisabled] = React.useState(false);

  // React.useEffect(() => {
  //   setIsStatusDisabled(!filterColumns?.includes('status'));
  //   setIsAuctionTypeDisabled(!filterColumns?.includes('auctionType'));
  //   setIsCurrentPriceDisabled(!filterColumns?.includes('currPrice'));
  //   setIsOurPriceDisabled(!filterColumns?.includes('ourPrice'));
  //   setIsHighBidDisabled(!filterColumns?.includes('highBid'));
  //   setIsOurMaxBidDisabled(!filterColumns?.includes('bidAmount'));
  //   setIsGDVDisabled(!filterColumns?.includes('gdv'));
  //   setIsESTDisabled(!filterColumns?.includes('estibot'));
  //   setIsEUBDisabled(!filterColumns?.includes('end_users_buyers'));
  //   setIsABYDisabled(!filterColumns?.includes('wayback_age'));
  //   setIsLSVDisabled(!filterColumns?.includes('keyword_exact_lsv'));
  //   setIsCPCDisabled(!filterColumns?.includes('keyword_exact_cpc'));
  //   setIsRegistrarDisabled(!filterColumns?.includes('whois_registrar'));
  //   setIsExtnsDisabled(!filterColumns?.includes('extensions_taken'));
  // }, [filterColumns]);

  // React.useEffect(() => {
  //   console.log('filterColumns', filterColumns);
  // }, [filterColumns]);

  // const disabledStates = {
  //   'Current price': isCurrentPriceDisabled,
  //   'Our price': isOurPriceDisabled,
  //   'High bid': isHighBidDisabled,
  //   'Our max bid': isOurMaxBidDisabled,
  //   'GDV': isGDVDisabled,
  //   'EST': isESTDisabled,
  //   'EUB': isEUBDisabled,
  //   'ABY': isABYDisabled,
  //   'LSV': isLSVDisabled,
  //   'CPC': isCPCDisabled,
  // };

  return (
    <Box sx={{ padding: 3, border: '3px solid #636363', borderRadius: 2, marginBottom: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>Additional Filters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={boxStyle}>
            <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Status</Typography>
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                label="Status"
                disabled={disabledFilters.status}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Won">Won</MenuItem>
                <MenuItem value="Lost">Lost</MenuItem>
                <MenuItem value="Bought">Bought</MenuItem>
                <MenuItem value="In Cart">In Cart</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={boxStyle}>
            <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Auction Type</Typography>
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Auction Type</InputLabel>
              <Select
                name="auctiontype"
                value={filters.auctiontype}
                onChange={handleFilterChange}
                label="Auction Type"
                disabled={disabledFilters.auctiontype}
                // disabled={isAuctionTypeDisabled}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Bid">Bid</MenuItem>
                <MenuItem value="PreRelease">PreRelease</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
                <MenuItem value="Offer">Offer</MenuItem>
                <MenuItem value="BuyNow">BuyNow</MenuItem>
                <MenuItem value="portfolio">portfolio</MenuItem>
                <MenuItem value="Offer With BuyNow">Offer with BuyNow</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {['currPrice', 'ourPrice', 'currbid', 'maxbid', 'gdv', 'estibot', 'end_users_buyers', 'wayback_age', 'keyword_exact_lsv', 'keyword_exact_cpc'].map((filter) => (
          <Grid item xs={12} sm={6} key={filter}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>{filter}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Min"
                    name={`${filter}Min`}
                    value={filters[`${filter}Min`]}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
                    disabled={disabledFilters[`${filter}Min`]}
                    // disabled={disabledStates[filter]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max"
                    name={`${filter}Max`}
                    value={filters[`${filter}Max`]}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
                    disabled={disabledFilters[`${filter}Max`]}
                    // disabled={disabledStates[filter]}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <Box sx={boxStyle}>
            <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Registrar</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                label="contains"
                name="whois_registrarContains"
                value={filters.whois_registrarContains}
                onChange={handleFilterChange}
                fullWidth
                margin="dense"
                size="small"
                sx={{ marginBottom: 1 }}
                disabled={disabledFilters.whois_registrarContains}
                // disabled={isRegistrarDisabled}
              />
              <TextField
                label="contains not"
                name="whois_registrarContainsNot"
                value={filters.whois_registrarContainsNot}
                onChange={handleFilterChange}
                fullWidth
                margin="dense"
                size="small"
                sx={{ marginBottom: 1 }}
                disabled={disabledFilters.whois_registrarContainsNot}
                // disabled={isRegistrarDisabled}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={boxStyle}>
            <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Extns</Typography>
            <TextField
              label="Extns"
              name="extensions_taken"
              value={filters.extensions_taken}
              onChange={handleFilterChange}
              fullWidth
              margin="dense"
              size="small"
              sx={{ marginBottom: 1 }}
              disabled={disabledFilters.extensions_taken}
              // disabled={isExtnsDisabled}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};



function MaxBid(props) {
  const [mb, setMb] = useState(props.currbid);
  const handleChange = (event) => {
    setMb(event.target.value);
  };
  const disabledc = () => {
    if ((props.platform === "Dynadot" && canBidDD()) || (props.platform === "Dropcatch" && canBidDC()) ||
      (props.platform === "Namecheap" && canBidNC()) || (props.platform === "GoDaddy" && canBidGD()) ||
      (props.platform === "Namesilo" && canBidNS())) { return false; }
    else return true;
  }
  const disabled = () => {
    if (!disabledc()) { if (mb > props.currbid) return false; else return true; }
    else return true;
  }
  return (
    <Stack direction='row' spacing={2}>
      <TextField size='small' sx={{ width: 95 }} onChange={handleChange} variant='outlined' type='number' defaultValue={mb} />
      <IconButton size='small' disabled={disabled()} onClick={() => {
        if (props.platform === "Dynadot") {
          schedulebiddynasingle(props.domain, props.auctionId, mb.toString()).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === "Dropcatch") {
          schedulebiddcsingle(props.domain, props.auctionId, mb).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === 'GoDaddy') {
          schedulebidgdsingle(props.domain, props.domain, mb.toString()).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === "Namecheap") {
          schedulebidncsingle(props.domain, props.ncid, mb).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen2(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen2(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
        else if (props.platform === "Namesilo") {
          schedulebidnssingle(props.auctionId, props.domain, mb).then((response) => {
            if (response.data === 0) {
              props.res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
              props.setOpen1(true);
            }
            else if (response.data > 2) {
              props.res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
              props.setOpen1(true);
            }
            else {
              props.res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
              props.setOpen2(true);
            } props.setChange(!props.change)
          }).catch((error) => {
            console.log(error); props.res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
            props.setOpen1(true);
          })
        }
      }} sx={{
        "&.Mui-disabled": {
          color: "grey"
        }, color: 'green'
      }} ><Gavel /></IconButton>
    </Stack>
  );
}   
