import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import DateRange from "./DateRange";
import TableReport from "./TableReport";

function Lost() {
  const [plat, setPlat] = useState("Dynadot");
  const [showData, setShowData] = useState(false); // State to control visibility

  const handleSeePastDataClick = () => {
    setShowData(true); // Show the content when the button is clicked
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "20px 10px 5px 15px",
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
          onClick={handleSeePastDataClick}
        >
          Lost
        </Button>
      </Box>
      {showData && ( // Conditional rendering based on showData state
        <Box>
          <Box
            sx={{
              padding: "5px 10px 5px 15px",
            }}
          >
            <Typography variant="button" color="GrayText">
              Choose a platform
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
              <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
              <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
              <MenuItem value={"Namesilo"}>Namesilo</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              padding: "5px 10px 5px 15px",
            }}
          >
            <DateRange />
            <TableReport />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Lost;
