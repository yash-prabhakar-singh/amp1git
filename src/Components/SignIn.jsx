import React, { useEffect, useState } from "react";
//import Avatar from "@material-ui/core/Avatar";

//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core/styles";
//import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
//import { TextField } from "formik-mui"
//import AuthService from "../../AuthService";
import { redirect, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Checkbox, createTheme, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Link, Stack, ThemeProvider, Typography } from "@mui/material";
//import bg1 from 'C:\Users\Admin\Desktop\NameKart\frontend\src\images\section-blob-main-alt.svg'
//import bgc from 'C:\Users\Admin\Desktop\NameKart\frontend\src\images\login.svg'
import { AccountCircle, LockOutlined } from "@mui/icons-material";
import AuthService from "./AuthService";
import { useIsAuthenticated, useMsal, useMsalAuthentication } from "@azure/msal-react";
import { protectedResources } from "./msalConfig";
//import { useDispatch, useSelector } from "react-redux";

{/*import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
//import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";*/}

const theme = createTheme({
  
  typography: {
    fontFamily: [
      'Nunito',
      'Train One',
      'Roboto',
      
      
      'sans-serif',
      'cursive'
    ].join(",")
  }
  
  }
  );

const MadeWithLove = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Built with love by the "}
    <Link color="inherit" href="https://material-ui.com/">
      Namekart
    </Link>
    {" team."}
  </Typography>
);
{/*
const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    //margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));*/}

const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

let validationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      "Must contain one lowercase alphabetical character!"
    )
    .matches(
      uppercaseRegEx,
      "Must contain one uppercase alphabetical character!"
    )
    .matches(numericRegEx, "Must contain one numeric character!")
    .matches(lengthRegEx, "Must contain 6 characters!")
    .required("Required!")
})

const initialValues = {
  email: "",
  password: "",
}

const SignInSide = () => {
  //const classes = useStyles();
  //let navigate = useNavigate();
  const { instance } = useMsal();

  const handleLogin = () => {
    try {
      const loginRequest = {
        scopes: protectedResources.Api.scopes,
      };
      instance.loginRedirect(loginRequest);
    } catch (err) {
      console.log(err);
    }
  };
  //const newNego= useSelector((state)=>{return state.reducer});
//const dispatch = useDispatch();
const navigate = useNavigate();
const [email,setEmail]= useState("");
const [password, setPassword]= useState("");
//const isAuthenticated=useMsalAuthentication();
useEffect(()=>{console.log(instance.getActiveAccount());console.log("yoyo")
  if(instance.getActiveAccount()) {navigate("/home"); console.log("redirect")
}},[])

  const onSubmit = (values) => {
    setEmail(values.email);
    setPassword(values.password);
    setEmail(values.email);
    setPassword(values.password);
    console.log(values);
    if(AuthService.login(values.email,values.password))
    {      
      navigate("/home");
    }
    else
    {
      alert("Wrong username or password");
    }
    /*AuthService.login(values.email,values.password).then((response)=>{if(response.status===400){console.log(response.data)} else{AuthService.registerSuccess(response.data); console.log(AuthService.getCurrentId());
      if(AuthService.isNego())
      {
        let nego= AuthService.getNego();
        let sdomain= nego.sdomain;
        let price= nego.price;
        console.log(nego);
        AuthService.removeNego();
        //dispatch({type:'reset'});
        navigate(`/bid-purchase-terms/${sdomain}/${price}`); 
      }
      else
{navigate("/home")}}}).catch((error)=>{if(error.response.status===400){console.log(error.response.data); alert(error.response.data);} else{console.log(error.response.data.message); alert(error.response.data.message)}})

    */}



  return (
    <ThemeProvider theme={theme}>
      <Box>
<CssBaseline />
    <Box height='100vh'>
      
      
        <Stack direction='row' spacing={10} justifyContent='center'paddingTop={5}>
       

          <Stack direction='column' spacing={6} alignItems='center' width={350}>
         {/* <Avatar sx={{backgroundColor:'lightblue'}}>
            <LockOutlined sx={{}} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to AuctionHacker.com!
          </Typography>

        {/*<Formik initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values)=>onSubmit(values)}>

{({ dirty, isValid, values, handleChange, handleBlur }) => {
            return (
              <Form>
                  <Stack direction='column' alignItems='center' width={330}>

          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            component={TextField}
            id="email"
            label="Username"
            value={values.email}
            name="email"
            autoComplete="email"
            autoFocus
            sx={{marginTop:1, marginBottom:1, borderRadius:2}}
          />
          <Field
            variant="outlined"
            margin="normal"
            required
            fullWidth
            component={TextField}
            name="password"
            label="Password"
            type="password"
            value={values.password}
            id="password"
            autoComplete="current-password"
            sx={{marginTop:5, marginBottom:1, borderRadius:2}}

          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            disabled={!dirty || !isValid}
            variant="contained"
            color="primary"
            sx={{marginTop:3, borderRadius:2}}

            // className={classes.submit}
          >
            Sign In
          </Button>
          
            
              <Link href="#" variant="body2" sx={{marginTop:1}}
>
                Forgot password?
              </Link>
            
            
              <Link href="/signup" variant="body2" sx={{marginTop:0}}>
                {"Don't have an account? Sign Up"}
              </Link>
            
          
          <Box mt={5}>
            <MadeWithLove />
          </Box>
          </Stack>
          </Form>)}}
            </Formik>
            <Button
      variant="contained"
      color="primary"
      startIcon={<AccountCircle />}
      onClick={handleLogin}
    >
      Login with Microsoft
    </Button>*/}
            </Stack>
            </Stack>
    </Box>
    <Dialog
            open={true}
            maxWidth='md'
            //onClose={handleClose}
            >
              <DialogTitle  id="alert-dialog-title">
              {"Welcome to AuctionHacker.com! "} 
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
           Login to our Amazing Platform through your Namekart Id :)<br/>
           Click below!  </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button
      variant="contained"
      color="primary"
      startIcon={<AccountCircle />}
      onClick={handleLogin}
    >
      Login with Microsoft
    </Button>
        </DialogActions>
            </Dialog>
    </Box>
    </ThemeProvider>
  );
};

export default SignInSide;
