import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
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

const BulkFGDVM = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

    setColumns([
      { field: "Domains", headerName: "Domains", width: 220 },
      { field: "GDVs", headerName: gdvOrEstLabel, width: 210 }, // Update headerName
    ]);

    setRows([
      { id: 1, Domains: "rtis.com", GDVs: "--" },
      { id: 2, Domains: "icom.org", GDVs: "--" },
      { id: 3, Domains: "moreto.com", GDVs: "--" },
    ]);
  }, [selectedOption]);

  const options = ["Bulk GDV", "Bulk EST"];

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize="1.3rem"
        padding="20px 10px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Tools
      </Typography>
      <Box
        style={{
          padding: "5px 10px 5px 10px",
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
              onClick={() => handleOptionClick(option)}
              sx={{ width: "100vh" }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box
        style={{
          padding: "5px 10px 5px 10px",
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
          variant="contained"
          size="large"
          onClick={() => setOpen(!open)}
        >
          {selectedOption === "Bulk GDV" ? "FETCH GDV" : "FETCH EST"}
        </Button>
      </Box>
      {open && (
        <Box padding="50px 10px">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Card
                sx={{
                  bgcolor: "#7D6FE6",
                  borderRadius: "5px",
                }}
              >
                <Toolbar>
                  <Typography fontSize="1rem" letterSpacing={0.5} color="#FFF">
                    {selectedOption === "Bulk GDV"
                      ? "Domain with GDVs"
                      : "Domain with ESTs"}
                  </Typography>
                  <div style={{ flex: 1 }} />
                  <IconButton edge="end" onClick={handleDownloadClick}>
                    <DownloadIcon style={{ color: "#FFF" }} />
                  </IconButton>
                </Toolbar>
                <Card>
                  <CardContent>
                    <DataGrid autoHeight rows={rows} columns={columns} />
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
      <div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </div>
  );
};

export default BulkFGDVM;