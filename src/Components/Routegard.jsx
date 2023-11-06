import React, { useState, useEffect } from "react";
import { Route, RouteProps, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import msalConfig from "./msalConfig";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { getOtp } from "./api";
import TelegramDialog from "./TelegramDialog";


const RouteGuard = (props) => {
  const { instance,accounts } = useMsal();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [message, setMessage] = useState("");
  const [me, setMe] = useState("abc");
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onLoad = async () => {
    console.log(pathname+"onLoad")
    const currentAccount = instance.getActiveAccount();
    if (currentAccount) {
      if (currentAccount.tenantId == msalConfig.auth.tenantId) {
        const idTokenClaims = currentAccount.idTokenClaims;
        if (idTokenClaims && idTokenClaims.aud == msalConfig.auth.clientId && idTokenClaims.roles) {
          if(!idTokenClaims.roles.includes('Telegram'))
          {
            setOpen(true);
          }
          else
          {
          const intersection = props.roles.filter((role) => idTokenClaims.roles.includes(role));
          if (intersection.length > 0) {
            setIsAuthorized(true);
          } else {
            setMessage("You don't have the required role to view this page. Please contact site administrator.");
          }
        }
        } else {
          setMessage("The application you authorized with cannot access this page. Please contact site administrator.");
        }
      } else {
        setMessage("Your organization does not have access to this content.");
      }
    }
  };
  

useEffect(() => {
    onLoad();
  },[//window
  ]); // removing [instance] argument to refresh component on every load
return (
    
      <React.Fragment>
        {isAuthorized ? (
          props.children
        ) : ( <React.Fragment sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            {open?<TelegramDialog open={open}/>:<h4>{message}</h4>}
          </React.Fragment>)
       }
      </React.Fragment>
    
  );
};
export default RouteGuard;