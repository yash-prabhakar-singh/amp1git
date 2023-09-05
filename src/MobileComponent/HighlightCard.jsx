import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

const PercentageBar = ({ label, percentage, color }) => {
  return (
    <Grid item xs={12}>
      <div style={{ flex: 1 }}>
        <Typography variant="body1" color="textPrimary" style={{ marginBottom: "10px" }}>
          <strong>{label}</strong>
        </Typography>
        <div style={{ display: "flex", alignItems: "center", color: "white" }}>
          <div style={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 25,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  bgcolor: color,
                },
              }}
            />
          </div>
          <Typography
            variant="caption"
            style={{
              marginTop: 5,
              position: "absolute",
              width: "100%",
              textAlign: "center",
            }}
          >
            {percentage}%
          </Typography>
        </div>
      </div>
    </Grid>
  );
};

const HighlightCard = () => {
  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent>
        <Grid container spacing={6}>
          <PercentageBar
            label="Total Money Spent"
            percentage={40}
            color="#3E338F"
          />
          <PercentageBar
            label="Total Money Acquired"
            percentage={65}
            color="#3E338F"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
export default HighlightCard;
