import React, { useState } from 'react';
import { Typography, Select, MenuItem, FormControl, InputLabel, TextField, Stack, Button, Grid, Divider } from '@mui/material';

const AlgoSettings = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [maxFastBid, setMaxFastBid] = useState('');
  const [iterations, setIterations] = useState('');

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleSave = () => {
    // Handle the save logic here
    console.log(`Platform: ${selectedPlatform}, Max Fast Bid: ${maxFastBid}, Iterations: ${iterations}`);
  };

  return (
    <Stack direction="column" spacing={4} marginLeft={2}>
      <Typography fontWeight="bold" color="text.primary" align="left">
        Algo Settings
      </Typography>

      <Stack direction="column" spacing={2} >
        <Typography fontWeight="bold" color="text.primary" align="left">
          Fast/Slow Bidding
        </Typography>
<Grid container spacing={2} alignItems='center'>
  <Grid item mr={5}>
        <FormControl sx={{width:150}}>
          <InputLabel id="platform-select-label">Platform</InputLabel>
          <Select
            labelId="platform-select-label"
            id="platform-select"
            value={selectedPlatform}
            label="Platform"
            onChange={handlePlatformChange}
          >
            <MenuItem value="Namecheap">Namecheap</MenuItem>
            <MenuItem value="Dynadot">Dynadot</MenuItem>
            <MenuItem value="Dropcatch">Dropcatch</MenuItem>
            <MenuItem value="Namesilo">Namesilo</MenuItem>
            <MenuItem value="GoDaddy">GoDaddy</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        
        {//<Grid item><Divider orientation="vertical" flexItem variant="middle"/></Grid>
        }
        <Grid item>
              <Typography> Max Fast Bid Amount: </Typography>
              </Grid>
              <Grid item>
              <TextField
              label="Max Fast Bid"
              variant="outlined"
              value={maxFastBid}
              onChange={(e) => setMaxFastBid(e.target.value)}
              //fullWidth
            /></Grid>
            <Grid item>
            <Typography> No. of Iterations: </Typography>
            </Grid>
            <Grid item>
            <TextField
              label="Iterations"
              variant="outlined"
              value={iterations}
              onChange={(e) => setIterations(e.target.value)}
              //fullWidth
            />
            </Grid>
            <Grid item ml={3}>
        <Button variant="contained" color="primary" sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingRight:1,paddingLeft:1,paddingTop:0.1,paddingBottom:0.1,height:30}} onClick={handleSave}>
          Save
        </Button>
        </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default AlgoSettings;
