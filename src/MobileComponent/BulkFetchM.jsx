import React, { useState } from "react";
import {
  NotificationImportant,
  SettingsAccessibility,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Sidebar from "../Components/Sidebar";
import ResponsiveAppBar from "./NavBar";
import SplitButton from "./Dropdown";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { ButtonGroup, Divider, ListItem } from "@mui/material";
import OutlinedCard from "./Card";
import Bfm from "./Bfm.json";
//import Badge from "@mui/material";
//import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

function BulkFetchM() {
  const [domain, setDomain] = useState(null);
  const [data, setData] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        // alignItems: 'center',
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "20vh",
          position: "absolute",
          top: "0",
          width: "100%",
          // backgroundColor: 'red',

          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <ResponsiveAppBar />
        <SplitButton />
        <TextField
          style={
            {
              // height: '10px'
            }
          }
          label="Domains"
          multiline
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          color="priamry"
          variant="outlined"
        />
        <button
          style={{
            height: "30px",
            position: "absolute",
            bottom: "0",
            width: "100px",
            backgroundColor: "black",
            color: "white",
            "&:disabled": {
              backgroundColor: "dark grey",
            },
          }}
          variant="contained"
          onClick={() => {
            setData(!data);
          }}
        >
          Fetch Details
        </button>
        {console.log(data)}
      </div>
      {data ? (
        <div 
        style={{
          marginTop: "10rem",
        }}>
          <OutlinedCard />
        </div>
      ) : null}
    </div>
  );
}

export default BulkFetchM;
