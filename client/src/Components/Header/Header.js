import React from 'react';
import logo from '../../images/logo1.png';
import './header.css';

const Header = () => {
    return (
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
                    <button>Sign In</button>
                </div>

            </div>
        </header>
    );
};


export default Header;