import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './login.js';
import Register from './register.js' 
import Blog from './blog.js'
import reportWebVitals from './ex_files/reportWebVitals';
import Create_profile from './create_profile.js';
import Search from './search.js'
import Home from './home.js'
import NavBar from './navbar.js'
import {LogOut} from './login.js'
import Profile from './profile.js'
import Review from './review.js'

//const UserContext = createContext();
export const UserContext = createContext();
function Application(){

    const [userData, SetUserData] = useState('');
    return(
        <div>
            <UserContext.Provider value = {{userData,SetUserData}}>
                <App />
            </UserContext.Provider>
        </div>
        
    )
}

function App() {

    return (
        <Router>
            <NavBar/>
            {/* <Home/>            */}
        
        <Routes>
            <Route path="/blog"  element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element ={<Register />} />
            <Route path="/search" element ={<Search />} />
            <Route path="/home" element ={<Home />} />
            <Route path="/logout" element ={<LogOut />} />
            <Route path="/profile" element ={<Profile />} />
            <Route path = '/review' element = {<Review />}/>



        </Routes>
        
      </Router>
    )
   
}

export default  Application;
