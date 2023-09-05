import React from 'react';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data01 = [
    {
      "name": "Group A",
      "value": 40
    },
    {
      "name": "Group B",
      "value": 30
    },
    {
      "name": "Group C",
      "value": 30
    },
    
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 24
    },
    {
      "name": "Group B",
      "value": 45
    },
    {
      "name": "Group C",
      "value": 13
    },
   
  ];
      

const COLORS = ['#7D6FE6', '#3E338F'];

const WonCard = () => {
  return (
    <Card sx={{ borderRadius: 5 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <Typography variant="h6" style={{  color: 'darkgreen' }}>Winning Status</Typography>
          </Grid>
          <Grid item xs={6}>
            <ResponsiveContainer width="100%" height={180}>
                
              <PieChart>
                <Pie
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                >
                  {data01.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Pie
                  data={data02}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={60}
                  fill="#43a047"                  
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WonCard;
