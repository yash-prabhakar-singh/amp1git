// import { Alert, Box, IconButton, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
// import * as React from 'react';
// import axios from 'axios';
// import api, { cancelBidDc, cancelBidDd, cancelBidGd, cancelBidNc, cancelBidNs, getcompletedauctions, getscheduledauctions, schedulebiddcsingle, schedulebiddynasingle, schedulebidgdsingle, schedulebidncsingle, schedulebidnssingle } from './api';
// import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, gridStringOrNumberComparator } from '@mui/x-data-grid';
// import { Cancel, CheckCircle, Delete, EmojiEmotions, Gavel, Report, ReportGmailerrorred, SentimentVeryDissatisfied, ThumbDown, ThumbDownAlt, ThumbDownOffAlt, ThumbUp, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material';
// import { canBidDC, canBidDD, canBidGD, canBidNC, canBidNS } from './msalService';
// import { MaterialReactTable,useMaterialReactTable } from 'material-react-table';
// import { data } from './Data';
// import { useMemo, useState, useEffect, useRef } from 'react';


// export default function ScheduledTable() {

//     let fn=(row)=>{if(row.bidPlaced)
//         return "Yes";
//         else
//         return "No";}
// const [psize,setPsize]=React.useState(50);
//     const [rows, setRows] = React.useState([]);
//     //const [cbid, setCbid] = React.useState([]);
//     const [change,setchange]=React.useState(false);
       
// React.useEffect(()=>{getscheduledauctions()
//   .then((response)=>{setRows(response.data);console.log(response.data)}).catch((Error)=>console.log(Error));},[change]);
//   const [open1,setOpen1]=React.useState(false);
//   const [open2, setOpen2] = React.useState(false);
//   const res= React.useRef("");

// const MaxBid=(props)=>{
//   const [mb,setMb]=React.useState(props.maxBid);
//   const handleChange = (event) => {
//     setMb(event.target.value);
//   };
//   const disabledc=()=>{if((props.platform=="Dynadot"&&canBidDD())||(props.platform=="Dropcatch"&&canBidDC())||
// (props.platform=="Namecheap"&&canBidNC())||(props.platform=="GoDaddy"&&canBidGD())||
// (props.platform=="Namesilo"&&canBidNS())){ return false;}
// else return true;}

// const disabled=()=>{if(!disabledc()){if(mb>props.currbid) return false; else return true;}
// else return true;}
//   return(<Stack direction='row' spacing={2}><TextField size='small'  sx={{width:95}} onChange={handleChange} variant='outlined' type='number' defaultValue={props.maxBid} /><IconButton size='small' disabled={disabled()} 
//     onClick={()=>{if(props.platform=="Dynadot")
//       {schedulebiddynasingle(props.domain,props.auctionId,mb.toString()).then((response)=>{if(response.data==0){
//         res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//         setOpen2(true);
//       }
//     else if(response.data>2){
//       res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//       setOpen1(true); 
//     }
//     else{
//       res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//       setOpen1(true); 
//     }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//     setOpen1(true);})}
//       else if(props.platform=="Dropcatch")
//       {schedulebiddcsingle(props.domain,props.auctionId,mb).then((response)=>{if(response.data==0){
//         res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//         setOpen2(true);
//       }
//     else if(response.data>2){
//       res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//       setOpen1(true); 
//     }
//     else{
//       res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//       setOpen1(true); 
//     }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//     setOpen1(true);})}
//       else if(props.platform=='GoDaddy')
//       {schedulebidgdsingle(props.domain,props.domain,mb.toString()).then((response)=>{if(response.data==0){
//         res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//         setOpen2(true);
//       }
//     else if(response.data>2){
//       res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//       setOpen1(true); 
//     }
//     else{
//       res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//       setOpen1(true); 
//     }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//     setOpen1(true);})}
//       else if(props.platform=="Namecheap")
//       {schedulebidncsingle(props.domain,props.ncid,mb).then((response)=>{if(response.data==0){
//         res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//         setOpen2(true);
//       }
//     else if(response.data>2){
//       res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//       setOpen1(true); 
//     }
//     else{
//       res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//       setOpen1(true); 
//     }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//     setOpen1(true);})}
//       else if(props.platform=="Namesilo")
//       {schedulebidnssingle(props.auctionId,props.domain,mb).then((response)=>{if(response.data==0){
//         res.current="Bid scheduled for "+props.domain+" at max price "+mb;
//         setOpen2(true);
//       }
//     else if(response.data>2){
//       res.current="Bid not scheduled for "+props.domain+" as price: "+mb+" is lower than min price of "+response.data;
//       setOpen1(true); 
//     }
//     else{
//       res.current="Bid not scheduled for "+props.domain+", may be auction has ended";
//       setOpen1(true); 
//     }setchange(!change)}).catch((error)=>{console.log(error); res.current="Bid not scheduled for "+props.domain+", Server Error!";
//     setOpen1(true);})}
//       }}  sx={{
//     "&.Mui-disabled": {
//       color: "grey"
//     },color:'green'
//   }} ><Gavel/></IconButton><IconButton disabled={disabledc()} onClick={()=>{
//     if(props.platform=="Dynadot")
//     {cancelBidDd(props.domain,props.auctionId).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
//   else if(props.platform=="Dropcatch")
//   {cancelBidDc(props.domain,props.auctionId).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
//   else if(props.platform=='GoDaddy')
//   {cancelBidGd(props.domain).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
//   else if(props.platform=="Namecheap")
//   {cancelBidNc(props.domain,props.ncid).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
//   else if(props.platform=="Namesilo")
//   {cancelBidNs(props.domain,props.auctionId).then(()=>{res.current="Bids cancelled on "+props.domain;setOpen2(true);setchange(!change)}).catch((error)=>{res.current="Bids not cancelled on "+props.domain;setOpen1(true);console.log(error)})}
// }}><Delete/></IconButton></Stack>);

// }

// const timeLeftComparator = (v1, v2,param1,param2) => {return gridStringOrNumberComparator(v1.endtime,v2.endtime)};

// const columns = [
//   { field: 'platform', headerName: 'Platform', width: 100 },
//   { field: 'domain', headerName: 'Domain', width: 210 },
//   { field: 'type', headerName: 'Type', width: 50 ,
//   valueGetter: (params) =>{if(params.row.auctiontype.charAt(0)=='e'||params.row.auctiontype.charAt(0)=='E')
// return 'E';
// else return 'O';}
// }, {
//   field: 'status',
//   headerName: 'Status',
//   renderCell: (params)=>{if(params.row.result=='Outbid') return(<Box><Cancel sx={{color:'red'}}/> </Box>);
// else
// return(<Box><CheckCircle sx={{color:'green'}}/> </Box>);},
//   width: 70,
// },
// {
//   field: 'bidders',
//   headerName: 'Bidders',
//   type: 'number',
//   width: 70,
// },{
//   field: 'estibot',
//   headerName: 'EST',
//   type: 'number',
//   width: 90,
// },{
//   field: 'gdv',
//   headerName: 'GDV',
//   type: 'number',
//   width: 90,
// },{
//   field: 'currbid',
//   headerName: 'Current Bid',
//   type: 'number',
//   width: 95,
// },
// {
//   field: 'time_left',
//   headerName: 'Time Left',
//   //description: 'This column has a value getter and is not sortable.',
//   //sortable: false,
//   valueGetter: (params) => ({
//     timeleft: params.row.time_left,
//     endtime: params.row.endTimeist,
//   }),
//   valueFormatter: (params) => {
//     const value = params.value;
//     return value.timeleft;
//   },
//   sortComparator:timeLeftComparator,
//   type: 'date-time',
//   width: 120,
//   //valueGetter: (params) =>{return params.row.endTimeist.substring(0,16)},
// },

//   {
//     field:'maxbid',
//     headerName:'Our Max Bid',
//     renderCell: (params)=><MaxBid platform={params.row.platform}  currbid={Number(params.row.currbid)} maxBid={Number(params.row.bidAmount)} domain={params.row.domain}  ncid={params.row.namecheapid} auctionId={params.row.auctionId} />,
//   width:220//170
// },
// {
//   field: 'extensions_taken',
//   headerName: 'Extns',
//   type: 'number',
//   width: 50,
// },
// {
//   field: 'keyword_exact_lsv',
//   headerName: 'LSV',
//   type: 'number',
//   width: 60,
// },
// {
//   field: 'keyword_exact_cpc',
//   headerName: 'CPC',
//   type: 'number',
//   width: 60,
// },
// {
//   field: 'whois_registrar',
//   headerName: 'Registrar',
//   width: 130,
// },
// {
//   field: 'end_users_buyers',
//   headerName: 'EUB',
//   type: 'number',
//   width: 60,
// },
// {
//   field: 'wayback_age',
//   headerName: 'ABY',
//   type: 'number',
//   width: 60,
// }
// ];
// function CustomToolbar(props) {
//   const ids=props.ids
//   return (
//     <GridToolbarContainer sx={{ display:'flex',flexDirection:'row-reverse'}} >
//       <GridToolbarColumnsButton />
//       <GridToolbarFilterButton />
//       <GridToolbarDensitySelector />
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

// //React.useEffect(()=>{setCbid(rows.map(axios.get("https://api.dynadot.com/api3.json").then((response)=>{var a=JSON.parse(response.data); return a.Response.ResponseCode})))});

// //const handleChange = (event) => {
//     //setValue(event.target.value);
//  // };
//     return (
    
//     <Box sx={{width: '100%',}}>
//       <Stack direction='column'sx={{//maxHeight: 400,
//                width: '100%'}} alignItems='flex-start' spacing={2.5}>
//         <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
//             Scheduled Bids
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
//             <Box sx={{//maxHeight: 400,
//                width: '100%','&::-webkit-scrollbar': {
//                 width: '6px', // Set the desired width for the scrollbar
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 background: '#888', // Set the color of the scrollbar thumb
//                 borderRadius: '6px', // Set the border radius of the scrollbar thumb
//               }}} >
//       <DataGrid autoHeight sx={{ width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         onPageSizeChange={(p)=>{setPsize(p)}}
//         rowsPerPageOptions={[10,25,50,100,500]}
//         disableSelectionOnClick
//         disableColumnSelector
//         initialState={{
//           columns: {
//             columnVisibilityModel: {
//               // Hide columns status and traderName, the other columns will remain visible
          
//             },
//           },
//         }}
//         components={{
//           Toolbar: CustomToolbar,
//           // Use BaseCheckbox, but make sure your custom Checkbox expects props to match "CheckboxProps" from @mui/material else functionality will be lost.
//         }}
//         //checkboxSelection
//         //onSelectionModelChange={itm => console.log(itm)}
//       /></Box>
    
//             </Stack></Box>)}


import { Alert, Box, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Cancel, CheckCircle, Delete, Gavel } from '@mui/icons-material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { canBidDC, canBidDD, canBidGD, canBidNC, canBidNS } from './msalService';
import { getscheduledauctions, schedulebiddynasingle, schedulebiddcsingle, schedulebidgdsingle, schedulebidncsingle, schedulebidnssingle, cancelBidDd, cancelBidDc, cancelBidGd, cancelBidNc, cancelBidNs } from './api';

export default function ScheduledTable() {
  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'type', header: 'Type', size: 50, 
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value && value.charAt(0).toUpperCase() === 'E' ? 'E' : 'O';
      }
    },
    { accessorKey: 'status', header: 'Status', size: 70, 
      Cell: ({ cell }) => cell.getValue() === 'Outbid' ? <Cancel sx={{ color: 'red' }} /> : <CheckCircle sx={{ color: 'green' }} /> 
    },
    { accessorKey: 'bidders', header: 'Bidders', size: 70 },
    { accessorKey: 'estibot', header: 'EST', size: 90 },
    { accessorKey: 'gdv', header: 'GDV', size: 90 },
    { accessorKey: 'currbid', header: 'Current Bid', size: 95 },
    { accessorKey: 'time_left', header: 'Time Left', size: 120, 
      Cell: ({ cell }) => cell.getValue().timeleft, 
      sortingFn: (rowA, rowB) => new Date(rowA.original.endTimeist) - new Date(rowB.original.endTimeist)
    },
    { accessorKey: 'maxbid', header: 'Our Max Bid', size: 220, 
      Cell: ({ cell }) => <MaxBid {...cell.row.original} /> 
    },
    { accessorKey: 'extensions_taken', header: 'Extns', size: 50 },
    { accessorKey: 'keyword_exact_lsv', header: 'LSV', size: 60 },
    { accessorKey: 'keyword_exact_cpc', header: 'CPC', size: 60 },
    { accessorKey: 'whois_registrar', header: 'Registrar', size: 130 },
    { accessorKey: 'end_users_buyers', header: 'EUB', size: 60 },
    { accessorKey: 'wayback_age', header: 'ABY', size: 60 },
  ], []);

  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);
  const [change, setChange] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const res = useRef("");

  useEffect(() => {
    getscheduledauctions()
      .then((response) => {
        setRows(response.data);
        console.log(response.data);
      })
      .catch((Error) => console.log(Error));
  }, [change]);

  const table = useMaterialReactTable({
    columns: columns,
    data: rows,
    initialState: {
      pagination: { pageSize: psize },
      sorting: [{ id: 'endTimeist', desc: true }],
    },
  });

  const MaxBid = (props) => {
    const [mb, setMb] = useState(props.maxBid);
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
        <TextField size='small' sx={{ width: 95 }} onChange={handleChange} variant='outlined' type='number' defaultValue={props.maxBid} />
        <IconButton size='small' disabled={disabled()}
          onClick={() => {
            if (props.platform === "Dynadot") {
              schedulebiddynasingle(props.domain, props.auctionId, mb.toString()).then((response) => {
                if (response.data === 0) {
                  res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
                  setOpen2(true);
                }
                else if (response.data > 2) {
                  res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
                  setOpen1(true);
                }
                else {
                  res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
                  setOpen1(true);
                } setChange(!change)
              }).catch((error) => {
                console.log(error); res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
                setOpen1(true);
              })
            }
            else if (props.platform === "Dropcatch") {
              schedulebiddcsingle(props.domain, props.auctionId, mb).then((response) => {
                if (response.data === 0) {
                  res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
                  setOpen2(true);
                }
                else if (response.data > 2) {
                  res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
                  setOpen1(true);
                }
                else {
                  res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
                  setOpen1(true);
                } setChange(!change)
              }).catch((error) => {
                console.log(error); res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
                setOpen1(true);
              })
            }
            else if (props.platform === 'GoDaddy') {
              schedulebidgdsingle(props.domain, props.domain, mb.toString()).then((response) => {
                if (response.data === 0) {
                  res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
                  setOpen2(true);
                }
                else if (response.data > 2) {
                  res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
                  setOpen1(true);
                }
                else {
                  res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
                  setOpen1(true);
                } setChange(!change)
              }).catch((error) => {
                console.log(error); res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
                setOpen1(true);
              })
            }
            else if (props.platform === "Namecheap") {
              schedulebidncsingle(props.domain, props.ncid, mb).then((response) => {
                if (response.data === 0) {
                  res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
                  setOpen2(true);
                }
                else if (response.data > 2) {
                  res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
                  setOpen1(true);
                }
                else {
                  res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
                  setOpen1(true);
                } setChange(!change)
              }).catch((error) => {
                console.log(error); res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
                setOpen1(true);
              })
            }
            else if (props.platform === "Namesilo") {
              schedulebidnssingle(props.auctionId, props.domain, mb).then((response) => {
                if (response.data === 0) {
                  res.current = "Bid scheduled for " + props.domain + " at max price " + mb;
                  setOpen2(true);
                }
                else if (response.data > 2) {
                  res.current = "Bid not scheduled for " + props.domain + " as price: " + mb + " is lower than min price of " + response.data;
                  setOpen1(true);
                }
                else {
                  res.current = "Bid not scheduled for " + props.domain + ", may be auction has ended";
                  setOpen1(true);
                } setChange(!change)
              }).catch((error) => {
                console.log(error); res.current = "Bid not scheduled for " + props.domain + ", Server Error!";
                setOpen1(true);
              })
            }
          }} sx={{
            "&.Mui-disabled": {
              color: "grey"
            }, color: 'green'
          }} ><Gavel /></IconButton>
        <IconButton disabled={disabledc()} onClick={() => {
          if (props.platform === "Dynadot") {
            cancelBidDd(props.domain, props.auctionId).then(() => { res.current = "Bids cancelled on " + props.domain; setOpen2(true); setChange(!change) }).catch((error) => { res.current = "Bids not cancelled on " + props.domain; setOpen1(true); console.log(error) })
          }
          else if (props.platform === "Dropcatch") {
            cancelBidDc(props.domain, props.auctionId).then(() => { res.current = "Bids cancelled on " + props.domain; setOpen2(true); setChange(!change) }).catch((error) => { res.current = "Bids not cancelled on " + props.domain; setOpen1(true); console.log(error) })
          }
          else if (props.platform === 'GoDaddy') {
            cancelBidGd(props.domain).then(() => { res.current = "Bids cancelled on " + props.domain; setOpen2(true); setChange(!change) }).catch((error) => { res.current = "Bids not cancelled on " + props.domain; setOpen1(true); console.log(error) })
          }
          else if (props.platform === "Namecheap") {
            cancelBidNc(props.domain, props.ncid).then(() => { res.current = "Bids cancelled on " + props.domain; setOpen2(true); setChange(!change) }).catch((error) => { res.current = "Bids not cancelled on " + props.domain; setOpen1(true); console.log(error) })
          }
          else if (props.platform === "Namesilo") {
            cancelBidNs(props.domain, props.auctionId).then(() => { res.current = "Bids cancelled on " + props.domain; setOpen2(true); setChange(!change) }).catch((error) => { res.current = "Bids not cancelled on " + props.domain; setOpen1(true); console.log(error) })
          }
        }}><Delete /></IconButton>
      </Stack>
    );
  }

  return (
    <Box sx={{ width: '100%', }}>
      <Stack direction='column' sx={{ width: '100%' }} alignItems='flex-start' spacing={2.5}>
        <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
          Scheduled Bids
        </Typography>

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
        <Box sx={{
          width: '100%', '&::-webkit-scrollbar': {
            width: '6px', // Set the desired width for the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888', // Set the color of the scrollbar thumb
            borderRadius: '6px', // Set the border radius of the scrollbar thumb
          }
        }} >
          <MaterialReactTable
            table={table}
            muiTablePaperProps={{
              sx: { width: '100%' },
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}