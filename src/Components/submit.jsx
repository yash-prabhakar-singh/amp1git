import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, CssBaseline, Stack } from '@mui/material';
import bg from './images/bg.jpg' ;
//import { AxiosContext } from 'react-axios/lib/components/AxiosProvider';
import axios from 'axios';
import DTable from './ScheduledTable';

function Ssubmit() {

    const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    return (<Box>
        <CssBaseline/>
    <Box sx={{backgroundImage: `url${bg}`, backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', height : '100vh' }}><Box padding={5}
        component="form"
        sx={{
           width: '55vw'
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          
          <TextField
            id="outlined-multiline-static"
            name='domainbids'
            label="Domain,Bids"
            multiline
            fullWidth
            rows={10}
            defaultValue="Domain,Bid"
            onChange={handleChange}
          />
        </div>
        <Stack direction='row' alignContent='right' justifyContent='right' marginTop={1.2}>
        <Button onClick={()=>{
            var arr= value.split("\n")
            var a= arr.map((ar)=> {return ar.split(',')});
            console.log(a);
            axios.post('http://localhost:8080/postDomains',a)}} sx={{alignSelf : "right"}} variant="contained">Submit</Button></Stack>
        </Box>
        <Box marginTop={5} width={1050} marginLeft={5}>
        <DTable />  
        </Box >
        </Box></Box>)}

        export default Ssubmit;