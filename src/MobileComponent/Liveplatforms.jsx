import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import dynadot from "../Components/images/dynadot.png";
import godaddy from "../Components/images/godaddy.png";
import dropcatch from "../Components/images/dropcatch.png";
import namecheap from "../Components/images/namecheap.png";
import namesilo from "../Components/images/namesilo.png";
import { Link } from "react-router-dom";

const Liveplatforms = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize="1.2rem"
        padding="20px 15px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Live Platforms
      </Typography>
      <Box sx={{ padding: "20px 10px 5px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={11.5}>
            <a href="http://www.godaddy.com/" style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                bgcolor: "#7D6FE6",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "rgba(215, 207, 255, 1)",
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <Avatar
                      alt="GoDaddy"
                      src={godaddy}
                      style={{
                        backgroundColor: "white",
                        width: "60px",
                        height: "60px",
                      }}
                    ></Avatar>
                  </Avatar>
                  <Typography
                    variant="h5"
                    style={{
                      color: "white",
                      paddingTop: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    Go Daddy
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </a>
          </Grid>
          <Grid item xs={11.5}>
          <a href="https://www.dynadot.com/" style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                bgcolor: "#7D6FE6",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "rgba(215, 207, 255, 1)",
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <Avatar
                      alt="Dynadot"
                      src={dynadot}
                      style={{
                        backgroundColor: "white",
                        width: "60px",
                        height: "60px",
                      }}
                    ></Avatar>
                  </Avatar>
                  <Typography
                    variant="h5"
                    style={{
                      color: "white",
                      paddingTop: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    Dynadot
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </a>
          </Grid>
          <Grid item xs={11.5}>
            < a href="http://www.namesilo.com/" style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                bgcolor: "#7D6FE6",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "rgba(215, 207, 255, 1)",
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <Avatar
                      alt="Namesilo"
                      src={namesilo}
                      style={{
                        backgroundColor: "white",
                        width: "60px",
                        height: "60px",
                      }}
                    ></Avatar>
                  </Avatar>
                  <Typography
                    variant="h5"
                    style={{
                      color: "white",
                      paddingTop: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    Namesilo
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </a>
          </Grid>
          <Grid item xs={11.5}>
          <a a href="https://www.dropcatch.com/" style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                bgcolor: "#7D6FE6",
                backdropFilter: "blur(10px)",
                borderRadius: "10px",
              }}
            >
              <CardActionArea>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "rgba(215, 207, 255, 1)",
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <Avatar
                      alt="Dropcatch"
                      src={dropcatch}
                      style={{
                        backgroundColor: "white",
                        width: "60px",
                        height: "60px",
                      }}
                    ></Avatar>
                  </Avatar>
                  <Typography
                    variant="h5"
                    style={{
                      color: "white",
                      paddingTop: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    Dropcatch
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </a>
          </Grid>
          <Grid item xs={11.5}>
          <a a href="http://www.namecheap.com/" style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                bgcolor: "#7D6FE6",
                borderRadius: "10px",
              }}
            >
              <CardActionArea>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "rgba(215, 207, 255, 1)",
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <Avatar
                      alt="Namecheap"
                      src={namecheap}
                      style={{
                        backgroundColor: "white",
                        width: "60px",
                        height: "60px",
                      }}
                    ></Avatar>
                  </Avatar>
                  <Typography
                    variant="h5"
                    style={{
                      color: "white",
                      paddingTop: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    Namecheap
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </a>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default Liveplatforms;
