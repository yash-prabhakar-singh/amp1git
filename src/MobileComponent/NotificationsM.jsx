import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { useEffect } from "react";
import { getnotifs, getnotifstoday } from "../Components/api";
import { useState } from "react";
const NotificationsM = () => {

  const[today,setToday]= useState([]);
  const[recent,setRecent]= useState([]);

  useEffect(()=>{getnotifstoday().then((res)=>{let d=new Date();let t=[];let r=[];
    let arr=res.data; d.setHours(d.getHours()-2);
     //console.log(arr[0]);console.log(new Date(arr[0].date+"T"+arr[0].time+"Z"));
  for(let i=0;i<arr.length;i++)
  {
    var d1= new Date(arr[i].date+"T"+arr[i].time+"Z")
    if(d1.getTime()<d.getTime())
    {
      r=arr.slice(0,i);t=arr.slice(i,arr.length);
      break;
    }
  }
  setRecent(r);setToday(t);
  }).catch((err)=>{console.log(err)})},[])
  return (
  
    <div>
      <Box sx={{ padding: "10px 10px 5px 20px" }}>
        <Typography color="GREY" variant="h6">
          RECENT
        </Typography>
      </Box>
      <Box sx={{ padding: "5px 10px 5px 20px" }}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={11.5}>
            <Card
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
              }}
            >
              <List>
                {recent.map((ar)=>{return (<><ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={ar.message.substring(13,ar.message.length)}
                    secondary={ar.times.substring(6,11)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" /></>)
                }
                )
               }
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: "5px 10px 5px 20px" }}>
        <Typography color="GREY" variant="h6">
          TODAY
        </Typography>
      </Box>
      <Box sx={{ padding: "5px 10px 5px 20px" }}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={11.5}>
            <Card
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
              }}
            >
              <List>
                {today.map((ar)=>{return (<><ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={ar.message.substring(13,ar.message.length)}
                    secondary={ar.times.substring(6,11)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" /></>)
                }
                )
               }
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default NotificationsM;
