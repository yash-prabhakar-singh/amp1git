import React, { useState } from "react";
import {
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";

const MyPreferences = () => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <div>
<Typography
        fontWeight="bold"
        fontSize="1.3rem"
        padding="20px 10px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Preferences
      </Typography>
      <Box
        style={{
          padding: "5px 10px 5px 10px",
        }}
      >
    <Container>
       <Grid container spacing={4} direction="column">
        <Grid item xs={5}>
          <Card style={{borderRadius:'10px'}}>
            <CardContent>
              <Typography variant="h6">Time configuration</Typography>
              <RadioGroup
                value={selectedOption1}
                onChange={handleOptionChange1}
              >
                <FormControlLabel
                  value="Relative"
                  control={<Radio style={{color:"#3E338F"}}/>}
                  label="Relative"
                />
                <FormControlLabel
                  value="Absolute"
                  control={<Radio style={{color:"#3E338F"}}/>}
                  label="Absolute"
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
        <Card style={{borderRadius:'10px'}}>
            <CardContent>
              <Typography variant="h6">Spacing</Typography>
              <RadioGroup
                value={selectedOption2}
                onChange={handleOptionChange2}
              >
                <FormControlLabel
                  value="Compact"
                  control={<Radio style={{color:"#3E338F"}}/>}
                  label="Compact"
                />
                <FormControlLabel
                  value="Cozy"
                  control={<Radio style={{color:"#3E338F"}}/>}
                  label="Cozy"
                />
                <FormControlLabel
                  value="comfortable"
                  control={<Radio style={{color:"#3E338F"}}/>}
                  label="comfortable"
                />
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    </Box>
    </div>
  );
};
export default MyPreferences;
