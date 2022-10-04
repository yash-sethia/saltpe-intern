import React from 'react';
import '../Header/header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';
import '../Dashboard/dashboard.css';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {userLoggedOut, userBalanceUpdated} from '../../actions/auth';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import GroupAddIcon from '@mui/icons-material/GroupAdd';

import axios from 'axios';


import SendIcon from '@mui/icons-material/Send';

function AdminCreateUserForm(props) {
    const [visible, setVisible] = React.useState(false);
    const [type, setType] = React.useState("debit");
    const [ errorMessage, setErrorMessage ] = React.useState("");
    const [ textMessage, setTextMessage ] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    console.log("Props: ", props.user);
    const logout = () => {
        console.log("Log Out!!");
        localStorage.removeItem('email');
        dispatch(userLoggedOut());
        navigate("/");
    };

    const handleChange = (event) => {
        setType(event.target.value);
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
            name: data.get('name'),
            balance: amountIsValid(data.get('balance')),
            email: data.get('email'),
            accountNo: data.get('accountNo'),
        };

        axios.post("/api/admin/admin-create-user", transfer_detail).then(res => {

            //console.log(res);
            if(!res.data.success) {
                setErrorMessage("ERROR: " + res.data.errors);
                setTimeout(
                function() {
                    setErrorMessage("");
                }, 5000);
            }
            else {
                setTextMessage("Transfer successful!! Redirecting you to Dashboard...");
                setTimeout(
                    function() {
                        setTextMessage("");
                        navigate("/dashboard");
                    }, 5000);
            }

        })
        .catch(err => {
            setErrorMessage("ERROR: Unknown error occured!!");
            setTimeout(
            function() {
                setErrorMessage("");
            }, 5000);
            })
      
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

        {/* <div style={{textAlign: 'center'}}>
            <h2>Transfer Money</h2>
        </div> */}

        <div id="main" >
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
                    <GroupAddIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Create New User Form
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountNo"
                    label="Account No."
                    name="accountNo"
                    autoComplete="accountNo"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="balance"
                    label="Balance (in $)"
                    type="number"
                    id="balance"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create User
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
export default connect(mapStateToProps)(AdminCreateUserForm);