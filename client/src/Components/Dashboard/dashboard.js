import React from 'react';
import '../Header/header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';
import './dashboard.css';
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

import card from '../../images/card.png';
import cash from '../../images/cash.png';
  

function Dashboard(props) {
    const [visible, setVisible] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    console.log("Props: ", props.user);
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
                    <div className='active'>Home</div>
                    <div>Transactions</div>
                    <div>Trasfer</div>
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

        <div id="main" >
            <Grid container spacing={2}>
                <Grid item sm={6} md={6}>
                    <Card sx={{ maxWidth: 345 }} style={{margin: 'auto'}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={card}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary">
                                Account Number
                            </Typography>
                            <Typography variant="h5" component="div">
                                123456789876543
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item sm={6} md={6}>
                <Card sx={{ maxWidth: 345 }} style={{margin: 'auto'}}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            height="140"
                            image={cash}
                            alt="green iguana"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary">
                                Account Balance
                            </Typography>
                            <Typography variant="h5" component="div">
                                $5035.75
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
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
export default connect(mapStateToProps)(Dashboard);