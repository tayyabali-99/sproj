import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Login from './login.js';
import Register from './register.js' 
import Blog from './blog.js'
import reportWebVitals from './ex_files/reportWebVitals';
import Create_profile from './create_profile.js';
import Search from './search.js'
import App from './App.js'
import { backend_addr } from './config.js';

const root = ReactDOM.createRoot(document.getElementById('root'));




//const usernameContext = createContext();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
