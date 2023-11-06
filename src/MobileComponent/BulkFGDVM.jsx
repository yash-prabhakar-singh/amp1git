import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { fetchest } from "../Components/api";
import { CSVLink } from "react-csv";

const BulkFGDVM = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [headers, setHeaders] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [fdets,setFdets]= React.useState([]);
    const [bfdets,setBfdets]= React.useState(false);
    const [value, setValue] = React.useState('');
    const [psize, setPsize] = React.useState(10);
    const [loaded, setLoaded] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [variant, setVariant] = React.useState("outlined");
  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleMenuClose();
  };
  const handleDownloadClick = () => {
    setSnackbarMessage("Download started...");
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const gdvOrEstLabel = selectedOption === "Bulk GDV" ? "GDVs" : "ESTs";
if(selectedOption === "Bulk EST")
{
    setColumns([
      { field: "domain", headerName: "Domains", width: window.screen.width*0.6 },
      { field: "appraised_value", headerName: gdvOrEstLabel, type: 'number',
      width: window.screen.width*0.3 }, // Update headerName
    ]);
    setHeaders([
      { label: "Domain", key: "domain" },
      { label: "EST", key: "appraised_value" },
  ])
  }
  else if(selectedOption === "Bulk Stats")
  {
    setColumns( [
      { field: 'domain', headerName: 'Domain', width: 210
  },
  {
    field: 'appraised_value',
    headerName: 'EST',
    type: 'number',
    width: 70,
    //valueGetter: ()=>{return '4 mins'}
  },
        {
          field: 'age',
          headerName: 'Year',
          type: 'number',
          width: 50,
          valueGetter: (params)=>{return params.row.whois_create_date.substring(6,10)}
        },
        
        {
          field: 'extensions_taken',
          headerName: 'Extns',
          type: 'number',
          width: 50,
        },
        {
          field: 'keyword_exact_lsv',
          headerName: 'LSV',
          type: 'number',
          width: 60,
        },
        {
          field: 'keyword_exact_cpc',
          headerName: 'CPC',
          type: 'number',
          width: 60,
        },
        {
          field: 'whois_registrar',
          headerName: 'Registrar',
          width: 130,
        },
        {
          field: 'end_users_buyers',
          headerName: 'EUB',
          type: 'number',
          width: 60,
        },
        {
          field: 'wayback_age',
          headerName: 'ABY',
          type: 'number',
          width: 60,
        }
      
    ]);
    setHeaders([
      { label: "Domain", key: "domain" },
      { label: "EST", key: "appraised_value" },
      { label: "Year", key: "whois_create_date" },
      { label: "Extns", key: "extensions_taken" },
      { label: "LSV", key: "keyword_exact_lsv" },
      { label: "CPC", key: "keyword_exact_cpc" },
      { label: "Registrar", key: "whois_registrar" },
      { label: "EUB", key: "end_users_buyers" },
      { label: "ABY", key: "wayback_age" },
  ])
  }

  }, [selectedOption]);
  
  const options = ["Bulk GDV", "Bulk EST","Bulk Stats"];

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Box
         sx={{
          padding: "20px 10px 5px 15px",
        }}
      >
        <Button
          style={{
            width: "100%",
            backgroundColor: "#7D6FE6",
            color: "#FFF",
          }}
          variant="contained"
          size="large"
          onClick={handleButtonClick}
          endIcon={<ExpandMoreIcon />}
        >
          {selectedOption || "Select an Option"}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              disabled={option==="Bulk GDV"}
              onClick={() => handleOptionClick(option)}
              sx={{ width: "100vh" }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
          Details fetched!
        </Alert>
      </Snackbar>
      <Divider style={{ padding: "15px" }}>
        <Typography variant="subtitle1" color="grey">
          TOOLS
        </Typography>
      </Divider>
      <Box
        sx={{
          padding: "0px 10px 5px 15px",
        }}
      >
        <TextField
          id="outlined-textarea"
          label="Enter the list of Domains"
          color="secondary"
          placeholder="Domains"
          multiline
          margin="normal"
          fullWidth={true}
          rows={8}
          variant="outlined"
        />
      </Box>
      <Box
        style={{
          padding: "10px 10px 5px 10px",
        }}
      >
        <Button
          style={{
            width: "100%",
            borderRadius: "20px",
            backgroundColor: "#5041B8",
            color: "#FFF",
          }}
          disabled={loading}
          variant="contained"
          size="large"
          onClick={() => {setLoading(true);
            var arr= value.split("\n")
            //var a= arr.map((ar)=> {return ar.split(',')});
            setFdets([]);
            console.log(arr);
            if(selectedOption === "Bulk EST"||selectedOption === "Bulk Stats")
            fetchest(arr).then((res)=>{console.log(res.data); setFdets(res.data);setLoaded(true);setLoading(false);if(fdets.length!=0)
              setOpen(true);}).catch((err)=>{console.log(err);setLoading(false)})
            setBfdets(true);
           // setValue('');
            setVariant("contained");}}
        >
          {selectedOption === "Bulk Stats" ? "FETCH STATS" : "FETCH EST"}
        </Button>
      </Box>
      {bfdets && (
        <Box padding="50px 10px">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Card
                sx={{
                  //bgcolor: "#7D6FE6",
                  borderRadius: "5px",
                }}
              >
                <Toolbar sx={{bgcolor: "#7D6FE6"}} >
                  <Typography fontSize="1rem" letterSpacing={0.5} color="#FFF">
                    {selectedOption === "Bulk Stats"
                      ? "Domains with Stats"
                      : "Domains with ESTs"}
                  </Typography>
                  <div style={{ flex: 1 }} />
                  <IconButton edge="end" onClick={handleDownloadClick}>
                    
                    <CSVLink
                    headers={headers}
                    data={fdets}
                    filename="ESTs"
                    style={{ "textDecoration": "none", "color": "black" }}
                >
                    {<DownloadIcon style={{ color: "#FFF" }} />}
                </CSVLink>
                  </IconButton>
                </Toolbar>
                
                    <DataGrid autoHeight rows={rows} columns={columns} />
                  
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
     
    </div>
  );
};

export default BulkFGDVM;