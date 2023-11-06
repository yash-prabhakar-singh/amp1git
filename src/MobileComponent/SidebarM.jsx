import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Person2TwoToneIcon from "@mui/icons-material/Person2TwoTone";
import TelegramIcon from "@mui/icons-material/Telegram";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import ContrastIcon from "@mui/icons-material/Contrast";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Switch from "@mui/material/Switch";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import { useMsal } from "@azure/msal-react";

const SidebarM = () => {
  const navigate = useNavigate();
  const { instance,accounts} = useMsal();
  const [opens, SetOpens] = useState(false);
  const handleDrawerClose = () => {
    SetOpens(false);
  };
  const options = [
    {
      text: "User",
      icon: <Person2TwoToneIcon />,
      //abc: "/dashboard/userprofile",
    },
    {
      text: "Preferences",
      icon: <AppRegistrationRoundedIcon />,
      //abc: "/dashboard/mypreferences",
    },
    { text: "Telegram", icon: <TelegramIcon /> },
    { text: "Web Version", icon: <LanguageRoundedIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Dark Mode", icon: <ContrastIcon />, toggle: true },
    { text: "Log Out", icon: <LogoutRoundedIcon /> },
  ];

  return (
    <div>
      <IconButton  size="medium" onClick={() => SetOpens(true)} sx={{ color: "white" }}>
        <SortRoundedIcon />
      </IconButton>
      <Drawer
        open={opens}
        anchor="left"
        PaperProps={{
          sx: {
            width: "70%",
            height: "100vh",
            display: "flex",
            // alignItems: "center",
            flexDirection: "column",
            justifyContent: "start",
            // padding: "10px",
            // textAlign: "center",
            background: "#311b92",
            color: "#E6EDf5",
          },
        }}
      >
        <Box
          style={{
            // backgroundColor: "#E7E9F6",
            display: "flex",
            padding: "0 10px",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
            {<ChevronLeftIcon />}
          </IconButton>
        </Box>
        <Divider />
        <div>
          <List component="nav" aria-label="options list">
            {options.map((option, index) => (
              <>
                <ListItem
                  onClick={() => {
                    if(option.text==='Log Out')
                    {if (accounts.length > 0) {
                      const account = accounts[0]; // Assuming you want to log out the first logged-in account if multiple accounts are present
                      instance.logoutRedirect({ account });
                    }}
                    else
                    navigate(option.abc);

                  }}
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ paddingRight: "10px" }}>
                      {option.icon}
                    </Typography>
                    <Typography
                      variant="overline"
                      fontWeight={900}
                      sx={{ padding: "10px 0" }}
                    >
                      {option.text}
                    </Typography>
                  </Box>

                  {option.toggle && <Switch />}
                </ListItem>
                <Divider
                  style={{ margin: "0 16px", backgroundColor: "#E6EDf5" }}
                />
              </>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};
export default SidebarM;
