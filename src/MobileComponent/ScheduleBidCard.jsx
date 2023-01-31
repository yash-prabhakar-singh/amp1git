import React from 'react'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Bfm from "./Bfm.json";
import CardContent from "@mui/material/CardContent";

function ScheduleBidCard() {
  return (
    <div>
      <Box overflow="auto" height={300}>
      {Bfm &&
        Bfm.map((bfm) => {
          return (
            <div
            style={{
              padding: '1rem'
            }}>
              <Card sx={{ width: 290, height: 130 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="black">
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
    </div>
  )
}

export default ScheduleBidCard