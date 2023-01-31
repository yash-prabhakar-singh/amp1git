import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Bfm from "./Bfm.json";
// import { Grid } from "@mui/material";


export default function OutlinedCard() {
  return (
    <Box height={1}>
      {Bfm &&
        Bfm.map((bfm) => {
          return (
            <div
            style={{
              padding: '1rem'
            }}>
              <Card sx={{ width: 350, height: 130 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="blue">
                    {bfm.domain}
                  </Typography>
                  <Typography variant="h8" component="div">
                    {bfm.currbid}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {bfm.time_left}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
    </Box>
  );
}
