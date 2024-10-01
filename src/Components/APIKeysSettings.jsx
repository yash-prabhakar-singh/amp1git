/*import * as React from 'react';

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
*/
//export default function Apikeys()


import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  Stack,
  FormControlLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getAPIKeySettings, setAPIKeySettings, setLiveFilterSettings } from './api';

export default function Apikeys(){
  const [apiKeys, setApiKeys] = useState({
    Dynadot: { main: 'MainKey1', mainVisibility:false,auctionUN:'', alt: 'AltKey1',altVisibility:false, altEnabled: false, hold:'', holdVisibility:false,portfolioUN:''},
    Dropcatch: {
      clientId: 'ClientId',
      clientIdVisibility:false,
      clientSecret: 'ClientSecret',
      clientSecretVisibility:false,
      auctionUN:'',
      altClientId: 'AltClientId',
      altClientIdVisibility:false,
      altClientSecret: 'AltClientSecret',
      altClientSecretVisibility:false,
      altEnabled: false,
      holdClientId:'',
      holdClientIdVisibility:false,
      holdClientSecret:'',
      holdClientSecretVisibility:false,
      portfolioUN:'',
    },
    Namecheap: { main: 'MainKey3', mainVisibility:false, auctionUN:'', alt: 'AltKey3', altVisibility:false, altEnabled: true, hold:'', holdVisibility:false,portfolioUN:'' },
    GoDaddy: { key: 'Key4', keyVisibility:false, secret: 'Secret4', secretVisibility:false, auctionUN:'', altKey: 'AltKey4', altKeyVisibility:false, altSecret: 'AltSecret4', altSecretVisibility:false, altEnabled: false,
    restKey: 'Key4', restKeyVisibility:false, restSecret: 'Secret4', restSecretVisibility:false, restAltKey: 'AltKey4', restAltKeyVisibility:false, restAltSecret: 'AltSecret4', restAltSecretVisibility:false, restAltEnabled: false, holdKey:'', holdKeyVisibility:false, holdSecret:'', holdSecretVisibility:false,portfolioUN:'' },
    Namesilo: { main: 'MainKey5', mainVisibility:false, auctionUN:'', alt: 'AltKey5', altVisibility:false, altEnabled: false, hold:'', holdVisibility:false,portfolioUN:'' },
  });

  // const [usernames, setUsernames] = useState({
  //   Dynadot: { auctionUN: '', portfolioUN: '' },
  //   Dropcatch: { auctionUN: '', portfolioUN: '' },
  //   Namecheap: { auctionUN: '', portfolioUN: '' },
  //   GoDaddy: { auctionUN: '', portfolioUN: '' },
  //   Namesilo: { auctionUN: '' , portfolioUN:''},
  // });

 
  const [open,setOpen]= React.useState(false);
  const [open1,setOpen1]= React.useState(false);

  const handleApiKeyChange = (platform, type, value) => {
    setApiKeys((prevApiKeys) => ({
      ...prevApiKeys,
      [platform]: {
        ...prevApiKeys[platform],
        [type]: value,
      },
    }));
  };


  // const handleUsernameChange = (platform, type, value) => {
  //   setUsernames((prevUsernames) => ({
  //     ...prevUsernames,
  //     [platform]: {
  //       ...prevUsernames[platform],
  //       [type]: value,
  //     },
  //   }));
  // };


  const handleToggleVisibility = (platform, type) => {
    setApiKeys((prevApiKeys) => ({
      ...prevApiKeys,
      [platform]: {
        ...prevApiKeys[platform],
        [`${type}Visibility`]: !prevApiKeys[platform][`${type}Visibility`],
      },
    }));
  };

  const handleToggleAltEnabled = (platform) => {
    if(platform==='Namechea')
    setApiKeys((prevApiKeys) => ({
      ...prevApiKeys,
      [platform]: {
        ...prevApiKeys[platform],
        altEnabled: !prevApiKeys[platform].altEnabled,
      },
    }));
  };
  const handleToggleAltEnabledGDRest = () => {
    /*setApiKeys((prevApiKeys) => ({
      ...prevApiKeys,
      ["GoDaddy"]: {
        ...prevApiKeys["GoDaddy"],
        restAltEnabled: !prevApiKeys["GoDaddy"].restAltEnabled,
      },
    }));*/
  };
 
useEffect(()=>{
  
  getAPIKeySettings().then((res)=>{
  console.log(res.data)
  setApiKeys({
  Dynadot: { main: res.data[0].ddKey, mainVisibility:false, auctionUN:res.data[0].dd_username, alt: res.data[1].ddKey,altVisibility:false, altEnabled: false, hold:res.data[2].ddKey, holdVisibility:false,portfolioUN:res.data[2].dd_username },
  Dropcatch: {
    clientId: res.data[0].dcId,
    clientIdVisibility:false,
    clientSecret: res.data[0].dcSecret,
    clientSecretVisibility:false,
    auctionUN:res.data[0].dc_username,
    altClientId:res.data[1].dcId,
    altClientIdVisibility:false,
    altClientSecret:res.data[1].dcSecret,
    altClientSecretVisibility:false,
    altEnabled: false,
    holdClientId:res.data[2].dcId,
    holdClientIdVisibility:false,
    holdClientSecret:res.data[2].dcSecret,
    holdClientSecretVisibility:false,
    portfolioUN:res.data[2].dc_username,
  },
  Namecheap: { main: res.data[0].ncKey, mainVisibility:false, auctionUN:res.data[0].nc_username, alt: res.data[1].ncKey, altVisibility:false, altEnabled: true, hold:res.data[2].ncKey, holdVisibility:false,portfolioUN:res.data[2].nc_username },
  GoDaddy: { key: res.data[0].gdKey, keyVisibility:false, secret: res.data[0].gdSecret, secretVisibility:false, auctionUN:res.data[0].gd_username, altKey: res.data[1].gdKey, altKeyVisibility:false, altSecret: res.data[1].gdSecret, altSecretVisibility:false, altEnabled: false,
  restKey: res.data[0].gdKeyRest, restKeyVisibility:false, restSecret: res.data[0].gdKeySecret, restSecretVisibility:false, restAltKey: res.data[1].gdKeyRest, restAltKeyVisibility:false, restAltSecret: res.data[1].gdKeyRest, restAltSecretVisibility:false, restAltEnabled: false,
  holdKey:res.data[2].gdKeyRest, holdKeyVisibility:false, holdSecret:res.data[2].gdKeyRest, holdSecretVisibility:false,portfolioUN:res.data[2].gd_username },
  Namesilo: { main: res.data[0].nsKey, mainVisibility:false, auctionUN:res.data[0].ns_username, alt: res.data[1].nsKey, altVisibility:false, altEnabled: false, hold:res.data[2].nsKey, holdVisibility:false,portfolioUN:res.data[2].ns_username},
})}).catch((err)=>{console.log(err)})},[])

  // const handleSaveChanges = () => {
  //   // Add your logic to save changes to the backend or perform other actions
  //   console.log('API keys saved:', apiKeys);
  // };

  // const handleSaveChanges = () => {
  //   const combinedData = {
  //     apiKeys,
  //     usernames,
  //   };
  //   setAPIKeySettings(combinedData)
  //     .then((res) => setOpen(true))
  //     .catch((error) => {
  //       console.log(error);
  //       setOpen1(true);
  //     });
  // }

  return (
    <Container maxWidth="xl" sx={{marginBottom:10}}>
      <Stack justifyContent='start' alignItems='start' mt={4} width='100%'>
      
        <Stack direction='row' justifyContent='space-between' width='100%'>
       <Typography fontWeight='bold' color='text.primary' align='left'>
       Manage Your API Keys
      </Typography>

      <Button onClick={()=>{console.log(apiKeys);setAPIKeySettings(apiKeys).then((res)=>setOpen(true)).catch((error)=>{console.log(error);setOpen1(true)})}} variant="contained" color="primary" sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingRight:1,paddingLeft:1,paddingTop:0.1,paddingBottom:0.1,height:30}}>
        Save
      </Button>

      <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
        Details Saved!
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen1(false);}}>
        <Alert  severity="error" sx={{ width: '100%' }}>
        Error Occurred!
        </Alert>
      </Snackbar>
       </Stack>
       <Typography  mt={3} fontWeight='bold' color='text.primary' align='left'>
       Buying Keys:
      </Typography>

        <Box mt={2} width='100%'>
        <Grid container justifyContent='space-between' width='100%' mt={4}>
          <Grid item xs={6}>
            <Typography fontWeight='bold' color='text.primary' align='left' variant="h6">
              Auction API Keys
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontWeight='bold' color='text.primary' align='left' variant="h6">
              Portfolio API Keys
            </Typography>
          </Grid>
        </Grid>
            <Box key={"Dynadot"} mt={4}>
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Dynadot</Typography>
                    {/* <FormControlLabel label="Enable Alternate" labelPlacement='start' control={<Switch
                    checked={apiKeys.Dynadot.altEnabled}
                    onChange={() => handleToggleAltEnabled("Dynadot")}/>} /> */}

              
                  </Stack>

              <Grid container spacing={2}>
                  
                    <Grid item xs={6}>
                      <TextField
                        label={"Main API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dynadot.main}
                        onChange={(e) => handleApiKeyChange("Dynadot", 'main', e.target.value)}
                        type={apiKeys.Dynadot.mainVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dynadot", 'main')}>
                                {apiKeys.Dynadot.mainVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label={"Hold API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dynadot.hold}
                        onChange={(e) => handleApiKeyChange("Dynadot", 'hold', e.target.value)}
                        type={apiKeys.Dynadot.holdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dynadot", 'alt')}>
                                {apiKeys.Dynadot.holdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // disabled={!apiKeys.Dynadot.altEnabled}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dynadot.auctionUN}
                        onChange={(e) => handleApiKeyChange("Dynadot", 'auctionUN', e.target.value)}
                        type="text"
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Dynadot", 'main')}>
                        //         {apiKeys.Dynadot.mainVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dynadot.portfolioUN}
                        onChange={(e) => handleApiKeyChange("Dynadot", 'portfolioUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Dynadot", 'alt')}>
                        //         {apiKeys.Dynadot.altVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                        // disabled={!apiKeys.Dynadot.altEnabled}
                      />
                    </Grid>

              </Grid>
            </Box>


            <Box key={"Dropcatch"} mt={4}>
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Dropcatch</Typography>
                    {/* <FormControlLabel label="Enable Alternate" labelPlacement='start' control={<Switch
                    checked={apiKeys.Dropcatch.altEnabled}
                    onChange={() => handleToggleAltEnabled("Dropcatch")}/>} /> */}
            
                  </Stack>
              <Grid container spacing={2}>
                  
                    <Grid container spacing={2} item xs={6}>
                    <Grid item xs={6}>
                      <TextField
                        label={"Main Client Id"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.clientId}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'clientId', e.target.value)}
                        type={apiKeys.Dropcatch.clientIdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'clientId')}>
                                {apiKeys.Dropcatch.clientIdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Main Client Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.clientSecret}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'clientSecret', e.target.value)}
                        type={apiKeys.Dropcatch.clientSecretVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'clientSecret')}>
                                {apiKeys.Dropcatch.clientSecretVisibility? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    </Grid>
                    <Grid container spacing={2} item xs={6}>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Client Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.holdClientId}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'holdClientId', e.target.value)}
                        type={apiKeys.Dropcatch.holdClientIdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'holdClientId')}>
                                {apiKeys.Dropcatch.holdClientIdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // disabled={!apiKeys.Dropcatch.altEnabled}

                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Client Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.holdClientSecret}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'holdClientSecret', e.target.value)}
                        type={apiKeys.Dropcatch.holdClientSecretVisibility? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'holdClientSecret')}>
                                {apiKeys.Dropcatch.holdClientSecretVisibility? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // disabled={!apiKeys.Dropcatch.altEnabled}

                      />
                    </Grid>
                    </Grid>


                    {/* <Grid container spacing={2} item xs={6}> */}
                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.auctionUN}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'auctionUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'clientId')}>
                        //         {apiKeys.Dropcatch.clientIdVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </Grid>
                    {/* <Grid item xs={6}>
                      <TextField
                        label={"Main Client Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.clientSecret}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'clientSecret', e.target.value)}
                        type={apiKeys.Dropcatch.clientSecretVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'clientSecret')}>
                                {apiKeys.Dropcatch.clientSecretVisibility? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid> */}

                    {/* </Grid> */}

                    {/* <Grid container spacing={2} item xs={6}> */}
                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.portfolioUN}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'portfolioUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'altClientId')}>
                        //         {apiKeys.Dropcatch.altClientIdVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                        // disabled={!apiKeys.Dropcatch.altEnabled}

                      />
                    </Grid>
                    {/* <Grid item xs={6}>
                      <TextField
                        label={"Alt Client Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.altClientSecret}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'altClientSecret', e.target.value)}
                        type={apiKeys.Dropcatch.altClientSecretVisibility? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'altClientSecret')}>
                                {apiKeys.Dropcatch.altClientSecretVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        disabled={!apiKeys.Dropcatch.altEnabled}
                      />
                    </Grid> */}

                    {/* </Grid> */}
                   
              </Grid>
            </Box>
            <Box mt={2} width='100%'>
            <Box key={"Namecheap"} mt={4}>
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Namecheap</Typography>
                    {/* <FormControlLabel label="Enable Alternate" labelPlacement='start' control={<Switch
                    checked={apiKeys.Namecheap.altEnabled}
                    onChange={() => handleToggleAltEnabled("Namecheap")}/>} /> */}

                  
                  </Stack>
              <Grid container spacing={2}>
                  
                    <Grid item xs={6}>
                      <TextField
                        label={"Main API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namecheap.main}
                        onChange={(e) => handleApiKeyChange("Namecheap", 'main', e.target.value)}
                        type={apiKeys.Namecheap.mainVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Namecheap", 'main')}>
                                {apiKeys.Namecheap.mainVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namecheap.hold}
                        onChange={(e) => handleApiKeyChange("Namecheap", 'hold', e.target.value)}
                        type={apiKeys.Namecheap.holdVisibility  ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Namecheap", 'hold')}>
                                {apiKeys.Namecheap.holdVisibility  ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // disabled={!apiKeys.Namecheap.altEnabled}
                      />
                    </Grid>


                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namecheap.auctionUN}
                        onChange={(e) => handleApiKeyChange("Namecheap", 'auctionUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Namecheap", 'main')}>
                        //         {apiKeys.Namecheap.mainVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namecheap.portfolioUN}
                        onChange={(e) => handleApiKeyChange("Namecheap", 'portfolioUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Namecheap", 'alt')}>
                        //         {apiKeys.Namecheap.altVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                        // disabled={!apiKeys.Namecheap.altEnabled}
                      />
                    </Grid>

              </Grid>
            </Box>


            <Box key={"GoDaddy"} mt={4}>
            <Typography fontWeight='bold' color='text.primary' align='left'>GoDaddy</Typography>
              <Stack direction='row' mt={4} justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.secondary' align='left'>SOAP</Typography>
                    {/* <FormControlLabel label="Enable Alternate" labelPlacement='start' control={<Switch
                    checked={apiKeys.GoDaddy.altEnabled}
                    onChange={() => handleToggleAltEnabled("GoDaddy")}/>} /> */}

                  
                  </Stack>

              <Grid container spacing={2}>
                  <Grid container spacing={2} item xs={6}>
                    <Grid item xs={6}>
                      <TextField
                        label={"Main Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.key}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'key', e.target.value)}
                        type={apiKeys.GoDaddy.keyVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'key')}>
                                {apiKeys.GoDaddy.keyVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label={"Main Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.secret}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'secret', e.target.value)}
                        type={apiKeys.GoDaddy.secretVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'secret')}>
                                {apiKeys.GoDaddy.secretVisibility? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}


                      />
                    </Grid>

                  </Grid>

                  <Grid container spacing={2} item xs={6}>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.holdKey}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'holdKey', e.target.value)}
                        type={apiKeys.GoDaddy.holdKeyVisibility  ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'holdKey')}>
                                {apiKeys.GoDaddy.holdKeyVisibility  ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        disabled={true}

                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.holdSecret}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'holdSecret', e.target.value)}
                        type={apiKeys.GoDaddy.holdSecretVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'holdSecret')}>
                                {apiKeys.GoDaddy.holdSecretVisibility  ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        disabled={true}

                      />
                    </Grid>
                  </Grid>


                   
              </Grid>
              <Stack direction='row' mt={4} justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.secondary' align='left'>REST</Typography>
                    {/* <FormControlLabel label="Enable Alternate" labelPlacement='start' control={<Switch
                    checked={apiKeys.GoDaddy.restAltEnabled}
                    onChange={() => handleToggleAltEnabledGDRest()}/>} /> */}

                  
                  </Stack>

              <Grid container spacing={2}>
                  
                  <Grid container spacing={2} item xs={6}>
                    <Grid item xs={6}>
                      <TextField
                        label={"Main Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.restKey}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'restKey', e.target.value)}
                        type={apiKeys.GoDaddy.restKeyVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'restKey')}>
                                {apiKeys.GoDaddy.restKeyVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>



                    <Grid item xs={6}>
                      <TextField
                        label={"Main Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.restSecret}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'restSecret', e.target.value)}
                        type={apiKeys.GoDaddy.restSecretVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'restSecret')}>
                                {apiKeys.GoDaddy.restSecretVisibility? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>


                  <Grid container spacing={2} item xs={6}>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.holdKey }
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'holdKey', e.target.value)}
                        type={apiKeys.GoDaddy.holdKeyVisibility  ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'holdKey')}>
                                {apiKeys.GoDaddy.holdKeyVisibility  ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // disabled={!apiKeys.GoDaddy.restAltEnabled}

                      />
                    </Grid>


                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.holdSecret}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'holdSecret', e.target.value)}
                        type={apiKeys.GoDaddy.holdSecretVisibility  ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'holdSecret')}>
                                {apiKeys.GoDaddy.holdSecretVisibility   ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // disabled={!apiKeys.GoDaddy.restAltEnabled}
                      />
                    </Grid>

                  </Grid>

                  <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.auctionUN}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'auctionUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'restAltKey')}>
                        //         {apiKeys.GoDaddy.restAltKeyVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                        // disabled={!apiKeys.GoDaddy.restAltEnabled}

                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.portfolioUN}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'portfolioUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'restAltSecret')}>
                        //         {apiKeys.GoDaddy.restAltSecret ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                        // disabled={!apiKeys.GoDaddy.restAltEnabled}
                      />
                    </Grid>
                   
              </Grid>
            </Box>


            <Box key={"Namesilo"} mt={4}>
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Namesilo</Typography>
                    {/* <FormControlLabel label="Enable Alternate" labelPlacement='start' control={<Switch
                    checked={apiKeys.Namesilo.altEnabled}
                    onChange={() => handleToggleAltEnabled("Namesilo")}/>} /> */}

                  
                  </Stack>
              <Grid container spacing={2}>
                  
                    <Grid item xs={6}>
                      <TextField
                        label={"Main API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namesilo.main}
                        onChange={(e) => handleApiKeyChange("Namesilo", 'main', e.target.value)}
                        type={apiKeys.Namesilo.mainVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Namesilo", 'main')}>
                                {apiKeys.Namesilo.mainVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid  item xs={6}>
                      <TextField
                        label={"Hold API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namesilo.hold}
                        onChange={(e) => handleApiKeyChange("Namesilo", 'hold', e.target.value)}
                        type={apiKeys.Namesilo.holdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Namesilo", 'hold')}>
                                {apiKeys.Namesilo.holdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        // disabled={!apiKeys.Namesilo.altEnabled}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namesilo.auctionUN}
                        onChange={(e) => handleApiKeyChange("Namesilo", 'auctionUN', e.target.value)}
                        type='text'
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Namesilo", 'main')}>
                        //         {apiKeys.Namesilo.mainVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                      />
                    </Grid>
                    <Grid  item xs={6}>
                      <TextField
                        label={"Username"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namesilo.portfolioUN}
                        onChange={(e) => handleApiKeyChange("Namesilo", 'portfolioUN', e.target.value)}
                        type= 'text' 
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton onClick={() => handleToggleVisibility("Namesilo", 'alt')}>
                        //         {apiKeys.Namesilo.altVisibility ? <Visibility /> : <VisibilityOff />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
                        // disabled={!apiKeys.Namesilo.altEnabled}
                      />
                    </Grid>


              </Grid>
            </Box>

        </Box>
        </Box>

      {/* <Typography  mt={3} fontWeight='bold' color='text.primary' align='left'>
       Holding Keys:
      </Typography>

        <Grid container justifyContent='space-between' alignItems='center'  mt={2} width='100%'  >
            <Grid item xs={5.9} mt={4} key={"Dynadot"}  >
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Dynadot</Typography>
              </Stack>
              <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label={"Hold API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dynadot.hold}
                        onChange={(e) => handleApiKeyChange("Dynadot", 'hold', e.target.value)}
                        type={apiKeys.Dynadot.holdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dynadot", 'hold')}>
                                {apiKeys.Dynadot.holdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5.9} mt={4} key={"Dropcatch"} >
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Dropcatch</Typography>
              </Stack>
              <Grid container spacing={2} justifyContent='space-between'>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Client Id"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.holdClientId}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'holdClientId', e.target.value)}
                        type={apiKeys.Dropcatch.holdClientIdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'holdClientId')}>
                                {apiKeys.Dropcatch.holdClientIdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Client Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Dropcatch.holdClientSecret}
                        onChange={(e) => handleApiKeyChange("Dropcatch", 'holdClientSecret', e.target.value)}
                        type={apiKeys.Dropcatch.holdClientSecretVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Dropcatch", 'holdClientSecret')}>
                                {apiKeys.Dropcatch.holdClientSecretVisibility? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5.9} mt={4} key={"Namecheap"}>
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Namecheap</Typography>
              </Stack>
              <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label={"Hold API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namecheap.hold}
                        onChange={(e) => handleApiKeyChange("Namecheap", 'hold', e.target.value)}
                        type={apiKeys.Namecheap.holdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Namecheap", 'hold')}>
                                {apiKeys.Namecheap.holdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5.9} mt={4} key={"GoDaddy"}>
              <Stack direction='row' width='100%' spacing={1}> <Typography fontWeight='bold' color='text.primary' align='left'>GoDaddy</Typography><Typography fontWeight='bold' color='text.secondary' align='left'>REST</Typography>
              </Stack>
              <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.holdKey}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'holdKey', e.target.value)}
                        type={apiKeys.GoDaddy.holdKeyVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                                  <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'holdKey')}>
                                {apiKeys.GoDaddy.holdKeyVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label={"Hold Secret"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.GoDaddy.holdSecret}
                        onChange={(e) => handleApiKeyChange("GoDaddy", 'holdSecret', e.target.value)}
                        type={apiKeys.GoDaddy.holdSecretVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleToggleVisibility("GoDaddy", 'holdSecret')}>
                                {apiKeys.GoDaddy.holdSecretVisibility? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
              </Grid>
            </Grid>

            <Grid item xs={5.9} mt={4} key={"Namesilo"}>
              <Stack direction='row' justifyContent='space-between' width='100%'><Typography fontWeight='bold' color='text.primary' align='left'>Namesilo</Typography>
              </Stack>
              <Grid container  spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label={"Hold API Key"}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={apiKeys.Namesilo.hold}
                        onChange={(e) => handleApiKeyChange("Namesilo", 'hold', e.target.value)}
                        type={apiKeys.Namesilo.holdVisibility ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => handleToggleVisibility("Namesilo", 'hold')}>
                                {apiKeys.Namesilo.holdVisibility ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
              </Grid>

            </Grid>
        </Grid> */}
    </Stack>
    
    </Container>
  );
};

