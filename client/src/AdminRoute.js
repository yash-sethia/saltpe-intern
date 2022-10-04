import React from 'react';
import { Route, Redirect, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './Components/Login/Login';

const AdminRoute = ({ isAuthenticated, children }) => {
    // console.log("Hii there: ", isAuthenticated)
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

function mapStateToProps(state){
    if(state.user.email && state.user.role == "admin") {
        return{
            isAuthenticated: true
        };
    }
    return{
        isAuthenticated: false
    };
}
export default connect(mapStateToProps)(AdminRoute);