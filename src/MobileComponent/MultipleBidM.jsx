import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useState } from 'react';
import ResponsiveAppBar from './NavBar';
import { Typography } from '@material-ui/core';
// import CardHeader from '@material-ui/core';
import ScheduleBidCard from './ScheduleBidCard';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing(10),
    textAlign: 'center'

    
  },
}));

export default function MultipleBidM() {
  const classes = useStyles();
  const [isBulkbid, setIsBulkbid] = useState(false);



  return (
    <Card className={classes.card}>
    
      <CardContent>
        <FormControl className={classes.formControl}>
          <Select>
          {/* <MenuItem value="">
              <em>Choose Platform</em>
            </MenuItem> */}
            <MenuItem value={"Dynadot"}>Dynadot</MenuItem>
          <MenuItem value={"GoDaddy"}>GoDaddy</MenuItem>
          <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
          <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="standard-multiline-flexible"
          label="Domain.Bid"
          multiline
          rowsMax="4"
          margin="normal"
        />
        <br /> 


        <Button
        style={{
            height: "30px",
            position: "center",
            bottom: "0",
            width: "100px",
            
        
            backgroundColor:"black",
            color: "white",
            "&:disabled": {
                backgroundColor:"dark grey",
            },
        }} 
        variant="contained"
        onClick={() => setIsBulkbid(!isBulkbid)}>
            {" "}
          Bulk Bid
        </Button>
        {console.log(isBulkbid)}
      </CardContent>
      <ResponsiveAppBar />
      {
        isBulkbid ? (
            <div
            style={{
                marginTop: "20 rem",
            }}>
            <ScheduleBidCard />
            </div>
        ) : null
    }

    </Card>
    
  );
}
