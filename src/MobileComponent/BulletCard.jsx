import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";

function BulletCard() {
  const [content, setContent] = useState("Initial content");
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const textArray = ["Domain abc", "Domain xyz", "Domain 123"];
  const delay = 2000;

  useEffect(() => {
    // Use a timer to update the content every 5 seconds
    const intervalId = setInterval(() => {
      setContent(`Updated content at ${new Date().toLocaleTimeString()}`);
    }, 5000);
    // Clean up the timer on unmount
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    // Use a timer to toggle the isBlinking state every second
    const intervalId = setInterval(() => {
      setIsBlinking((prevIsBlinking) => !prevIsBlinking);
    }, 1000);
    // Clean up the timer on unmount
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const slideAnimation = {
    animation: "slide 1s linear infinite",
    "@keyframes slide": {
      "0%": {
        transform: "translateX(0)",
      },
      "100%": {
        transform: "translateX(-100%)",
      },
    },
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={11.6}>
        <Card
          sx={{
            bgcolor: "white",
            borderRadius: "10px",
          }}
        >
          <Toolbar sx={{ backgroundColor: "#fce4ec" }}>
            <Typography variant="h6" component="h2" color="#2D2467">
              Domain Radar
            </Typography>
          </Toolbar>
          <CardContent>
            <Typography color="#3E338F" gutterBottom>
              {content}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{
                opacity: isBlinking ? 0 : 1,
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "red",
                animation: "blink 1s ease-in-out infinite",
              }}
            ></Typography>
            <Divider variant="middle" sx={{ padding: "5px" }} />
            <Typography variant="subtitle1" color="#1B163F" align="center">
              <div style={slideAnimation}>{textArray[currentIndex]}</div>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
export default BulletCard;
