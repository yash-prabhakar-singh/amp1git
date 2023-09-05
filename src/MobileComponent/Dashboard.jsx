import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import SendAndArchiveRoundedIcon from "@mui/icons-material/SendAndArchiveRounded";
import { FiberManualRecord as BulletIcon } from "@mui/icons-material";

import Status from "./Status";
import BulletinCard from "./BulletinCard";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#7D6FE6",
        }}
      >
        <Box
          sx={{
            padding: "5px 10px 5px 10px ",
          }}
        >
          <Status />
        </Box>
        <Box
          sx={{
            padding: "5px 10px 5px 20px ",
            paddingBottom: "10%",
          }}
        ></Box>
      </Box>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "grey",
          padding: "20px",
        }}
      >
        <hr
          style={{
            width: "100%",
            borderTop: "1px solid grey",
            margin: "0 10px",
          }}
        />
        <Typography variant="subtitle1" letterSpacing={1.5}>
          ACTIONS
        </Typography>
        <hr
          style={{
            width: "100%",
            borderTop: "1px solid grey",
            margin: "0 10px",
          }}
        />
      </div>
      <Box sx={{ padding: "5px 10px 5px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={5.7} sx={{ marginRight: (theme) => theme.spacing(1) }}>
            <Card
              sx={{
                backgroundColor: "#9A8EEB",
                backdropFilter: "blur(20px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea onClick={() => navigate("/dashboard/bidpage")}>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // paddingTop: "10px",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "#D3CEF6",
                      width: "65px",
                      height: "65px",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "white",
                        width: "45px",
                        height: "45px",
                      }}
                    >
                      <GavelRoundedIcon
                        sx={{
                          width: "30px",
                          height: "30px",
                          color: "black",
                          // backgroundColor: "",
                        }}
                      />
                    </Avatar>
                  </Avatar>
                </CardContent>
                <Typography
                  sx={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    padding: "4px",
                  }}
                  fontSize="1.2rem"
                  variant="subtitle1"
                >
                  BID
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={5.7} sx={{ marginRight: (theme) => theme.spacing(1) }}>
            <Card
              sx={{
                bgcolor: "#9A8EEB",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea onClick={() => navigate("/dashboard/bulkfetchm")}>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // paddingTop: "35px",
                  }}
                >
                  <Avatar
                    variant="circular"
                    style={{
                      backgroundColor: "#D3CEF6",
                      width: "65px",
                      height: "65px",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "white",
                        width: "45px",
                        height: "45px",
                      }}
                    >
                      <MoveDownRoundedIcon
                        sx={{
                          width: "30px",
                          height: "30px",
                          color: "black",
                        }}
                      />
                    </Avatar>
                  </Avatar>
                </CardContent>
                <Typography
                  sx={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    padding: "4px",
                  }}
                  fontSize="1.2rem"
                  variant="subtitle1"
                >
                  FETCH
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={5.7} sx={{ marginRight: (theme) => theme.spacing(1) }}>
            <Card
              sx={{
                bgcolor: "#9A8EEB",
                // backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea
                onClick={() => navigate("/dashboard/bulkfetchgdvm")}
              >
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    variant="circular"
                    style={{
                      backgroundColor: "#D3CEF6",
                      width: "65px",
                      height: "65px",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "white",
                        width: "45px",
                        height: "45px",
                      }}
                    >
                      <SendAndArchiveRoundedIcon
                        sx={{
                          width: "30px",
                          height: "30px",
                          color: "black",
                          backgroundColor: "inherit",
                        }}
                      />
                    </Avatar>
                  </Avatar>
                </CardContent>
                <Typography
                  sx={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    padding: "4px",
                  }}
                  fontSize="1.2rem"
                  variant="subtitle1"
                >
                  TOOLS
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={5.7}>
            <Card
              sx={{
                bgcolor: "#9A8EEB",
                backdropFilter: "blur(20px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea
                onClick={() => navigate("/dashboard/liveplatforms")}
              >
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "#D3CEF6",
                      width: "65px",
                      height: "65px",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "white",
                        width: "45px",
                        height: "45px",
                      }}
                    >
                      <LiveTvRoundedIcon
                        sx={{
                          width: "30px",
                          height: "30px",
                          color: "black",
                        }}
                      />
                    </Avatar>
                  </Avatar>
                </CardContent>
                <Typography
                  sx={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    padding: "4px",
                  }}
                  fontSize="1.2rem"
                  variant="subtitle1"
                >
                  LIVE
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "grey",
          padding: "30px",
        }}
      >
        <hr
          style={{
            width: "100%",
            borderTop: "1px solid grey",
            margin: "0 10px",
          }}
        />
        <Typography variant="subtitle1" letterSpacing={1.5}>
          BULLETIN
        </Typography>
        <hr
          style={{
            width: "100%",
            borderTop: "1px solid grey",
            margin: "0 10px",
          }}
        />
      </div>
      <Box sx={{ padding: "5px 10px 5px 25px" }}>
        <BulletinCard />
        {/* <Grid container spacing={0}>
          <Grid item xs={11.6}>
            <Card
              sx={{
                bgcolor: "#9A8EEB",
                background:
                  "linear-gradient(180deg, #D3CEF6 -4.62%, rgba(211, 206, 246, 0) 276.9%);",
                borderRadius: "10px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontSize="1.2rem"
                  //  padding="30px 15px 5px"
                  letterSpacing={0.5}
                  color="#3E338F"
                >
                  The Bulletin
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <BulletIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bullet point 1" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BulletIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bullet point 2" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BulletIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bullet point 3" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid> */}
      </Box>
    </div>
  );
};
export default Dashboard;
