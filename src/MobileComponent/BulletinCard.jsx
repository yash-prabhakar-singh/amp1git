import React from 'react';
import { Grid, Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const cardStyle = {
  borderRadius: '3px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '12px',
};

const iconStyle = {
  backgroundColor: '#3E338F', 
};

const boldTextStyle = {
  fontWeight: 'bold',
};

const scrollableContainer = {
  maxHeight: '300px', 
  overflowY: 'auto',
};

const NewsGrid = () => {
  const newsItems = [
    {
      date: '2023-08-30',
      headline: '.Realty and .Locker top level domains',
      content: 'A recent update to ICANNs Registry Agreement Assignment page shows that the registry contracts for .realty and .locker have been assigned.',
      link:'https://domainnamewire.com/2023/08/28/realty-and-locker-top-level-domains-change-hands/'
    },
    {
      date: '2023-08-29',
      headline: 'The clock is ticking on .com',
      content: 'You have less than a week to renew domains at current prices.',
    },
    {
      date: '2023-08-28',
      headline: 'See how many auctions your competitors have won.',
      content: 'Namecheap offers unprecedented view into rival auction bidders',
    },
    {
      date: '2023-08-27',
      headline: 'End User Domain Sales',
      content: 'An office furniture company, a battery storage business, and a soccer clothing seller bought domain names.'
    },
    {
      date: '2023-08-25',
      headline: 'GoDaddy paid up to $39.4 million [Updated]',
      content: 'Domain name registrar GoDaddy (NYSE: GDDY) revealed what it paid for five top level domain acquisitions in Q2.',
    },
  ];

  return (
    <div style={scrollableContainer}>
      <Grid container spacing={2}>
        {newsItems.map((item, index) => (
          <Grid item xs={11.5} key={index}>
            <Card style={cardStyle}>
              <CardHeader
                avatar={
                  <Avatar style={iconStyle}>
                    <TrendingUpIcon />
                  </Avatar>
                }
                title={
                    <a href={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span style={boldTextStyle}>{item.headline}</span>
                  </a>
                }
                subheader={item.date}
              />
              <CardContent>
                <Typography>{item.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsGrid;
