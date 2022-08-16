import React, {useState, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {useLocation} from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import {NavLink} from 'react-dom';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { useDispatch } from "react-redux";
import {userLoggedIn} from '../../actions/auth';
import { connect } from "react-redux";

import axios from 'axios';

const theme = createTheme();

function ForgetPassword(props) {
    

  const [ errorMessage, setErrorMessage ] = useState("");
  const [ textMessage, setTextMessage ] = useState("The OTP has been sent to your email!");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(
      function() {
        setTextMessage("");
      }, 5000);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const newPassword = {
      email: location.state.email,
      password: data.get('password'),
      otp: data.get('otp')
    };


    axios.post('/api/otps/resetPassword', newPassword).then(res => {
      // console.log(res);
      if(!res.data.success) {
        setErrorMessage("ERROR: " + res.data.errors);
        setTimeout(
          function() {
            setErrorMessage("");
          }, 5000);
      }
      else {
        navigate("/login");
      }
    })
    .catch(err => {
      setErrorMessage("ERROR: Unknown error occured!!");
        setTimeout(
          function() {
            setErrorMessage("");
          }, 5000);
      // console.log("Error : ", err)
    });
  };

  return (
    <ThemeProvider theme={theme}>
      { errorMessage.length > 0 &&
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{errorMessage}</Alert>
      </Stack> 
      } 
      { textMessage.length > 0 &&
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">{textMessage}</Alert>
      </Stack> 
      } 
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoComplete="otp"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
    return {
        user: state
    };
};
export default connect(mapStateToProps)(ForgetPassword);