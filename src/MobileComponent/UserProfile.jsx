import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("User 1");
  const [email, setEmail] = useState("User@example.com");
  const [phone, setPhone] = useState("987654321");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <Container>
      <Grid container paddingTop={5}>
        <Grid item xs={12} sm={8} md={6}>
          <Card style={{ borderRadius: "5px" }}>
            <CardHeader
              title="User Profile"
              action={
                <IconButton onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar alt="User Profile Picture" src="/path-to-image.jpg" />
                </Grid>
                <Grid item xs={isEditing ? 16 : 32}>
                  {isEditing ? (
                    <TextField
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={handleNameChange}
                    />
                  ) : (
                    <Typography variant="h6">{name}</Typography>
                  )}
                </Grid>
                <Grid item xs={isEditing ? 16 : 32}>
                  {isEditing ? (
                    <TextField
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                    />
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      {email}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={isEditing ? 16 : 32}>
                  {isEditing ? (
                    <TextField
                      label="Phone"
                      fullWidth
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      {phone}
                    </Typography>
                  )}
                </Grid>
                {isEditing && (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveClick}
                      size="large"
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        backgroundColor: "#5041B8", 
                        color: "#FFF",
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile; 
