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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import SendAndArchiveRoundedIcon from "@mui/icons-material/SendAndArchiveRounded";
import { FiberManualRecord as BulletIcon } from "@mui/icons-material";

import Status from "./Status";
import BulletinCard from "./BulletinCard";
import { data } from "../Components/Data";
import { getTargetsHighest } from "../Components/api";
import { canBid, canCloseOut, canLive, canWatch } from "../Components/msalService";

const Dashboard = () => {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState([]);

    useEffect(()=>{getTargetsHighest().then((response)=>{setRows(response.data);console.log(response.data)}).catch((error)=>{console.log(error)})},[])
    let pl=(platform)=>{if(platform==='GoDaddy') return 'GD'; else if(platform==='Dynadot') return 'DD';
    else if(platform==='Dropcatch') return 'DC';else if(platform==='Namecheap') return 'NC';
    else if(platform==='Namesilo') return 'NS';};
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
          Targets
        </Typography>
        <hr
          style={{
            width: "100%",
            borderTop: "1px solid grey",
            margin: "0 10px",
          }}
        />
      </div>
      <Grid container justifyContent='center'>
<Grid xs={11} item>
      <TableContainer sx={{
            //padding: "5px 10px 5px 10px ",
            borderRadius: 5
          }} component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Pl
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Domain
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Time-Left
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Target
                    </TableCell>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (

                    row&&<TableRow
                      key={index}
                      sx={{
                        backgroundColor: Number(row.bidAmount)>Number(row.currbid)?'#effaed':'#faeeed',backgroundBlendMode:'lighten' //index % 2 === 0 ? "white" : "#f5f5f5",
                      }}
                    >
                     
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.domain}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.time_left}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.currbid}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.bidAmount}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {pl(row.platform)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Grid>
            </Grid>
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
        <Grid justifyContent='center' container spacing={2}>
          {(canBid()||canCloseOut())&&<Grid item xs={5.7} sx={{ marginRight: (theme) => theme.spacing(1) }}>
            <Card
              sx={{
                backgroundColor: "#9A8EEB",
                backdropFilter: "blur(20px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea onClick={() => navigate("/m/bidpage")}>
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
          </Grid>}

          {canWatch()&&<Grid item xs={5.7} sx={{ marginRight: (theme) => theme.spacing(1) }}>
            <Card
              sx={{
                bgcolor: "#9A8EEB",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea onClick={() => navigate("/m/bulkfetchm")}>
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
          </Grid>}

          <Grid item xs={5.7} sx={{ marginRight: (theme) => theme.spacing(1) }}>
            <Card
              sx={{
                bgcolor: "#9A8EEB",
                // backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea
                onClick={() => navigate("/m/bulkfetchgdvm")}
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
          {canLive()&&<Grid item xs={5.7}>
            <Card
              sx={{
                bgcolor: "#9A8EEB",
                backdropFilter: "blur(20px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea
                onClick={() => navigate("/m/liveplatforms")}
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
          </Grid>}
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
