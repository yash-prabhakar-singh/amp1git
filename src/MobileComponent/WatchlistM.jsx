import React from "react";
import ResponsiveAppBar from "./NavBar";
import { Box, Typography } from "@mui/material";
const WatchlistM = () => {
  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
        //   maxHeight={200}
          maxWidth={300}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={2}
          borderRadius={3}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h5" padding={1} textAlign="center">
            Watch List
          </Typography>
        </Box>
      </form>
      <ResponsiveAppBar />
    </div>
  );
};

export default WatchlistM;
