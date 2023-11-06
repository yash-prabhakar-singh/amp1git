import * as React from 'react';

import { alpha, AppBar, Box, Button, Card, CardActionArea, CssBaseline, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Switch, Tab, Toolbar, Typography,Menu, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function Apikeys() {

  const [ddkey, setDdkey] = React.useState('8B8Y70UXd7o7D58A8rh7N829B629L9H8W9G7e7q9W8d');
  const [dcid, setDcid] = React.useState('babyyoda:hawk');
  const [dcsecret, setDcseccret] = React.useState(':pvN|?\'Sb4.Ah2N0t+7M');

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
    typography: {
      fontFamily: [
        'Nunito',
        'Train One',
        'Roboto',
        
        
        'sans-serif',
        'cursive'
      ].join(",")
    
    }
    }
    );

    const navigate = useNavigate();
    const handleChangedd = (event) => {
      setDdkey(event.target.value);
    };

  

  return (
   <Stack direction='row'  width='100%' justifyContent='center'>
   <Stack direction='column' spacing={2}>
   <Stack direction='column' spacing={1}>
   <Typography  fontWeight='bold'  align='left'>Dynadot :</Typography>
   <Stack direction='row' spacing={2} paddingLeft={3} alignItems='center'>
    <Typography fontWeight='bold' fontStyle='italic' variant='subtitle2' align='left'>API Key :</Typography>
    <TextField
            id="outlined-multiline-static"
            name='domainbids'
          size='small'
            onChange={handleChangedd}
            value={ddkey}
            sx={{width:470}}
          />
   </Stack>
   </Stack>
   <Stack direction='column' spacing={1}>
   <Typography  fontWeight='bold'  align='left'>Dropcatch :</Typography>
   <Stack direction='row' spacing={3} paddingLeft={3} alignItems='center'>
   <Stack direction='row' spacing={2}  alignItems='center'>
    <Typography fontWeight='bold' fontStyle='italic' variant='subtitle2' align='left'>Client Id :</Typography>
    <TextField
            id="outlined-multiline-static"
            name='domainbids'
          size='small'
            onChange={handleChangedd}
            value={dcid}
            sx={{width:150}}
          />
        </Stack>
        <Stack direction='row' spacing={2}  alignItems='center'>
    <Typography fontWeight='bold' fontStyle='italic' variant='subtitle2' align='left'>Client Secret :</Typography>
    <TextField
            id="outlined-multiline-static"
            name='domainbids'
          size='small'
            onChange={handleChangedd}
            value={dcsecret}
            sx={{width:220}}
          />
        </Stack>
   </Stack>
   </Stack>
   </Stack>
   </Stack>
    
  );
}
