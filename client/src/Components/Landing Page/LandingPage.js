import React from 'react';
import Header from '../Header/header.css';
import logo from '../../images/logo1.png';
import { connect } from "react-redux";
import './home.css';
import { useNavigate } from 'react-router-dom';


function LandingPage(props) {
    const navigate = useNavigate();
    const signup = () => {
        navigate('/login');
    }


    return (
        <>
        <header>
            <div className='header-parent-div'>
                <img src={logo} alt="logo" className="header-logo" />

                <div className='header-options'>
                    <a href="#search">About</a>
                    <a href="#about">Remittance</a>
                    <a href="#about">Blogs</a>
                    <a href="#search">Team</a>
                    <a href="#about">Contact Us</a>
                </div>

                <div className='header-login-btn'>
                    <button onClick={signup}>Sign In</button>
                </div>

            </div>
        </header>
        <div className='home'>
            <h6 className='home-side-heading'>
                Banking, but seasoned with SALT. <br /> 
                We deal with all things related to global <br/>
                business banking so that you don't have to.
            </h6>
            <h3 className='home-main-heading'>
                Not your <br />
                Average Banking <br /> 
                experience.
            </h3>

        </div>
        </>
    );
}
const mapStateToProps = state => {
    return {
        user: state
    };
};

export default connect(mapStateToProps)(LandingPage);