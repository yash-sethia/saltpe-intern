import logo from './images/bg-img-svg.svg';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/Signup';
import LandingPage from './Components/Landing Page/LandingPage';
import Header from './Components/Header/Header';
import ForgetPassword from './Components/Login/ForgetPassword'
import ForgetPasswordEmail from './Components/Login/ResetPasswordEmail';
import Dashboard from './Components/Dashboard/dashboard'
import {Routes, Route} from 'react-router-dom';
import Transactions from './Components/Transactions/Transactions'
import Transfer from './Components/Transfer/Transfer'
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute'
import AdminHome from './Components/Admin Home/AdminHome';
import AdminUsers from './Components/Admin Users/AdminUsers';
import AdminTransaction from './Components/Admin Transaction/AdminTransaction';
import AdminCreateUserForm from './Components/Admin Users/AdminNewUserForm';

import './App.css';

import {connect} from 'react-redux';

const App = ({isAuthenticated}) => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/email" element={<ForgetPasswordEmail />}/>
        <Route path="/forgetPassword" element={<ForgetPassword />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={
             <UserRoute>
              <Dashboard />
             </UserRoute> 
          }/>
        <Route path="/user-transfer" element={
             <UserRoute>
              <Transfer />
             </UserRoute>
          }/>
        <Route path="/user-transactions" element={
             <UserRoute>
              <Transactions />
             </UserRoute>
          }/>

        <Route path="/admin-home" element={
             <AdminRoute>
              <AdminHome />
             </AdminRoute>
          }/>

        <Route path="/admin-users" element={
             <AdminRoute>
              <AdminUsers />
             </AdminRoute>
        }/>

        <Route path="/admin-transaction" element={
             <AdminRoute>
              <AdminTransaction />
             </AdminRoute>
        }/>

          <Route path="/admin-create-user-form" element={
             <AdminRoute>
              <AdminCreateUserForm />
             </AdminRoute>
          }/>
      </Routes>


    </div>
  );
}

function mapStateToProps(state){
  return{
      isAuthenticated: !!state.user.isLoggedIn
  }

}
export default connect(mapStateToProps)(App);
