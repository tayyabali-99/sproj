import React, { createContext, useContext, useEffect, useState } from 'react';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './login.js';
import Register from './register.js' 
import Blog from './blog.js'
import Map from './map.js'
// import reportWebVitals from './ex_files/reportWebVitals';
// import Create_profile from './create_profile.js';
import Search from './search.js'
import Home from './home.js'
import NavBar from './navbar.js'
import {LogOut} from './login.js'
import Profile from './profile.js'
import Review from './review.js'
import AdminCollege from './admin_college.js';
import AdminInstructor from './admin_instructor.js';
import AdminLocation from './admin_location.js';
import AdminBar from './admin_bar.js';
import ShowLocation from './show_location.js';
import { backend_addr } from './config.js';


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

    useEffect(()=> {
        document.title = 'Uni Bubble'
    },[])

    return (
        <Router>
            <NavBar/>
            <AdminBar />
            {/* <Home/>            */}
        
        <Routes>
            <Route path="/blog"  element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element ={<Register />} />
            <Route path="/search" element ={<Search />} />
            <Route path="/home" element ={<Home />} />
            <Route path="/logout" element ={<LogOut />} />
            <Route path="/profile/:username" element ={<Profile />} />
            <Route path = '/review/:username' element = {<Review />}/>
            <Route path="/map" element ={<Map />} />
            <Route path="/admin_college" element ={<AdminCollege />} />
            <Route path="/admin_instructor" element ={<AdminInstructor />} />
            <Route path="/admin_location" element ={<AdminLocation />} />
            <Route path = '/show_location/:location_to_show' element = {<ShowLocation />}/>









        </Routes>
        
      </Router>
    )
   
}

export default  Application;
