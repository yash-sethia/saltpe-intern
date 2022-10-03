import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import {userLoggedIn} from "./actions/auth";
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.JWT){
  const user ={email:localStorage.email};
  store.dispatch(userLoggedIn(user));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store={store}>
          {/* <Routes>
            <Route path="/" component={App}/>
          </Routes> */}
          <App/>
      </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
