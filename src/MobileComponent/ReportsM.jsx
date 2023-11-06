import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import RYesterday from "./RYesterday";
import SearchByPlatform from "./SearchByPlatform";
import Won from "./Won";
import Lost from "./Lost";
import SearchByDomain from "./SearchByDomain";
import Stats from "./Stats";
import Projections from "./Projections";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { getcompletedauctions } from "../Components/api";


const initialData = [
  {
    platforms: "Platform A",
    domains: "Domain X",
    wonPrice: "$150",
  },
  {
    platforms: "Platform A",
    domains: "Domain X",
    wonPrice: "$920",
  },
  {
    platforms: "Platform A",
    domains: "Domain X",
    wonPrice: "$700",
  },
  // Add more mock data here
];

const ReportsM = () => {

  function CustomToolbar(props) {
    const ids=props.ids
    return (
      <GridToolbarContainer sx={{ display:'flex',flexDirection:'row-reverse'}} >
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columnsw = [
    { field: 'domain', headerName: 'Domain', width: 100 },
    { field: 'auctiontype', headerName: 'Type', width: 80 },
    {
      field: 'currbid',
      headerName: 'Price',
      type: 'number',
      width: 60,
    },
    {
      field: 'bidAmount',
      headerName: 'Target',
      type: 'number',
      width: 60,
    },
    {
      field: 'endTimeist',
      headerName: 'Date',
      description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type:'date-time',
      width: 100,
      valueGetter: (params) =>
        {return params.row.endTimeist.substring(0,10)},
    },
    { field: 'platform', headerName: 'Pl', width: 30,valueGetter: (params)=>{const plat=params.row.platform; if(plat==='GoDaddy') return 'GD'; else if(plat==='Namecheap') return 'NC';if(plat==='Namesilo') return 'NS';if(plat==='Dynadot') return 'DD';if(plat==='Dropcatch') return 'DC';}},

  ];
  const columnsl = [
    { field: 'domain', headerName: 'Domain', width: 100 },
    { field: 'auctiontype', headerName: 'Type', width: 100 },
    {
      field: 'currbid',
      headerName: 'Price',
      type: 'number',
      width: 60,
    },
    {
      field: 'bidAmount',
      headerName: 'Target',
      type: 'number',
      width: 60,
    },
    {
      field: 'endTimeist',
      headerName: 'Date',
      description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type:'date-time',
      width: 100,
      valueGetter: (params) =>
        {return params.row.endTimeist.substring(0,16)},
    },
    { field: 'platform', headerName: 'Pl', width: 30,valueGetter: (params)=>{const plat=params.row.platform; if(plat==='GoDaddy') return 'GD'; else if(plat==='Namecheap') return 'NC';if(plat==='Namesilo') return 'NS';if(plat==='Dynadot') return 'DD';if(plat==='Dropcatch') return 'DC';}},

  ];
  const columnsp = [
    { field: 'domain', headerName: 'Domain', width: 100 },
    { field: 'result', headerName: 'Status', width: 70 },
    { field: 'auctiontype', headerName: 'Type', width: 100 },
    {
      field: 'currbid',
      headerName: 'Price',
      type: 'number',
      width: 60,
    },
    {
      field: 'bidAmount',
      headerName: 'Target',
      type: 'number',
      width: 60,
    },
    {
      field: 'endTimeist',
      headerName: 'Date',
      //description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type:'date-time',
      width: 100,
      valueGetter: (params) =>
        {return params.row.endTimeist.substring(0,16)},
    }
  ];
  const columnsd = [
    { field: 'domain', headerName: 'Domain', width: 100 },
    { field: 'result', headerName: 'Status', width: 70 },
    { field: 'auctiontype', headerName: 'Type', width: 80 },
    {
      field: 'currbid',
      headerName: 'Price',
      type: 'number',
      width: 60,
    },
    {
      field: 'bidAmount',
      headerName: 'Target',
      type: 'number',
      width: 60,
    },
    {
      field: 'endTimeist',
      headerName: 'Date',
      description: 'This column has a value getter and is not sortable.',
      //sortable: false,
      type:'date-time',
      width: 100,
      valueGetter: (params) =>
        {return params.row.endTimeist.substring(0,16)},
    },
    { field: 'platform', headerName: 'Pl', width: 30,valueGetter: (params)=>{const plat=params.row.platform; if(plat==='GoDaddy') return 'GD'; else if(plat==='Namecheap') return 'NC';if(plat==='Namesilo') return 'NS';if(plat==='Dynadot') return 'DD';if(plat==='Dropcatch') return 'DC';}},
  ];
  const [data, setData] = useState(initialData);
  const [won,setWon]=useState(false);
  const [loss,setLoss]=useState(false);
  const [plat,setPlat]=useState(false);
  const [platform,setPlatform]=useState("Dynadot");

  const [domain,setDomain]=useState(false);
  const [value,setValue]=useState("");


  const [editIndex, setEditIndex] = useState(-1);
  const [psize, setPsize] = React.useState(10);
  const [rowsw, setRowsw] = React.useState([]);
  const [rowsl, setRowsl] = React.useState([]);
  const [rowsp, setRowsp] = React.useState([]);
  const [rowsd, setRowsd] = React.useState([]);

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleMaxPriceChange = (event, index) => {
    const newData = [...data];
    newData[index].ourMaxPrice = event.target.value;
    setData(newData);
  };
  React.useEffect(()=>{getcompletedauctions().then((response)=>{const arr=response.data;setData(arr);setRowsw(arr.filter((ar)=>{if(ar.result=='Won')return ar;}));setRowsl(arr.filter((ar)=>{if(ar.result=='Loss')return ar;}));setRowsp(arr.filter((ar)=>{if(ar.platform==platform)return ar;}))}).catch((Error)=>console.log(Error))},[]);
  //React.useEffect(()=>{})
  return (
    <Stack  //height={window.screen.height*0.725} 
     direction='column' >
      <Stack direction='column' alignItems='center'
        sx={{
          padding: "20px 0px 5px 0px",
        }}
      >
        <Button
          style={{
            width: "95%",
            borderRadius: "20px",
            //margin: "0px 20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={()=>{setWon(!won)}}
        >
          Won
        </Button>
        {won&&<Grid container spacing={0}>
        <Grid item xs={12}>
         <Box width='100%'  sx={{
            padding: "10px",
          }} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rowsw}
        columns={columnsw}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar
        }}
        //checkboxSelection
        //onSelectionModelChange={itm => console.log(itm)}
      /></Box>
      </Grid></Grid>}
      </Stack>
      <Stack direction='column' alignItems='center'
        sx={{
          padding: "20px 0px 5px 0px",
        }}
      >
        <Button
          style={{
            width: "95%",
            borderRadius: "20px",
            //margin: "0px 20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={()=>{setLoss(!loss)}}
        >
          Lost
        </Button>
        {loss&&<Grid container spacing={0}>
        <Grid item xs={12}>
         <Box width='100%'  sx={{
            padding: "10px",
          }} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rowsl}
        columns={columnsl}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar
        }}
        //checkboxSelection
        //onSelectionModelChange={itm => console.log(itm)}
      /></Box>
      </Grid></Grid>}
      </Stack>
      <Stack direction='column' alignItems='center'
        sx={{
          padding: "20px 0px 5px 0px",
        }}
      >
        <Button
          style={{
            width: "95%",
            borderRadius: "20px",
            //margin: "0px 20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={()=>{setDomain(!domain)}}
        >
          Search By Domain
        </Button>
        {domain&&<Grid direction='column' container spacing={0}>
          <Grid sx={{
            padding: "10px",
          }} item><TextField
          //multiline
          //rows={5}
          //sx={{borderRadius:'10px'}}
          variant="outlined"
          placeholder="Enter your Domain here..."
          value={value}
          fullWidth={true}
          onChange={(event)=>{setValue(event.target.value);if(event.target.value=="") setRowsd([]); else setRowsd(data.filter((ar)=>{if(ar.domain.toLowerCase().includes(event.target.value.toLowerCase()))return ar;}));}}
          margin="normal"
        /></Grid>
        <Grid item xs={12}>
         <Box width='100%'  sx={{
            padding: "10px",
          }} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rowsd}
        columns={columnsd}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar
        }}
        //checkboxSelection
        //onSelectionModelChange={itm => console.log(itm)}
      /></Box>
      </Grid></Grid>}
      </Stack>
      <Stack direction='column' alignItems='center'
        sx={{
          padding: "20px 0px 5px 0px",
        }}
      >
        <Button
          style={{
            width: "95%",
            borderRadius: "20px",
            //margin: "0px 20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={()=>{setPlat(!plat)}}
        >
          Search By Platform
        </Button>
        {plat&&<Grid direction='column' container spacing={0}>
          <Grid sx={{
            padding: "10px",
          }} item><Select
          sx={{ alignSelf: "center",'& legend': { display: 'none' },
          '& fieldset': { top: 0 } }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth={true}
          value={platform}
          //label="Platforms"
          onChange={(event) => {
            setPlatform(event.target.value);setRowsp(data.filter((ar)=>{if(ar.platform===(event.target.value))return ar;}))
          }}
        >
          <MenuItem value={"Dynadot"}>Dynadot</MenuItem>
          <MenuItem value={"GoDaddy"}>GoDaddy</MenuItem>
          <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
          <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
          <MenuItem value={"Namesilo"}>Namesilo</MenuItem>
        </Select></Grid>
        <Grid item xs={12}>
         <Box width='100%'  sx={{
            padding: "10px",
          }} >
      <DataGrid autoHeight sx={{ width: '100%'}}
        rows={rowsp}
        columns={columnsp}
        pageSize={psize}
        onPageSizeChange={(p)=>{setPsize(p)}}
        rowsPerPageOptions={[10,25,50,100,500]}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar
        }}
        //checkboxSelection
        //onSelectionModelChange={itm => console.log(itm)}
      /></Box>
      </Grid></Grid>}
      </Stack>
      <Stack direction='column' alignItems='center'
        sx={{
          padding: "20px 0px 5px 0px",
        }}
      >
        <Button
          style={{
            width: "95%",
            borderRadius: "20px",
            //margin: "0px 20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={()=>{}}
        >
          Stats
        </Button>
      </Stack>
      <Stack direction='column' alignItems='center'
        sx={{
          padding: "20px 0px 5px 0px",
        }}
      >
        <Button
          style={{
            width: "95%",
            borderRadius: "20px",
            //margin: "0px 20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={()=>{}}
        >
          Projections
        </Button>
      </Stack>
    </Stack>
  );
};

export default ReportsM;
