import React from 'react'
import { Box, Typography, Button } from "@mui/material";

import ResponsiveAppBar from "./NavBar";
import { hover } from "@testing-library/user-event/dist/hover";
import { useState } from "react";


const PlacedTableM = () => {
  const[isPlacedbid, setIsPlacedbid] =useState(false);
  return (
    <div>
       
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="flex-end"
          justifyContent={"flex-end"}
          margin="auto"
          marginTop={10}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h5" padding={2} textAlign="center">
            Placed Bid
          </Typography>
          {/* <TextField /> */}

          {/* <TextField /> */}
          <Button
            style={{
              height: "30px",
              position: "absolute",
              bottom: "0",
              width: "100px",
              backgroundColor: "black",
              color: "white",
              "&:disabled": {
                backgroundColor: "dark grey",
              },
            }}
            variant="contained"
            onClick={() =>setIsPlacedbid(!isPlacedbid)}
          >
            {" "}
            View Bids
          </Button>
        </Box>
      </form>
      <ResponsiveAppBar />
    </div>
  


  
  );
}

export default PlacedTableM