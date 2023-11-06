import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { instantbiddc, instantbiddyna, instantbidgd, instantbidnc, instantcloseoutgd1, schedulebiddc, schedulebiddyna, schedulebidgd, schedulebidnc, schedulebidns, schedulecloseoutgd, schedulecloseoutgd1 } from "../Components/api";
import { canBidDC, canBidDD, canBidGD, canBidNC, canBidNS, canCloseOut } from "../Components/msalService";

const BidPage = () => {
  const [plat, setPlat] = useState("Namecheap");
  const [open,setOpen]=useState(false);
  const [open1,setOpen1]=useState(false);
  const [open2,setOpen2]=useState(false);
 const res= React.useRef([]);const err= React.useRef("");
 const [checked, setChecked] = useState(false);
 const [value, setValue] = React.useState('');
 const handleChange = (event) => {
  setValue(event.target.value);
};
const switchHandler = (event) => {
  setChecked(event.target.checked);
  console.log(checked)
};
  return (
    <div>
      <Box
        sx={{
          padding: "20px 10px 5px 15px",
        }}
      >
      
        <Select
          sx={{ alignSelf: "center" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={plat}
          fullWidth={true}
          value={plat}
          label="Platforms"
          onChange={(event) => {
            setPlat(event.target.value);
          }}
        >
          {canBidDD()&&<MenuItem value={"Dynadot"}>Dynadot</MenuItem>}
          {canBidGD()&&<MenuItem value={"GoDaddy"}>GoDaddy</MenuItem>}
          {canCloseOut()&&<MenuItem value={"GDCloseouts"}>GD Closeouts</MenuItem>}
          {canBidDC()&&<MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>}
          {canBidNC()&&<MenuItem value={"Namecheap"}>Namecheap</MenuItem>}
          {canBidNS()&&<MenuItem value={"Namesilo"}>Namesilo</MenuItem>}

        </Select>
      </Box>
      <Divider style={{ padding: "15px" }}>
        <Typography variant="subtitle1" color="grey">
          BID
        </Typography>
      </Divider>
      <Snackbar open={open} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert onClose={()=>{setOpen(false);}} severity="info" sx={{ width: '100%' }}>
          Bid placed successfully for {res.current[0]}/{res.current[1]} domains.
        </Alert>
      </Snackbar>
      <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
        <Alert onClose={()=>{setOpen1(false);}} severity="info" sx={{ width: '100%' }}>
         Bid scheduled successfully for {res.current[0]}/{res.current[1]} domains.
        </Alert>
      </Snackbar>
      <Snackbar open={open2} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen2(false);}}>
        <Alert onClose={()=>{setOpen2(false);}} severity="error" sx={{ width: '100%' }}>
         {err.current}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          padding: "0px 10px 5px 15px",
        }}
      >
        {/* <Typography variant="button" color="GrayText">
          Enter Domains
        </Typography> */}
        <TextField
          id="outlined-textarea"
          label="Domain,Bid"
          placeholder=" Domain,Bid
          Domain,Bid
          Domain,Bid
          Domain,Bid"
          multiline
          rows={8}
          value={value}
            onChange={handleChange}
          margin="normal"
          fullWidth={true}
        />
        <Box
          sx={{
            padding: "3px 0px 2px",
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography //variant="h6" 
          color={"#2D2467"}>
            Instant Bid
          </Typography>
          <Switch
            checked={checked} onChange={switchHandler}
          color="success"
          />
        </Box>
      </Box>
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
            color: '#FFF'

          }}
          variant="contained"
          size="large"
          onClick={()=>{
            var arr= value.split("\n")
            var a= arr.map((ar)=> {return ar.split(',')});
            console.log(a);
            console.log(checked);

            if(plat==="Dynadot")
            {
            if(!checked)
            {schedulebiddyna(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Bid not scheduled for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not scheduled, SERVER ERROR!";setOpen2(true);console.log(error)});}
            else
            {
                instantbiddyna(a).then((Response)=>{console.log(Response.data); if(Response.data[0]!=0) {res.current=Response.data; setOpen(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)});
               
            }}
            else if(plat==="Dropcatch")
            {
              console.log(plat);

              if(!checked)
              {
                schedulebiddc(a).then((Response)=>{console.log(Response.data); if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Bid not scheduled for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not scheduled, SERVER ERROR!";setOpen2(true);console.log(error)});
              }
              else
              {
                instantbiddc(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)});
              }
            }

            else if(plat==="Namecheap")
            {
              console.log(plat);

              if(!checked)
              {
                schedulebidnc(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Bid not scheduled for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not scheduled, SERVER ERROR!";setOpen2(true);console.log(error)});
              }
              else
              {
                instantbidnc(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)});
              }
            }
            else if(plat==="GoDaddy")
            {
              console.log(plat);

              if(!checked)
              {
                schedulebidgd(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Bid not scheduled for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not scheduled, SERVER ERROR!";setOpen2(true);console.log(error)});
              }
              else
              {
                instantbidgd(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)});
              }
            }
            else if(plat==="GDCloseouts")
            {
            if(!checked)
              {schedulecloseoutgd1(a).then((Response)=>{console.log(Response.data); if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)})}
            else
            {
                instantcloseoutgd1(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen(true);} else {err.current="Bid not placed for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not placed, SERVER ERROR!";setOpen2(true);console.log(error)});  
            }} 
            else if(plat==="Namesilo")
            {
              console.log(plat);

              if(!checked)
              {
                schedulebidns(a).then((Response)=>{console.log(Response.data);if(Response.data[0]!=0) {res.current=Response.data; setOpen1(true);} else {err.current="Bid not scheduled for any of domains"; setOpen2(true)}}).catch(error=>{err.current="Bids not scheduled, SERVER ERROR!";setOpen2(true);console.log(error)});
              }
              else
              {
                //instantbidgd(a).then((Response)=>{console.log(Response.data); res.current=Response.data; setOpen(true);}).catch((error)=>console.log(error))
              }
            }

            setValue('');
            }} 
        >
          Bulk Bid
        </Button>
      </Box>
    </div>
  );
};

export default BidPage;
