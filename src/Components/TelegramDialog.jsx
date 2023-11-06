import React, { useState, useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import msalConfig from "./msalConfig";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Link, Typography } from "@mui/material";
import { getOtp, getUser } from "./api";
import { Telegram } from "@mui/icons-material";



const TelegramDialog = (props) => {
  const { instance,accounts } = useMsal();
  const [user, setUser] = useState({});
  
 
  

useEffect(() => {
  getUser().then((res)=>{setUser(res.data)}).catch((err)=>{console.log(err)});
  },[]); // removing [instance] argument to refresh component on every load
return (
    
     <Dialog
            open={props.open}
            maxWidth='md'
            //onClose={handleClose}
            >
              <DialogTitle  id="alert-dialog-title">
              {"Integrate Your Telegram Account "} <Telegram />
        </DialogTitle>
        <DialogContent>
        {!user.telegram ?<DialogContentText id="alert-dialog-description">
             You are most probably logging in for the first time, You need to integrate your Telegram with us.<br/><br/>
            You can do this by visiting bot at <Link target="_blank" href="https://t.me/LivyNamekartbot" underline="hover">Namekart Bot</Link> and clicking "/verify" button given in Menu ( OR texting "/verify" command to bot) and then follow all the instructions, and after completion, wait for Admin's approval.

            <br/> <br/>This is the Verification Code (you may need while verification in Telegram): <Typography fontWeight='bold'>{user.otp}</Typography>
            <br/>
            If you have already done this, then your verification must be pending from Admin's side. After admin's approval you need to login again, So if you have 
            completed steps for Telegram verification from your side ( by visiting our Telegram Bot ), you may Log-Out now.
          </DialogContentText>
          : <DialogContentText id="alert-dialog-description">
         You have successfully integrated and verified your telegram account, waiting for Admin's approval.
       </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{ if (accounts.length > 0) {
      const account = accounts[0]; // Assuming you want to log out the first logged-in account if multiple accounts are present
      instance.logoutRedirect({ account });
    }}}>Log-Out</Button>
        </DialogActions>
            </Dialog>
    
  );
};
export default TelegramDialog;