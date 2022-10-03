import React from 'react';
import '../Header/header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';
import '../Dashboard/dashboard.css';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {userLoggedOut} from '../../actions/auth';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


import SendIcon from '@mui/icons-material/Send';

function Transfer(props) {
    const [visible, setVisible] = React.useState(false);
    const [ errorMessage, setErrorMessage ] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    console.log("Props: ", props.user);
    const logout = () => {
        console.log("Log Out!!");
        localStorage.removeItem('email');
        dispatch(userLoggedOut());
        navigate("/");
    };

    const amountIsValid = (str) => {
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        var n = Math.floor(Number(str));
        if(n !== Infinity && String(n) === str) return n;
        
        return -1;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit clicked");

        const data = new FormData(event.currentTarget);
        const transfer_detail = {
            amount: amountIsValid(data.get('amount')),
            to: data.get('to')
        };

        // Make a call to backend
      
    }

  return (
    <div>
        
        <header>
            <div className='header-parent-div'>

                <div id="mySidenav" className="sidenav" style={{width: visible ? '250px': '0'}}>
                    <div className="closebtn" onClick={() => setVisible(false)}>&times;</div>
                    <div>Home</div>
                    <div>Transactions</div>
                    <div className='active'>Trasfer</div>
                    <div onClick={() => logout()}>Logout</div>
                </div>

                <div className='header-logout-btn'>
                    <button onClick={() => {setVisible(!visible); console.log("Hi: ", visible)}}>
                        <MenuIcon />
                    </button>
                    <img src={logo} alt="logo" className="header-logo" />
                </div>
            </div>
        </header>

        <div style={{textAlign: 'center'}}>
            <h2>Transfer Money</h2>
        </div>

        <div id="main" >
        { errorMessage.length > 0 &&
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{errorMessage}</Alert>
            </Stack> 
            } 
            <Grid container>
            <Grid item xs={4} component={Paper} elevation={6} square style={{margin: 'auto'}}>
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
                    <SendIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Transfer Money
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="to"
                    label="Reciever's Account No."
                    name="to"
                    autoComplete="to"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="amount"
                    label="Amount (in $)"
                    type="number"
                    id="amount"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send
                </Button>
                </Box>
            </Box>
            </Grid>
            </Grid>
        </div>

    </div>
  );
}
const mapStateToProps = state => {
    return {
        user: state
    };
};
export default connect(mapStateToProps)(Transfer);