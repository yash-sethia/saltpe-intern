import React from 'react';
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

function Transactions(props) {
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

    function createData(id, debit, name, amount, from, date) {
        return { id, debit, name, amount, from, date };
      }
      
      const rows = [
        createData(1, true, "Yash", "$200", "1234567898765432", "20/09/2022"),
        createData(2, false,  "Yash", "$200", "1234567898765432", "20/09/2022"),
        createData(3, true,  "Yash", "$200", "1234567898765432", "20/09/2022"),
        createData(4, true,  "Yash", "$200", "1234567898765432", "20/09/2022"),
        createData(5, false,  "Yash", "$200", "1234567898765432", "20/09/2022"),
        createData(6, true,  "Yash", "$200", "1234567898765432", "20/09/2022"),
      ];

  return (
    <div>
        <header>
            <div className='header-parent-div'>

                <div id="mySidenav" className="sidenav" style={{width: visible ? '250px': '0'}}>
                    <div className="closebtn" onClick={() => setVisible(false)}>&times;</div>
                    <div>Home</div>
                    <div className='active'>Transactions</div>
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
                        <TableCell align="right"><h2>From</h2></TableCell>
                        <TableCell align="right"><h2>Date</h2></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
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