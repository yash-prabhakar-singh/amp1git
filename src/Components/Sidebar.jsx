import {
  AccountBox,
  Article,
  AttachMoney,
  Bolt,
  CloseFullscreen,
  CloseRounded,
  FlipToBack,
  FourK,
  GMobiledata,
  Group,
  Hiking,
  HikingSharp,
  Home,
  Key,
  Language,
  Login,
  ModeNight,
  NotificationImportant,
  OneK,
  Person,
  Report,
  ReportOff,
  ReportOutlined,
  ReportRounded,
  Settings,
  SettingsAccessibility,
  SingleBed,
  Storefront,
  ThreeK,
  TwoK,
} from "@mui/icons-material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  createTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
  Drawer,
  IconButton,
  Grid,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "Train One", "Roboto", "sans-serif", "cursive"].join(
      ","
    ),
  },
});

const Sidebar = () => {
  const navigate = useNavigate();
  const [opens, SetOpens] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <DehazeIcon onClick={() => SetOpens(true)} />
      <Drawer
        open={opens}
        onClose={() => SetOpens(false)}
        style={{ width: 300 }}
      >
        <Box >
          <Box fontSize={16}>
            <CloseIcon
              sx={{
                // width: 950,
                height: "20px",
                marginTop: 1,
    
    
              }}
              onClick={() => SetOpens(false)}
            />

            <List
              sx={{
                width: 768,
                // maxWidth: 360,
                // bgcolor: "black",
                position: "relative",
                overflow: "auto",
                //maxHeight: 565,
                height: 875,
                "& ul": { padding: 0 },
                "&::-webkit-scrollbar": {
                  width: 0,
                },
              }}
              disablePadding
            >
              <Stack direction="column" spacing={1}>
                <ListItem color="primary" disablePadding>
                  <Accordion sx={{ width: 768, padding: 1}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <LiveTvIcon sx={{ color: "#1a1b1c" }} />
                      <Typography paddingLeft={0.5}>Live</Typography>
                     
                      
              </AccordionSummary>
                    <AccordionDetails sx={{ padding: 1 }}>
                      <List sx={{ color: "text.secondary" }}>
                        <Stack direction="column" spacing={0} paddingLeft={1}>
                          <ListItem color="primary" disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/live/dynadot");
                                SetOpens(false);
                              }}
                            >
                              <SettingsAccessibility />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                fontFamily="Nunito"
                              >
                                Dynadot Live
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/live/namecheap");
                                SetOpens(false);
                              }}
                            >
                              <Key />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Namecheap Live
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/live/dropcatch");
                                SetOpens(false);
                              }}
                            >
                              <Login />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Dropcatch Live
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/live/godaddy");
                                SetOpens(false);
                              }}
                            >
                              <GMobiledata />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                GoDaddy Live
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/live/namesilo");
                                SetOpens(false);
                              }}
                            >
                              <Language />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Namesilo Live
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        </Stack>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                {/*<ListItem disablePadding>
          <Card sx={{width:530}}>
            <ListItemButton onClick={()=>navigate('/home/live')}  >
           
                <LiveTvIcon sx={{color:'#1a1b1c'}} />
                
              <Typography paddingLeft={0.5}>Live</Typography>
            </ListItemButton>
            </Card>
          </ListItem>*/}
                <ListItem disablePadding>
                  <Card sx={{ width: 768, padding: 1}}>
                    <ListItemButton
                      onClick={() => {
                        navigate("/home/bulkfetchgdv");
                        SetOpens(false);
                      }}
                    >
                      <AttachMoney sx={{ color: "#1a1b1c" }} />

                      <Typography paddingLeft={0.5}>Bulk Fetch GDV</Typography>
                      
                    </ListItemButton>
                  </Card>
                </ListItem>

                <ListItem color="primary" disablePadding>
                  <Accordion sx={{ width: 768, padding: 1}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Bolt sx={{ color: "#1a1b1c" }} />{" "}
                      <Typography paddingLeft={0.5}>Auctions</Typography>
                     
                      
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <List sx={{ color: "text.secondary" }}>
                        <Stack direction="column" spacing={0} paddingLeft={1}>
                          <ListItem color="primary" disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/bulkfetch");
                                SetOpens(false);
                              }}
                            >
                              <Home />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                fontFamily="Nunito"
                                variant="h6"
                              >
                                Bulk Fetch
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/bulkbid");
                                SetOpens(false);
                              }}
                            >
                              <Article />

                              <Typography
                                fontSize={16}
                                paddingLeft={0.5}
                                variant="h6"
                              >
                                Bulk Bid
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/biddinglist");
                                SetOpens(false);
                              }}
                            >
                              <Storefront />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Bidding List
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/watchlist");
                                SetOpens(false);
                              }}
                            >
                              <Group />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Watch List
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        </Stack>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                <ListItem color="primary" disablePadding>
                  <Accordion sx={{ width: 768, padding: 1}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <FlipToBack fontSize="small" sx={{ color: "#1a1b1c" }} />{" "}
                      <Typography paddingLeft={0.5}>BackOrders</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <List sx={{ color: "text.secondary" }}>
                        <Stack direction="column" spacing={0} paddingLeft={1}>
                          <ListItem color="primary" disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/settings/preferences");
                                SetOpens(false);
                              }}
                            >
                              <SettingsAccessibility />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                fontFamily="Nunito"
                              >
                                Bulk Add
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton //onClick={()=>navigate('/home')}
                            >
                              <Key />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Bulk Delete
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton //onClick={()=>navigate('/currentbids')}
                            >
                              <Login />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                View All
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        </Stack>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                <ListItem color="primary" disablePadding>
                  <Accordion sx={{ width: 768, padding: 1}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <CloseFullscreen
                        fontSize="small"
                        sx={{ color: "#1a1b1c" }}
                      />{" "}
                      <Typography paddingLeft={0.5}>CloseOuts</Typography>
                     
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <List sx={{ color: "text.secondary" }}>
                        <Stack direction="column" spacing={0} paddingLeft={1}>
                          <ListItem color="primary" disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/closeouts/bulkfetch");
                                SetOpens(false);
                              }}
                            >
                              <SettingsAccessibility />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                fontFamily="Nunito"
                                variant="h6"
                              >
                                Bulk Fetch
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/closeouts/bulkbuy");
                                SetOpens(false);
                              }}
                            >
                              <Key />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Bulk Buy
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/closeouts/closeoutlist");
                                SetOpens(false);
                              }}
                            >
                              <Login />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Closeout List
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/closeouts/bulkbuy");
                                SetOpens(false);
                              }}
                            >
                              <Login />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Watchlist
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        </Stack>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                <ListItem color="primary" disablePadding>
                  <Accordion sx={{ width: 768, padding: 1}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <ReportOutlined sx={{ color: "#1a1b1c" }} />{" "}
                      <Typography paddingLeft={0.5}>Reports</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <List sx={{ color: "text.secondary" }}>
                        <Stack direction="column" spacing={0} paddingLeft={1}>
                          <ListItem color="primary" disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/singlebid");
                                SetOpens(false);
                              }}
                            >
                              <Home />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                fontFamily="Nunito"
                                variant="h6"
                              >
                                BackOrders Report
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/auctionsreport");
                                SetOpens(false);
                              }}
                            >
                              <Article />

                              <Typography
                                fontSize={16}
                                paddingLeft={0.5}
                                variant="h6"
                              >
                                Auctions Report
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/closeouts/report");
                                SetOpens(false);
                              }}
                            >
                              <Storefront />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                CloseOuts Report
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/historicbids");
                                SetOpens(false);
                              }}
                            >
                              <Group />

                              <Typography
                                fontSize={16}
                                paddingLeft={0.5}
                                variant="h6"
                              >
                                Purchase Report
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        </Stack>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
                <ListItem color="primary" disablePadding>
                  <Accordion sx={{ width: 768, padding: 1}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <SettingsIcon
                        fontSize="small"
                        sx={{ color: "#1a1b1c" }}
                      />{" "}
                      <Typography paddingLeft={0.5}> Settings</Typography>
                     
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <List sx={{ color: "text.secondary" }}>
                        <Stack direction="column" spacing={0} paddingLeft={1}>
                          <ListItem color="primary" disablePadding>
                            <ListItemButton
                              onClick={() => {
                                navigate("/home/settings/preferences");
                                SetOpens(false);
                              }}
                            >
                              <SettingsAccessibility />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                fontFamily="Nunito"
                                variant="h6"
                              >
                                Preferences
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton //onClick={()=>navigate('/home')}
                            >
                              <Key />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Api keys
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton //onClick={()=>navigate('/currentbids')}
                            >
                              <Login />

                              <Typography
                                paddingLeft={0.5}
                                fontSize={16}
                                variant="h6"
                              >
                                Platform Logins
                              </Typography>
                            </ListItemButton>
                          </ListItem>
                        </Stack>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </ListItem>
              </Stack>
            </List>
          </Box>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
