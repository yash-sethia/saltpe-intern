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

import axios from 'axios';

function Transactions(props) {
    const [visible, setVisible] = React.useState(false);
    const [transaction_data, setTransactionData] = React.useState([]);
    const [ errorMessage, setErrorMessage ] = React.useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/api/users/${props.user.user.email}`)
          .then(res => {
            if(!res.data.success) {
                setErrorMessage("ERROR: " + res.data.errors);
                setTimeout(
                  function() {
                    setErrorMessage("");
                  }, 5000);
              }
              else {
                let i = 0;
                let j = 0;
                let k = 0;
                console.log("Res = ", res.data);
                console.log("Hello from loops = ", new Date(res.data.credit[i].created_at))
                let temp_data = new Array(res.data.credit.length + res.data.debit.length);
                while(i < res.data.credit.length && j < res.data.debit.length) {
                    if(new Date(res.data.credit[i].created_at) >  new Date(res.data.debit[j].created_at)) {
                        temp_data[k] = (
                            createData(res.data.credit[i]._id, false, res.data.credit[i].name || "-Not Mentioned-", res.data.credit[i].amount, res.data.credit[i].sender, new Date(res.data.credit[i].created_at).toISOString().substring(0, 10))
                        );
                        i += 1;
                        k += 1;
                    } else {
                        temp_data[k] = (
                            createData(res.data.debit[j]._id, true, res.data.debit[j].name || "-Not Mentioned-", res.data.debit[j].amount, res.data.debit[j].sender, new Date(res.data.debit[j].created_at).toISOString().substring(0, 10))
                        );
                        j += 1;
                        k += 1;
                    }
                }

                while(i < res.data.credit.length) {
                    temp_data[k] = (
                        createData(res.data.credit[i]._id, false, res.data.credit[i].name || "-Not Mentioned-", res.data.credit[i].amount, res.data.credit[i].sender, new Date(res.data.credit[i].created_at).toISOString().substring(0, 10))
                    );
                    i += 1;
                    k += 1;
                }

                while(j < res.data.debit.length) {
                    temp_data[k] = (
                        createData(res.data.debit[j]._id, true, res.data.debit[j].name || "-Not Mentioned-", res.data.debit[j].amount, res.data.debit[j].sender, new Date(res.data.debit[j].created_at).toISOString().substring(0, 10))
                    );
                    j += 1;
                    k += 1;
                }

                console.log("Success : ", temp_data);

                setTransactionData(temp_data);
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

    function createData(id, debit, name, amount, from, date) {
        return { id, debit, name, amount, from, date };
      }
      
  return (
    <div>
        <header>
            <div className='header-parent-div'>

            <div id="mySidenav" className="sidenav" style={{width: visible ? '250px': '0'}}>
                    <div className="closebtn" onClick={() => setVisible(false)}>&times;</div>
                    <div onClick={() => navigate("/dashboard")}>Home</div>
                    <div className='active' onClick={() => navigate("/user-transactions")}>
                        Transactions
                    </div>
                    <div onClick={() => {
                        navigate("/user-transfer");
                    }}>
                        Trasfer
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
            <h2>Transaction History</h2>
        </div>

        <div id="main" >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, maxWidth:1000 }} style={{margin: 'auto'}} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>
                            <h2>Amount</h2>
                        </TableCell>
                        <TableCell align="right"><h2>Name</h2></TableCell>
                        <TableCell align="right"><h2>To or From</h2></TableCell>
                        <TableCell align="right"><h2>Date</h2></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {transaction_data.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <h3 style={{color: row.debit ? 'green' : 'red'}}>{(row.debit ? "+" : "-") + row.amount}</h3>
                        </TableCell>
                        <TableCell align="right"><h3>{row.name}</h3></TableCell>
                        <TableCell align="right"><h3>{row.from}</h3></TableCell>
                        <TableCell align="right"><h3>{row.date}</h3></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
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
export default connect(mapStateToProps)(Transactions);