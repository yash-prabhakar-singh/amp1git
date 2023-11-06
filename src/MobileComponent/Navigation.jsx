import {
  AppBar,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HouseSidingRoundedIcon from "@mui/icons-material/HouseSidingRounded";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SidebarM from "./SidebarM";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { canAdmin, canReports, canWatch } from "../Components/msalService";
import { useMsal } from "@azure/msal-react";
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("0");
  const isRootPage = location.pathname === "/m";
  const { instance,accounts} = useMsal();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <CssBaseline />
      <Stack direction="column" justifyContent="space-between" height="100%">
        <AppBar
          sx={{
            width: "100%",
            backgroundColor: "#7D6FE6",
          }}
          position="sticky"
          elevation="none"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              sx={{ mr: 2 }}
              onClick={isRootPage ? undefined : handleBack}
            >
              {isRootPage ? (
                <SidebarM />
              ) : (
                <ArrowBackRoundedIcon style={{ color: "white" }} />
              )}
            </IconButton>
            <Typography
              fontFamily="revert-layer"
              fontSize="1.4rem"
              fontWeight="450"
              letterSpacing={1.3}
              color={"white"}
            >
              NAMEKART-AMP
            </Typography>
            <div style={{ flex: 1 }} />
            {canAdmin()&&<IconButton
              size="large"
              edge="end"
              onClick={() => navigate("/m/notificationsm")}
            >
              <Badge badgeContent={3} color="error">
                <Avatar
                  style={{
                    backgroundColor: "#3E338F",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <NotificationsRoundedIcon style={{ color: "white" }} />
                </Avatar>
              </Badge>
            </IconButton>}
          </Toolbar>
        </AppBar>
        <Box
          style={{
            paddingBottom: "20%",
          }}
          
          sx={{flexGrow:1,position: 'relative',
          overflow: 'auto',}}
          //sx={{dis}}
        >
          <Outlet />
        </Box>
        <Box >
          <BottomNavigation
            sx={{
              borderRadius: "20px 20px 20px 20px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
              position: "fixed",
              bottom: 3,
              width: "100%",
              // maxWidth: "100vw",
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              onClick={() => navigate("/m")}
              sx={{
                color: "grey",
                "&.Mui-selected": {
                  color: "#3E338F",
                },
              }}
              label="Home"
              value="Home"
              icon={<HouseSidingRoundedIcon />}
            />
            {canWatch()&&<BottomNavigationAction
              onClick={() => navigate("/m/watchlistm")}
              sx={{
                color: "grey",
                "&.Mui-selected": {
                  color: "#3E338F",
                },
              }}
              label="Watchlist"
              value="Watchlist"
              icon={<QueryStatsIcon />}
            />}
            {canReports()&&<BottomNavigationAction
              onClick={() => navigate("/m/reportsm")}
              sx={{
                color: "grey",
                "&.Mui-selected": {
                  color: "#3E338F",
                },
              }}
              label=" Reports"
              value=" Reports"
              icon={<SummarizeIcon />}
            />}
          </BottomNavigation>
          
        </Box>
      </Stack>
    </div>
  );
};
export default Navigation;
