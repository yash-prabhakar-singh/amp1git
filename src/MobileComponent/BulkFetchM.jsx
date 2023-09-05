import React, { useState } from "react";
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
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./styles.css";

const BulkFetchM = () => {
  const [output, setOutput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [plat, setPlat] = useState("Dynadot");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isTableDisplayed, setIsTableDisplayed] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleOutputClick = () => {
    const inputLines = inputText.trim().split("\n");
    setIsTableDisplayed(inputLines.length > 5);

    // Update the userInput for each item in the items array
    items.forEach((item, index) => {
      if (inputLines[index]) {
        item.userInput = inputLines[index];
      }
    });

    setOutput(true);
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function Item({ item }) {
    return (
      <div
        onClick={toggleDrawer}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div className="cookieCard">
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">Time: {item.time}</Typography>
          <Typography variant="body2">Current Bid: {item.currbid}</Typography>
          <Typography variant="body2">Platform: {item.platform}</Typography>
          <Typography variant="body2">User Input: {item.userInput}</Typography>
        </div>
      </div>
    );
  }

  var items = [
    {
      name: "rtis.com",
      time: "01 05h 02m",
      currbid: "456",
      platform: "Namecheap",
      
    },
    {
      name: "murella.com",
      time: "0d 9h 56m",
      currbid: "466",
      platform: "dropcatch",
    
    },
    {
      name: "icom.org",
      time: "1d 5h 02m",
      currbid: "456",
      platform: "godaddy",
     
    },
  ];

  const renderOutputCards = () => {
    return (
      <Carousel
        className="cardContainer"
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={false}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    );
  };

  const renderOutputTable = () => {
    const inputLines = inputText.trim().split("\n");
    return (
      <Box
        sx={{
          padding: "30px 10px",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card
              sx={{
                bgcolor: " rgba(182, 174, 241, )",
              }}
            >
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            whiteSpace: "nowrap",
                            color: "#311b92",
                          }}
                        >
                          Domain
                        </TableCell>
                        <TableCell
                          style={{
                            whiteSpace: "nowrap",
                            color: "#311b92",
                          }}
                        >
                          Ending Price
                        </TableCell>
                        <TableCell
                          style={{
                            whiteSpace: "nowrap",
                            color: "#311b92",
                          }}
                        >
                          Our Max Bid
                        </TableCell>
                        <TableCell style={{ color: "#311b92" }}>
                          Bidders
                        </TableCell>
                        <TableCell style={{ color: "#311b92" }}>
                          Age
                        </TableCell>
                        <TableCell style={{ color: "#311b92" }}>
                          EST
                        </TableCell>
                        <TableCell
                          style={{
                            whiteSpace: "nowrap",
                            color: "#311b92",
                          }}
                        >
                          Auction Type
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {inputLines.map((line, index) => (
                        <TableRow key={index}>
                          <TableCell>{line}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <div>
      <Typography
        fontWeight="bold"
        fontSize="1.2rem"
        padding="20px 15px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Fetch
      </Typography>
      <Box
        sx={{
          padding: "5px 10px 5px 15px",
        }}
      >
        <Typography variant="button" color="GrayText">
          Select an option
        </Typography>

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
          <MenuItem value={"GoDaddy Closeouts"}>GoDaddy Closeouts</MenuItem>
          <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
          <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
          <MenuItem value={"Namesilo"}>Namesilo</MenuItem>
        </Select>
      </Box>
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
          rows={8}
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

export default BulkFetchM;
