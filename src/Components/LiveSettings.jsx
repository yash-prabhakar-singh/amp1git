import React, { useState } from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, TextField, Slider, Box, Button, Stack, Grid, Divider, Chip, Snackbar, Alert } from '@mui/material';
import DynamicTextInput from './DynamicTextInput';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import api, { getLiveFilterSettings, setLiveFilterSettings } from './api';

const LiveSettings= () => {
  // State for checkboxes
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  // State for text fields
  const [text1, setText1] = useState(0);
  const [text2, setText2] = useState(0);
  const [text3, setText3] = useState(0);
  const [text4, setText4] = useState(0);
  const [text5, setText5] = useState(0);
  const [text6, setText6] = useState(0);
  const [text7, setText7] = useState('');

  // State for range slider
  const [sliderValue, setSliderValue] = useState([0,25]);
  const [inputValue, setInputValue] = useState('');
  const [textInputs, setTextInputs] = useState(new Set());
  const [open,setOpen]= React.useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setTextInputs((prevInputs) => new Set([...prevInputs, inputValue.trim()]));
      setInputValue('');
    }
  };

  const handleRemoveInput = (input) => {
    const updatedInputs = new Set(textInputs);
    updatedInputs.delete(input);
    setTextInputs(updatedInputs);
  };
  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    if (event.target.name === 'No-Hyphens') {
      setCheckbox1(event.target.checked);
    } else if (event.target.name === 'No-Numbers') {
      setCheckbox2(event.target.checked);
    }
  };

  // Handle text field change
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    if (name === 'text1') {
      setText1(value);
    } else if (name === 'text2') {
      setText2(value);
    } else if (name === 'text3') {
      setText3(value);
    } else if (name === 'text4') {
      setText4(value);
    } else if (name === 'text5') {
      setText5(value);
    } else if (name === 'text6') {
      setText6(value);
    }
    else if (name === 'text7') {
        setText7(value);
      }
  };

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  useEffect(()=>{getLiveFilterSettings().then((response)=>{console.log(response.data);setCheckbox1(response.data.noHyphens);setCheckbox2(response.data.noNumbers); setText1(response.data.diff_exts_ests[0]);
    setText2(response.data.diff_exts_ests[1]);setText3(response.data.diff_exts_ests[2]);setText4(response.data.diff_exts_ests[3]);setText5(response.data.diff_exts_ests[4]);setText6(response.data.diff_exts_ests[5]);
    setText7(response.data.new_ests);setTextInputs(response.data.restrictedExts)}).catch((error)=>{console.log(error)})},[]);
  return (
    <Stack direction='column' spacing={4} marginBottom={15}>
        
       <Stack direction='row' justifyContent='space-between' >
       <Typography fontWeight='bold' color='text.primary' align='left'>
        Live Settings
      </Typography>
      <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert  severity="success" sx={{ width: '100%' }}>
        Details Saved!
        </Alert>
      </Snackbar>
      <Button onClick={()=>{setLiveFilterSettings(checkbox1,checkbox2,sliderValue,text1,text2,text3,text4,text5,text6,text7,Array.from(textInputs)).then(()=>setOpen(true)).catch((error)=>{console.log(error)})}} variant="contained" color="primary" sx={{backgroundColor:'black' ,alignSelf : "right",fontSize:12, paddingRight:1,paddingLeft:1,paddingTop:0.1,paddingBottom:0.1,height:30}}>
        Save
      </Button>
       </Stack>
    <div>
    <Stack direction='column' spacing={4}>
        <Stack direction='column' justifyContent='flex-start' spacing={2}>
        <Typography fontWeight='bold' color='text.primary' align='left'>
        General: 
      </Typography>
        <Stack direction='row' justifyContent='space-between' >
      <FormGroup>
        <Stack direction='row'>
        <FormControlLabel
          control={<Checkbox checked={checkbox1} onChange={handleCheckboxChange} name="No-Hyphens" />}
          label="No-Hyphens"
        />
        <FormControlLabel
          control={<Checkbox checked={checkbox2} onChange={handleCheckboxChange} name="No-Numbers" />}
          label="No-Numbers"
        />
        </Stack>
        
      </FormGroup>
      <Stack direction='row' spacing={3} paddingTop={1}> <Typography >
        Domain Length Range:
      </Typography>
      <Box paddingRight={3} sx={{ width: 300 }}><Slider size='small'  max={40} valueLabelDisplay="auto" value={sliderValue} onChange={handleSliderChange} /></Box></Stack>
      </Stack>
      </Stack>
      <Divider/>
<Stack direction='column'>
      <Typography fontWeight='bold' color='text.primary' align='left'>
        Min ESTs: 
      </Typography>
      <Grid container  rowSpacing={3} columnSpacing={20}>
        <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">COM:</Typography>
          <TextField name="text1" type='number' value={text1} onChange={handleTextChange} margin="normal" sx={{width:150}} />
        </Grid>
        <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">NET/ORG/INFO:</Typography>
          <TextField name="text2" type='number' value={text2} onChange={handleTextChange} margin="normal" sx={{width:150}}/>
        </Grid>
        <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">CO/ME/TV:</Typography>
          <TextField name="text3" type='number' value={text3} onChange={handleTextChange} margin="normal" sx={{width:150}}/>
        </Grid>
        <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1"> AI/IO:</Typography>
          <TextField name="text4" type='number' value={text4} onChange={handleTextChange} margin="normal" sx={{width:150}}/>
        </Grid>
        <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography  variant="body1">New Ext:</Typography>
          <TextField name="text5" type='number' value={text5} onChange={handleTextChange} margin="normal" sx={{width:150}}/>
        </Grid>
        <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="body1">Anything else:</Typography>
          <TextField name="text6" type='number' value={text6} onChange={handleTextChange} margin="normal" sx={{width:150}}/>
        </Grid>
        </Grid>
        <Stack direction='row' marginTop={3} spacing={3}> <Typography marginTop={1} variant="body1">New&nbsp;Exts:</Typography>
          <TextField name="text7" size='small' value={text7} onChange={handleTextChange} margin="normal" fullWidth//sx={{width:550}}
          />
</Stack>
        </Stack>
        <Divider/>
        <div>
            <Stack direction='column' spacing={2}>
            <Typography fontWeight='bold' color='text.primary' align='left'>
        Restricted Extns: 
      </Typography>      
      <Stack direction='row' spacing={10}>
      <TextField
        label="Extns"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        variant="outlined"
        margin="normal"
      />
      <Box paddingTop={3} sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {[...textInputs].map((input) => (
          <Chip
            key={input}
            label={input}
            onDelete={() => handleRemoveInput(input)}
            deleteIcon={<CloseIcon />}
            color="primary"
          />
        ))}
      </Box>
     
      </Stack>
      </Stack>
    </div>

    
      </Stack>
    </div>
    </Stack>
  );
};

export default LiveSettings;
