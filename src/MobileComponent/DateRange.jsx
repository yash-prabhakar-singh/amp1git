import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material';

function DateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
         <Typography
        // fontWeight="bold"
        fontSize="1.1rem"
        padding="20px 10px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
    Date Range
      </Typography>
    <Grid container spacing={10} direction="row">
      <Grid item>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
    <Box
    sx={{
      padding: "15px 0px",
    }}
  >
    <Button
    style={{
        width: "100%",
        // borderRadius: "20px",
        backgroundColor: "#5041B8",
        color: '#FFF'

      }}
    variant="contained" onClick={clearDates}>
      Clear Dates
    </Button>
  </Box>
    
  
  </div>
  );
}

export default DateRange;
