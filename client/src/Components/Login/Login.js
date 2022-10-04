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

export default function Login() {

  const [ errorMessage, setErrorMessage ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    
    const checkUser = {
      email: data.get('email'),
      password: data.get('password')
    };


    axios.post('/api/users/login', checkUser).then(res => {
      //console.log(res);
      if(!res.data.success) {
        setErrorMessage("ERROR: " + res.data.errors);
        setTimeout(
          function() {
            setErrorMessage("");
          }, 5000);
      }
      else {
        // Successful Login
        localStorage.email = checkUser.email;
        const redux_user = {
          email: res.data.user.email,
          role: res.data.user.role,
          accountNo: res.data.user.accountNo,
          balance: res.data.user.balance
        }
        // console.log("cp1");
        dispatch(userLoggedIn(redux_user));
        // console.log("cp2");
        navigate("/dashboard");
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80)',
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
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="" variant="body2">
                    <NavLink to="/email">
                      Forgot password?
                    </NavLink>
                  </Link>
                </Grid>
                <Grid item>
                  <Link hrrf="" variant="body2">
                    <NavLink to="/signup">
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}