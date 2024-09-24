import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Stack, Grid, Divider, Snackbar, Alert } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api, { getFastBidSettings, setFastBidSettings } from './api';

const PreferencesNew = () => {
  // State for text fields
  const [platform, setPlatform] = useState(null);
  const [fastBid, setFastBid] = useState([]);
  const [liveTimings, setLiveTimings] = useState([]);
  const [changes, setChanges] = useState(false);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFastBid((prev) => {
      const newFastBid = [...prev];
      const index = platform.get(name);
      if (index !== -1) {
        newFastBid[index] = { ...newFastBid[index], bidBuffer: value };
      }
      return newFastBid;
    });
    setChanges(true);
  };

  const handleFastBidAmountChange = (event) => {
    const { name, value } = event.target;
    setFastBid((prev) => {
      const newFastBid = [...prev];
      const index = platform.get(name);
      if (index !== -1) {
        newFastBid[index] = { ...newFastBid[index], fastBidAmount: value };
      }
      return newFastBid;
    });
    setChanges(true);
  };

  const handleFastNChange = (event) => {
    const { name, value } = event.target;
    setFastBid((prev) => {
      const newFastBid = [...prev];
      const index = platform.get(name);
      if (index !== -1) {
        newFastBid[index] = { ...newFastBid[index], fastN: value };
      }
      return newFastBid;
    });
    setChanges(true);
  };

  const handleTextChangeFb = (event) => {
    const { name, value } = event.target;
    setFastBid((prev) => {
      const newFastBid = [...prev];
      const index = platform.get(name);
      if (index !== -1) {
        newFastBid[index] = { ...newFastBid[index], bidBufferFirstBid: value };
      }
      return newFastBid;
    });
    setChanges(true);
  };

  const handleTimeChange = (name, timeType, newValue) => {
    const timeString = newValue ? newValue.toLocaleTimeString('en-GB', { hour12: false }) : null;
    setLiveTimings((prev) => {
      const newLiveTimings = [...prev];
      const index = platform.get(name);
      if (index !== -1) {
        newLiveTimings[index] = { ...newLiveTimings[index], [timeType]: timeString };
      }
      return newLiveTimings;
    });
    setChanges(true);
  };

  useEffect(() => {
    getFastBidSettings()
      .then((response) => {
        console.log("response.data", response.data);
        setFastBid(response.data);
        let map = new Map();
        response.data.forEach((element) => {
          map.set(element.platform, response.data.indexOf(element));
        });
        console.log("map", map);
        setPlatform(map);
      //   setLiveTimings(response.data.map((item) => {
      //     console.log('startTime:',new Date(item.startTime), 'endTime:', new Date(item.endTime)); // Log the startTime and endTime
      //     const startTime = item.startTime ? new Date(item.startTime) : null;
      //     const endTime = item.endTime ? new Date(item.endTime) : null;
      //     return {
      //       platform: item.platform,
      //       startTime: startTime && !isNaN(startTime) ? startTime.toLocaleTimeString('en-GB', { hour12: false }) : null,
      //       endTime: endTime && !isNaN(endTime) ? endTime.toLocaleTimeString('en-GB', { hour12: false }) : null,
      //     };
      //   }));
      //   setChanges(false);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

      setLiveTimings(response.data.map((item) => {
        console.log('startTime:', item.startTime, 'endTime:', item.endTime); // Log the startTime and endTime
        const startTime = item.startTime ? new Date(item.startTime) : null;
        const endTime = item.endTime ? new Date(item.endTime) : null;
        return {
          platform: item.platform,
          startTime: startTime && !isNaN(startTime) ? startTime.toLocaleTimeString('en-GB', { hour12: false }) : null,
          endTime: endTime && !isNaN(endTime) ? endTime.toLocaleTimeString('en-GB', { hour12: false }) : null,
        };
      }));
      setChanges(false);
    })
    .catch((error) => {
      console.log(error);
    });
      
  }, []);

  useEffect(() => {
    console.log("liveTimings", liveTimings);
  }, [liveTimings]);

  const handleSave = () => {
    const dataToSend = {
      fastBid,
      liveTimings,
    };
    setFastBidSettings(dataToSend)
      .then(() => {
        setOpen(true);
        setChanges(false);
      })
      .catch((error) => {
        console.log(error);
        setOpen1(true);
      });
  };

  return (
    <Stack direction='column' spacing={4} marginBottom={15}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontWeight='bold' color='text.primary' align='left'>
          Preferences
        </Typography>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Alert severity='success' sx={{ width: '100%' }}>
            Details Saved!
          </Alert>
        </Snackbar>
        <Snackbar
          open={open1}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => {
            setOpen1(false);
          }}
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            Error Occurred!
          </Alert>
        </Snackbar>
        <Button
          disabled={!changes}
          onClick={handleSave}
          variant='contained'
          color='primary'
          sx={{
            backgroundColor: 'black',
            alignSelf: 'right',
            fontSize: 12,
            paddingRight: 1,
            paddingLeft: 1,
            paddingTop: 0.1,
            paddingBottom: 0.1,
            height: 30,
          }}
        >
          Save
        </Button>
      </Stack>
      <div>
        <Stack direction='column' spacing={4}>
          <Stack direction='column' justifyContent='flex-start' spacing={2}>
            <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.3}>
              <Typography fontWeight='bold' color='text.primary' align='left'>
                Bid Buffer
              </Typography>
              <Typography variant='caption'>(In seconds)</Typography>
              <Typography fontWeight='bold' color='text.primary' align='left'>
                :
              </Typography>
            </Stack>
            <Grid container rowSpacing={3} justifyContent='space-between'>
              {platform &&
                Array.from(platform.keys()).map((platformName) => {
                  if (platformName !== 'GoDaddy') {
                    return (
                      <Grid
                        item
                        xs={6}
                        md={1.7}
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <Typography variant='body1'>{platformName}:</Typography>
                        <TextField
                          label='buffer'
                          size='small'
                          name={platformName}
                          type='number'
                          value={fastBid[platform.get(platformName)]?.bidBuffer || ''}
                          onChange={handleTextChange}
                          margin='normal'
                          sx={{ width: 100 }}
                        />
                      </Grid>
                    );
                  }
                  return null;
                })}
              {platform && (
                <Grid
                  item
                  xs={6}
                  md={2.5}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography variant='body1'>{"GoDaddy"}:</Typography>
                  <TextField
                    label='buffer'
                    size='small'
                    name={"GoDaddy"}
                    type='number'
                    value={fastBid[platform.get("GoDaddy")]?.bidBuffer || ''}
                    onChange={handleTextChange}
                    margin='normal'
                    sx={{ width: 90 }}
                  />
                  <TextField
                    label='buffer first bid'
                    size='small'
                    name={"GoDaddy"}
                    type='number'
                    value={fastBid[platform.get("GoDaddy")]?.bidBufferFirstBid || ''}
                    onChange={handleTextChangeFb}
                    margin='normal'
                    sx={{ width: 105 }}
                  />
                </Grid>
              )}
              <Grid item sx={0} md={3.5}></Grid>
            </Grid>
          </Stack>
          <Divider />
          <Stack direction='column' justifyContent='flex-start' spacing={2}>
            <Typography fontWeight='bold' color='text.primary' align='left'>
              Fast Bid Setting:
            </Typography>
            <Grid container rowSpacing={3} justifyContent='space-between'>
              {platform &&
                Array.from(platform.keys()).map((platformName) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      md={3.5}
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <Typography variant='body1'>{platformName}:</Typography>
                      <TextField
                        label='Min Bid'
                        size='small'
                        name={platformName}
                        type='number'
                        value={fastBid[platform.get(platformName)]?.fastBidAmount || ''}
                        onChange={handleFastBidAmountChange}
                        margin='normal'
                        sx={{ width: 150 }}
                      />
                      <TextField
                        label='Fast Buffer'
                        size='small'
                        name={platformName}
                        type='number'
                        value={fastBid[platform.get(platformName)]?.fastN || ''}
                        onChange={handleFastNChange}
                        margin='normal'
                        sx={{ width: 90 }}
                      />
                    </Grid>
                  );
                })}
              <Grid item sx={0} md={3.5}></Grid>
            </Grid>
          </Stack>
          <Divider />
          <Stack direction='column' justifyContent='flex-start' spacing={2}>
            <Typography fontWeight='bold' color='text.primary' align='left'>
              Live Timings:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container rowSpacing={3} justifyContent='space-between'>
                {platform &&
                  Array.from(platform.keys()).map((platformName) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        md={3.5}
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <Typography variant='body1'>{platformName}:</Typography>
                        <TimePicker
                          label='Start Time'
                          value={liveTimings[platform.get(platformName)]?.startTime ? new Date(`1970-01-01T${liveTimings[platform.get(platformName)]?.startTime}`) : null}
                          onChange={(newValue) => handleTimeChange(platformName, 'startTime', newValue)}
                          renderInput={(params) => <TextField {...params} size='small' sx={{ width: 150 }} />}
                        />
                        <TimePicker
                          label='End Time'
                          value={liveTimings[platform.get(platformName)]?.endTime ? new Date(`1970-01-01T${liveTimings[platform.get(platformName)]?.endTime}`) : null}
                          onChange={(newValue) => handleTimeChange(platformName, 'endTime', newValue)}
                          renderInput={(params) => <TextField {...params} size='small' sx={{ width: 150 }} />}
                        />
                      </Grid>
                    );
                  })}
                <Grid item sx={0} md={3.5}></Grid>
              </Grid>
            </LocalizationProvider>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
};

export default PreferencesNew;