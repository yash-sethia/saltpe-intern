import React, {useEffect} from 'react';
import '../Header/header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';
import '../Dashboard/dashboard.css';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {userLoggedOut} from '../../actions/auth';
import MenuIcon from '@mui/icons-material/Menu';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import axios from 'axios';

function AdminUsers(props) {
    const [visible, setVisible] = React.useState(false);
    const [ errorMessage, setErrorMessage ] = React.useState("");
    const [user_data, setUserData] = React.useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("/api/admin/user-details")
          .then(res => {
                if(!res.data.success) {
                    setErrorMessage("ERROR: " + res.data.errors);
                    setTimeout(
                    function() {
                        setErrorMessage("");
                    }, 5000);
                } else {
                    let temp_data = []
                    res.data.users.map(item => temp_data.push(createData(item._id, item.name, item.accountNo, item.balance)));
                    setUserData(temp_data);
                }
            })
          .catch(err => {
            console.log("Error: Inside catch", err)
            setErrorMessage("ERROR: Unknown Error occured");
                setTimeout(
                  function() {
                    setErrorMessage("");
                  }, 5000);
          });
      }, []);
    
    console.log("Props: ", props.user);
    const logout = () => {
        console.log("Log Out!!");
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        dispatch(userLoggedOut());
        navigate("/");
    };

    function createData(id, name, accountNo, balance) {
        return { id, name, accountNo, balance };
      }
      
  return (
    <div>
        <header>
            <div className='header-parent-div'>

            <div id="mySidenav" className="sidenav" style={{width: visible ? '250px': '0'}}>
                    <div className="closebtn" onClick={() => setVisible(false)}>&times;</div>
                    <div onClick={() => navigate("/admin-home")}> Home </div>
                    <div className='active' onClick={() => navigate("/admin-users")}>
                        Users
                    </div>
                    <div onClick={() => navigate("/admin-transaction")}>
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

        <div style={{textAlign: 'center'}}>
            <h2>All User Data</h2>
        </div>

        <div id="main" >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth:1000 }} style={{margin: 'auto'}} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>
                            <h2>Name</h2>
                        </TableCell>
                        <TableCell align="right"><h2>Account No.</h2></TableCell>
                        <TableCell align="right"><h2>Balance</h2></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {user_data.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row"><h3>{row.name}</h3></TableCell>
                        <TableCell align="right"><h3>{row.accountNo}</h3></TableCell>
                        <TableCell align="right"><h3>{"$ " + row.balance}</h3></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    
                </Table>
                <Button variant="outlined" style={{margin: '2%'}} onClick={() => navigate("/admin-create-user-form")}><AddCircleOutlineIcon /> &nbsp; <strong>Add New User</strong></Button>
            </TableContainer>
        </div>

    </div>
  );
}
const mapStateToProps = state => {
    return {
        user: state
    };
};
export default connect(mapStateToProps)(AdminUsers);