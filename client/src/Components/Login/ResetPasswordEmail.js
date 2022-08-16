import React, {useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

import axios from 'axios';

const theme = createTheme();

export default function ForgetPasswordEmail() {

  const [ errorMessage, setErrorMessage ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = {
      email: data.get('email')
    };


    axios.post('/api/otps/send-mail', email).then(res => {
      // console.log(res);
      if(!res.data.success) {
        setErrorMessage("ERROR: " + res.data.errors);
        setTimeout(
          function() {
            setErrorMessage("");
          }, 5000);
      }
      else {
        navigate("/forgetPassword", {
            state: email
          });
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
              Enter your Email
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send OTP
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}