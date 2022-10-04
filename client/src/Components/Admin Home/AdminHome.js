import React, {useEffect} from 'react';
import '../Header/header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';
import '../Dashboard/dashboard.css';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {userLoggedOut} from '../../actions/auth';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import cash from '../../images/cash.png';
import users from '../../images/users.png';

import axios from 'axios'
  

function AdminHome(props) {
    const [visible, setVisible] = React.useState(false);
    const [total_deposit, setTotalDeposit] = React.useState(0);
    const [total_user, setTotalUser] = React.useState(0);
    const [ errorMessage, setErrorMessage ] = React.useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        axios.get("/api/admin/home-details")
        .then(res => {
            if(res.data.success) {
                setTotalDeposit(res.data.deposit);
                setTotalUser(res.data.users);
            } else {
                setErrorMessage("ERROR: " + res.data.errors);
                setTimeout(
                  function() {
                    setErrorMessage("");
                  }, 5000);
            }
        })
        .catch(err => {});
    }, []);


    const logout = () => {
        console.log("Log Out!!");
        localStorage.removeItem('email');
        dispatch(userLoggedOut());
        navigate("/");
    };


  return (
    <div>
        <header>
            <div className='header-parent-div'>

                <div id="mySidenav" className="sidenav" style={{width: visible ? '250px': '0'}}>
                    <div className="closebtn" onClick={() => setVisible(false)}>&times;</div>
                    <div className='active' onClick={() => navigate("/")}> Home </div>
                    <div onClick={() => navigate("/")}>
                        Users
                    </div>
                    <div onClick={() => navigate("/")}>
                        Debit / Credit
                    </div>
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

        <div id="main" >
            <Grid container spacing={2}>
            <Grid item sm={2} md={2}></Grid>
                <Grid item sm={4} md={4}>
                    <Card sx={{ maxWidth: 450 }} style={{margin: 'auto'}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="200"
                            image={users}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary">
                                Total Users
                            </Typography>
                            <Typography variant="h5" component="div">
                                {total_user}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item sm={4} md={4}>
                <Card sx={{ maxWidth: 450 }} style={{margin: 'auto'}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="200"
                            image={cash}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary">
                                Total Deposit
                            </Typography>
                            <Typography variant="h5" component="div">
                                $ {total_deposit}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item sm={2} md={2}></Grid>
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
export default connect(mapStateToProps)(AdminHome);