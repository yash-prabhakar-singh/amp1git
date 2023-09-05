import React from 'react'
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Carousel from "react-material-ui-carousel";
import "./styles.css";

const Fetchcard = () => {

  const [open, setOpen] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const handleShowCard = () => {
    setShowCard(true);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function Item(props) {
    return (
      <div
        onClick={toggleDrawer}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div class="cookieCard">
          <p class="cookieHeading">Fetch Info.</p>
          <p class="cookieDescription">
            all the quick fetch info will be shown here.
          </p>
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
  return (
    <div>
         <Box
        sx={{
          padding: "0px 10px 5px 15px",
        }}
      >
        <TextField
          id="outlined-textarea"
          label="Enter a Domain"
          placeholder="Domain"
          multiline
          margin="normal"
          fullWidth={true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{
                    color: "#FFF ",
                    backgroundColor: "#5041B8",
                  }}
                  onClick={() => setDisplayResults(!displayResults)}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {displayResults && (
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
      )}
    </div>
  )
}

export default Fetchcard