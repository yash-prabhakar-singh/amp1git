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
const NotificationsM = () => {
  return (
    <div>
      <Box
        sx={{
          padding: "5px 10px 5px 10px ",
        }}
      >
        <Typography
          color="dark grey"
          variant="h6"
          fontWeight="bold"
          letterSpacing="0.2rem"
        ></Typography>
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
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="The auction ends at"
                    secondary="17:16"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Domain" secondary="July 17, 2023" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Vacation.com is available"
                    secondary="July 20, 2023"
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Box sx={{ padding: "20px 5px 5px 20px" }}>
            <Typography color="GREY" variant="h6">
              RECENT
            </Typography>
          </Box>
          <Grid item xs={11.5}>
            <Card
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
              }}
            >
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="The auction ends at"
                    secondary="17:16"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Domain" secondary="July 17, 2023" />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#3E338F" }}>
                      <NotificationsNoneRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Vacation.com is available"
                    secondary="July 20, 2023"
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default NotificationsM;
