import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//import { Grid } from '@material-ui/core';
//import AuthService from '../AuthService';
//import apiservice from '../apiservice';
import TextField from "@mui/material/TextField";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DTable from "./ScheduledTable";
import ScheduledTable from "./ScheduledTable";
import PlacedTable from "./PlacedTable";
import { DataGrid } from "@mui/x-data-grid";
import api from "./api";

//import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function CloseoutList() {
  const [psize, setPsize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  //const [cbid, setCbid] = React.useState([]);

  React.useEffect(() => {
    api
      .getscheduledcloseouts()
      .then((response) => {
        setRows(response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);
  const columns = [
    { field: "platform", headerName: "Platform", width: 100 },
    { field: "domain", headerName: "Domain", width: 210 },
    { field: "auctype", headerName: "Auction Type", width: 120 },
    {
      field: "ourPrice",
      headerName: "Our Price",
      type: "number",
      width: 110,
    },
    {
      field: "currPrice",
      headerName: "Current Price",
      type: "number",
      width: 110,
    },
    {
      field: "timeLeft",
      headerName: "Time Left",
      type: "date-time",
      width: 110,
    
    },
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
    typography: {
      fontFamily: [
        "Nunito",
        "Train One",
        "Roboto",

        "sans-serif",
        "cursive",
      ].join(","),
    },
  });

 
  return (
    <Stack direction="column" sx={{ width: "100%" }} spacing={3}>
      <Stack direction="column" alignItems="flex-start" spacing={2.5}>
        <Typography alignSelf="left" fontWeight="bold" color="text.primary">
          Scheduled Closeouts
        </Typography>
        <Box sx={{ maxHeight: 500, width: 800 }}>
          <DataGrid
            autoHeight
            sx={{ width: "100%" }}
            rows={rows}
            columns={columns}
            pageSize={psize}
            onPageSizeChange={(p) => {
              setPsize(p);
            }}
            rowsPerPageOptions={[5, 10, 15, 25, 50]}
            disableSelectionOnClick
          />
        </Box>
      </Stack>
    </Stack>
  );
}
