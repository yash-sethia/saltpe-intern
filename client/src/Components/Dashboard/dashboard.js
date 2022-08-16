import React from 'react';
import Header from '../Header/header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo1.png';
import './dashboard.css';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {userLoggedOut} from '../../actions/auth';

function Dashboard(props) {
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
                <img src={logo} alt="logo" className="header-logo" />

                <div className='header-options'>
                    <a href="#search">Lorem Ipsum 1</a>
                    <a href="#about">Lorem Ipsum 1</a>
                </div>

                <div className='header-logout-btn'>
                    <button onClick={logout}> Log Out </button>
                </div>
            </div>
        </header>

        <h2 className="dashboard-h2">Dashboard</h2>

    </div>
  );
}
const mapStateToProps = state => {
    return {
        user: state
    };
};
export default connect(mapStateToProps)(Dashboard);