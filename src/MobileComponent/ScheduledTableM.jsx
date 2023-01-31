import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    width: '50%',
    margin: 'auto',
    marginTop: '50px',
  },
});

const ScheduledTableM = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Scheduled Table" />
        <Tab label="Placed Table" />
      </Tabs>
      {value === 0 && (
        <Card className={classes.card}>
          <CardContent>
            Scheduled Bid
          </CardContent>
        </Card>
      )}
      {value === 1 && (
        <Card className={classes.card}>
          <CardContent>
            Placed Bid
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScheduledTableM;
