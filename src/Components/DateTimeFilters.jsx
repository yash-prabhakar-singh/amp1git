import * as React from 'react';
import { Box, Grid, TextField, Typography, MenuItem, FormControl, Select, InputLabel, Stack } from '@mui/material';

const DateTimeFilters = ({ filters, handleFilterChange }) => {
  const boxStyle = {
    flex: 1,
    marginBottom: 2,
    border: '1px solid #5A5A5A',
    padding: 2,
    borderWidth: 2,
    borderRadius: 2,
    height: 'auto', // Adjust height to auto to fit content
  };

  return (
    <Box sx={{ padding: 3, border: '3px solid #636363', borderRadius: 2, marginBottom: 2, width: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>Date/Time Filters</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={boxStyle}>
            <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Running Auction</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <InputLabel sx={{ fontWeight:700 }}>End Date</InputLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth margin="dense" size="small">
                  <Select
                    name="runningEndDate"
                    value={filters.runningEndDate}
                    onChange={handleFilterChange}
                    label="End Date"
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="date1">Date 1</MenuItem>
                    <MenuItem value="date2">Date 2</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ fontWeight:700 }}>Named Ending</InputLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth margin="dense" size="small">
                  <Select
                    name="runningNamedEnding"
                    value={filters.runningNamedEnding}
                    onChange={handleFilterChange}
                    label="Named Ending"
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="name1">Name 1</MenuItem>
                    <MenuItem value="name2">Name 2</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ fontWeight:700 }}>Ends in Hours</InputLabel>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="min"
                  name="runningEndsInDaysMin"
                  value={filters.runningEndsInDaysMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="max"
                  name="runningEndsInDaysMax"
                  value={filters.runningEndsInDaysMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={boxStyle}>
            <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Completed Auctions</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <InputLabel sx={{ fontWeight:700 }}>End Date</InputLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth margin="dense" size="small">
                  <Select
                    name="completedEndDate"
                    value={filters.completedEndDate}
                    onChange={handleFilterChange}
                    label="End Date"
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="date1">Date 1</MenuItem>
                    <MenuItem value="date2">Date 2</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ fontWeight:700 }}>Named Ending</InputLabel>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth margin="dense" size="small">
                  <Select
                    name="completedNamedEnding"
                    value={filters.completedNamedEnding}
                    onChange={handleFilterChange}
                    label="Named Ending"
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="name1">Name 1</MenuItem>
                    <MenuItem value="name2">Name 2</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ fontWeight:700 }}>Ends in Days</InputLabel>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="min"
                  name="completedEndsInDaysMin"
                  value={filters.completedEndsInDaysMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="max"
                  name="completedEndsInDaysMax"
                  value={filters.completedEndsInDaysMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DateTimeFilters;